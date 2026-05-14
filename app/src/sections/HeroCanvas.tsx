import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useResponsiveCanvasDpr } from '../hooks/useViewportPreferences';

function ChromaticTextMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOffset: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;

    const targetX = state.pointer.x * viewport.width * 0.5 * 0.02;
    const targetY = state.pointer.y * viewport.height * 0.5 * 0.02;

    uniforms.uOffset.value.x += (targetX - uniforms.uOffset.value.x) * 0.05;
    uniforms.uOffset.value.y += (targetY - uniforms.uOffset.value.y) * 0.05;

    if (groupRef.current) {
      groupRef.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.ShaderMaterial;
        if (material.uniforms) {
          material.uniforms.uTime.value = t;
          material.uniforms.uOffset.value = uniforms.uOffset.value;
        }
      });
    }
  });

  const chromaticVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const chromaticFragmentShader = `
    uniform float uTime;
    uniform vec2 uOffset;
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float wave = sin(uv.y * 8.0 + uTime * 1.5) * 0.008;
      float wave2 = cos(uv.x * 6.0 + uTime * 1.2) * 0.006;

      vec2 direction = normalize(uOffset + vec2(0.0001));
      float dist = length(uv - vec2(0.5));
      float strength = smoothstep(0.3, 1.2, dist) * 0.015;

      vec2 offset = direction * strength;
      offset.x += wave;
      offset.y += wave2;

      vec3 color = uColor * (0.7 + 0.3 * sin(uv.y * 3.14159));
      float alpha = 0.08 + 0.05 * sin(uTime * 0.8 + uv.x * 3.0);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  const colors = useMemo(
    () => [
      new THREE.Color('#ff0040'),
      new THREE.Color('#00ff40'),
      new THREE.Color('#0040ff'),
    ],
    [],
  );

  return (
    <group ref={groupRef}>
      {colors.map((color, i) => (
        <Text
          key={i}
          position={[i * 0.03 - 0.03, 0, (i - 1) * 0.02]}
          fontSize={3.2}
          font="https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5.0.0/files/space-grotesk-latin-700-normal.woff2"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.05}
        >
          DIGITAL
          <shaderMaterial
            vertexShader={chromaticVertexShader}
            fragmentShader={chromaticFragmentShader}
            uniforms={{
              uTime: uniforms.uTime,
              uOffset: uniforms.uOffset,
              uColor: { value: color },
            }}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </Text>
      ))}
      <Text
        position={[0, -3.5, 0]}
        fontSize={3.2}
        font="https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5.0.0/files/space-grotesk-latin-700-normal.woff2"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.05}
      >
        PRESENCE
        <meshBasicMaterial color="#ffffff" transparent opacity={0.03} />
      </Text>
    </group>
  );
}

function FloatingParticles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      vel[i * 3] = (Math.random() - 0.5) * 0.0015;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.0015;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(posArray[i * 3]) > 12) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 9) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 6) velocities[i * 3 + 2] *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color="#f4bd03"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroCanvas() {
  const maxDpr = useResponsiveCanvasDpr();
  const [particleCount, setParticleCount] = useState(100);

  useEffect(() => {
    const update = () => {
      setParticleCount(window.innerWidth < 640 ? 48 : window.innerWidth < 1024 ? 72 : 100);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, maxDpr]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <ChromaticTextMesh />
      <FloatingParticles count={particleCount} />
    </Canvas>
  );
}
