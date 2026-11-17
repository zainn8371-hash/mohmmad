import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X } from 'lucide-react';
import { SERVICES, ServiceItem } from '../config/showroom';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-service-card]', {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!activeService) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeService]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 sm:py-32 lg:py-40 bg-[#070708] border-t border-white/10"
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-18">
          <div>
            <p className="text-xs font-medium tracking-[0.24em] uppercase text-[#C9A96E] mb-4">
              Our Services
            </p>
            <h2
              className="font-display font-medium text-[#F2F4F7] leading-[1.06] text-balance"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
            >
              Specialized Bodywork &amp; Refinishing.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#9AA0AB] max-w-md leading-relaxed">
            Six focused restoration disciplines executed with clean panel preparation, controlled
            paint application, and careful final inspection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              data-service-card
              className="group flex flex-col bg-[#0E0F12] border border-white/10 hover:border-[#C9A96E]/55 transition-colors duration-300 overflow-hidden"
            >
              {/* Service Visual */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#14161A]">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/20 to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Card Body */}
              <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <span className="font-mono-tabular text-xs tracking-[0.2em] text-[#C9A96E] block mb-2.5">
                    {service.index}
                  </span>
                  <h3 className="font-display text-2xl sm:text-[1.7rem] font-medium text-[#F2F4F7] leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#A5ACB8] leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveService(service)}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#E6E8EC] group-hover:text-[#C9A96E] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectServiceForBooking(service.title)}
                    className="text-xs font-medium text-[#9AA0AB] hover:text-[#DFC38E] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Service Specification Modal */}
      {activeService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050506]/85 backdrop-blur-md"
          onClick={() => setActiveService(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0E0F12] border border-white/15 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full bg-[#14161A]">
              <img
                src={activeService.image}
                alt={activeService.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/25 to-transparent"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => setActiveService(null)}
                aria-label="Close service details"
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-[#070708]/80 border border-white/20 text-[#F2F4F7] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <span className="font-mono-tabular text-xs tracking-[0.2em] text-[#C9A96E]">
                {activeService.index} · MUHAMMAD VARSHA
              </span>
              <h3
                id="service-modal-title"
                className="mt-2 font-display text-3xl sm:text-4xl font-medium text-[#F2F4F7]"
              >
                {activeService.title}
              </h3>
              <p className="mt-4 text-sm sm:text-base text-[#C4C9D3] leading-relaxed">
                {activeService.detailedSummary}
              </p>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs tracking-[0.18em] uppercase text-[#9AA0AB] mb-3">
                  Service Scope
                </p>
                <ul className="space-y-2.5">
                  {activeService.scopePoints.map((point) => (
                    <li key={point} className="text-sm text-[#E6E8EC] flex items-baseline gap-3">
                      <span className="w-1.5 h-px bg-[#C9A96E] shrink-0 -translate-y-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveService(null)}
                  className="px-5 py-3 text-xs font-semibold tracking-[0.14em] uppercase border border-white/15 text-[#C8CDD6] hover:border-white/35 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = activeService.title;
                    setActiveService(null);
                    onSelectServiceForBooking(title);
                  }}
                  className="px-6 py-3 text-xs font-semibold tracking-[0.14em] uppercase bg-[#C9A96E] text-[#070708] hover:bg-[#DFC38E] transition-colors cursor-pointer"
                >
                  Book This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
