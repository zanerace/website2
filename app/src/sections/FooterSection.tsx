import { memo } from 'react';

interface FooterProps {
  onScrollTo: (target: string) => void;
}

export default memo(function FooterSection({ onScrollTo }: FooterProps) {
  const navColumns = [
    {
      title: 'Navigate',
      links: [
        { label: 'Services', target: '#services' },
        { label: 'Process', target: '#process' },
        { label: 'Pricing', target: '#pricing' },
        { label: 'Testimonials', target: '#testimonials' },
      ],
    },
    {
      title: 'Work',
      links: [
        { label: 'Get Free Audit', target: '#contact' },
        { label: 'Starter Cleanup', target: '#pricing' },
        { label: 'Full Cleanup', target: '#pricing' },
        { label: 'Monthly Support', target: '#pricing' },
      ],
    },
  ];

  const socials = [
    {
      label: 'Instagram',
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'TikTok',
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-black border-t border-white/[0.04]">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand column */}
          <div className="md:col-span-5">
            <button
              onClick={() => onScrollTo('#hero')}
              className="flex items-center gap-3 group mb-5"
            >
              <span className="w-8 h-8 rounded-md bg-gold/10 border border-gold/20 flex items-center justify-center">
                <span className="font-clash font-semibold text-gold text-sm">
                  R
                </span>
              </span>
              <span className="font-grotesk font-bold text-white text-sm tracking-[0.25em] group-hover:text-gold transition-colors">
                RACE DIGITAL
              </span>
            </button>
            <p className="font-grotesk font-light text-white/30 text-sm leading-relaxed max-w-xs mb-6">
              I help local businesses look as good online as they are in real
              life. Simple fixes, clear prices, fast turnaround.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/30 hover:bg-gold/[0.05] transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p className="font-grotesk font-medium text-white/50 text-[11px] tracking-[0.2em] uppercase mb-5">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => onScrollTo(link.target)}
                      className="font-grotesk font-light text-white/30 text-sm hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="md:col-span-3">
            <p className="font-grotesk font-medium text-white/50 text-[11px] tracking-[0.2em] uppercase mb-5">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@racedigital.com"
                  className="font-grotesk font-light text-white/30 text-sm hover:text-gold transition-colors duration-200"
                >
                  hello@racedigital.com
                </a>
              </li>
              <li className="font-grotesk font-light text-white/20 text-sm">
                Based in Illinois, USA
              </li>
            </ul>

            <button
              onClick={() => onScrollTo('#contact')}
              className="mt-6 font-grotesk font-medium text-black bg-gold hover:bg-gold-hover text-[12px] tracking-[0.1em] px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-glow"
            >
              GET FREE AUDIT
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-grotesk font-light text-white/15 text-xs">
            &copy; {new Date().getFullYear()} Race Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-grotesk font-light text-white/15 text-xs hover:text-white/30 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="font-grotesk font-light text-white/15 text-xs hover:text-white/30 transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => onScrollTo('#hero')}
        className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/30 transition-all duration-300 backdrop-blur-sm"
        aria-label="Back to top"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </footer>
  );
})
