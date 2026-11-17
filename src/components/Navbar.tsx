import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SHOWROOM_CONFIG } from '../config/showroom';

interface NavbarProps {
  onBookClick: () => void;
}

const NAV_LINKS = [
  { label: 'Workshop', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Process', href: '#process' },
];

export function Navbar({ onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#070708]/92 backdrop-blur-md border-b border-white/10'
          : 'bg-gradient-to-b from-[#070708]/80 to-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 h-16 sm:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo */}
        <a
          href="#hero"
          aria-label={SHOWROOM_CONFIG.brandName}
          className="inline-flex items-center shrink-0 h-11 sm:h-14 aspect-[19/10] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-sm"
        >
          <img
            src="/assets/aistudio/Automotive_workshop_logo_design_909004ae_2K_e7a3a896.jpg"
            alt={SHOWROOM_CONFIG.brandName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[50%_52%] scale-[1.26] brightness-110 contrast-110 [mask-image:radial-gradient(ellipse_96%_92%_at_50%_50%,black_84%,transparent_100%)]"
          />
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-[#A9AFBC]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 hover:text-[#E6E8EC] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-[#C9A96E] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase bg-[#C9A96E] text-[#070708] hover:bg-[#DFC38E] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC38E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708]"
          >
            Book Service
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#E6E8EC] hover:text-[#C9A96E] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#070708]/98 border-t border-white/10 px-5 py-6">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="py-3 text-base font-medium text-[#D4D7DD] hover:text-[#C9A96E] border-b border-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onBookClick();
              }}
              className="mt-4 w-full py-3.5 text-xs font-semibold tracking-[0.16em] uppercase bg-[#C9A96E] text-[#070708] hover:bg-[#DFC38E] transition-colors cursor-pointer"
            >
              Book Service
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
