import { SERVICES, SHOWROOM_CONFIG } from '../config/showroom';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050506] border-t border-white/10 text-[#9AA0AB]">
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <p className="text-base sm:text-lg font-semibold tracking-[0.24em] text-[#F2F4F7]">
              {SHOWROOM_CONFIG.brandName}
            </p>
            <p className="mt-3 font-display text-2xl sm:text-3xl text-[#C9A96E]">
              {SHOWROOM_CONFIG.footerStatement}
            </p>
            <p className="mt-4 text-sm text-[#8F96A3] max-w-sm leading-relaxed">
              Automotive denting, precision painting, bodywork restoration, and exterior finishing
              executed with studio discipline.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E6E8EC] mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#hero" className="hover:text-[#C9A96E] transition-colors">
                  Workshop Tour
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#C9A96E] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C9A96E] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C9A96E] transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#C9A96E] transition-colors">
                  The Process
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C9A96E] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E6E8EC] mb-4">
              Services
            </p>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((svc) => (
                <li key={svc.id}>
                  <a href="#services" className="hover:text-[#C9A96E] transition-colors">
                    {svc.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom Details */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E6E8EC] mb-4">
              Contact
            </p>
            <div className="space-y-2.5 text-sm">
              <p>
                <a
                  href={`tel:${SHOWROOM_CONFIG.phoneDisplay}`}
                  className="font-mono-tabular text-[#E6E8EC] hover:text-[#C9A96E] transition-colors"
                >
                  {SHOWROOM_CONFIG.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${SHOWROOM_CONFIG.email}`}
                  className="hover:text-[#C9A96E] transition-colors break-all"
                >
                  {SHOWROOM_CONFIG.email}
                </a>
              </p>
              <p>{SHOWROOM_CONFIG.addressDisplay}</p>
              <p>{SHOWROOM_CONFIG.openingHours}</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6E7582]">
          <p>
            © {year} {SHOWROOM_CONFIG.brandName}. All rights reserved.
          </p>
          <p>{SHOWROOM_CONFIG.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
