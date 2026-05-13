import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const IMAGES = [
  '/images/carousel-1.jpg',
  '/images/carousel-2.jpg',
  '/images/carousel-3.jpg',
  '/images/carousel-4.jpg',
  '/images/carousel-5.jpg',
  '/images/carousel-6.jpg',
];

const vertexShader = `
  varying vec2 vUv;
  uniform float uScrollSpeed;
  uniform float uCurveStrength;
  uniform float uCurveFrequency;
  #define PI 3.141592653

  void main() {
    vUv = uv;
    vec3 pos = position;
    vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    float xDisplacement = uCurveStrength * cos(worldPosition.y * uCurveFrequency);
    pos.x += xDisplacement;
    pos.x -= uCurveStrength;
    float yDisplacement = -sin(uv.x * PI) * uScrollSpeed;
    pos.y += yDisplacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uPlaneSizes;
  uniform vec2 uImageSizes;
  varying vec2 vUv;

  void main() {
    vec2 ratio = vec2(
      min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
      min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    vec4 finalColor = texture2D(uTexture, uv);
    gl_FragColor = finalColor;
  }
`;

interface CarouselImageProps {
  texture: THREE.Texture;
  index: number;
  imageWidth: number;
  imageHeight: number;
  spacing: number;
  scrollSpeedRef: React.MutableRefObject<number>;
  direction: number;
  totalWidth: number;
}

function CarouselImage({
  texture,
  index,
  imageWidth,
  imageHeight,
  spacing,
  scrollSpeedRef,
  direction,
  totalWidth,
}: CarouselImageProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialX = index * (imageWidth + spacing) - totalWidth / 2;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uScrollSpeed: { value: 0 },
      uCurveStrength: { value: 0.6 * direction },
      uCurveFrequency: { value: 0.4 },
      uPlaneSizes: { value: new THREE.Vector2(imageWidth, imageHeight) },
      uImageSizes: {
        value: new THREE.Vector2(
          (texture.image as HTMLImageElement)?.naturalWidth || 1024,
          (texture.image as HTMLImageElement)?.naturalHeight || 683,
        ),
      },
    }),
    [texture, imageWidth, imageHeight, direction],
  );

  useFrame(() => {
    if (!meshRef.current) return;

    const speed = scrollSpeedRef.current * 0.008 * direction;
    meshRef.current.position.x += speed;

    const limit = totalWidth / 2 + imageWidth;
    if (meshRef.current.position.x > limit) {
      meshRef.current.position.x -= totalWidth;
    }
    if (meshRef.current.position.x < -limit) {
      meshRef.current.position.x += totalWidth;
    }

    const material = meshRef.current.material as THREE.ShaderMaterial;
    if (material.uniforms) {
      material.uniforms.uScrollSpeed.value =
        scrollSpeedRef.current * 0.005 * direction;
    }
  });

  return (
    <mesh ref={meshRef} position={[initialX, 0, 0]}>
      <planeGeometry args={[imageWidth, imageHeight, 16, 16]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface CarouselRowProps {
  textures: THREE.Texture[];
  yPosition: number;
  scrollSpeedRef: React.MutableRefObject<number>;
  direction: number;
}

function CarouselRow({
  textures,
  yPosition,
  scrollSpeedRef,
  direction,
}: CarouselRowProps) {
  const imageWidth = 2.4;
  const imageHeight = 1.6;
  const spacing = 0.4;
  const totalWidth = textures.length * (imageWidth + spacing);

  return (
    <group position={[0, yPosition, 0]}>
      {textures.map((texture, i) => (
        <CarouselImage
          key={i}
          texture={texture}
          index={i}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          spacing={spacing}
          scrollSpeedRef={scrollSpeedRef}
          direction={direction}
          totalWidth={totalWidth}
        />
      ))}
    </group>
  );
}

function CarouselScene({
  scrollSpeedRef,
}: {
  scrollSpeedRef: React.MutableRefObject<number>;
}) {
  const textures = useLoader(TextureLoader, IMAGES);

  return (
    <>
      <ambientLight intensity={1} />
      <CarouselRow
        textures={textures}
        yPosition={1.2}
        scrollSpeedRef={scrollSpeedRef}
        direction={-1}
      />
      <CarouselRow
        textures={textures}
        yPosition={-1.2}
        scrollSpeedRef={scrollSpeedRef}
        direction={1}
      />
    </>
  );
}

const maxDpr = Math.min(window.devicePixelRatio, 1.5);

export default function CarouselCanvas({
  scrollSpeedRef,
}: {
  scrollSpeedRef: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, maxDpr]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <CarouselScene scrollSpeedRef={scrollSpeedRef} />
    </Canvas>
  );
}
