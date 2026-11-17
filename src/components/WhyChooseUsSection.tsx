import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STANDARDS } from '../config/showroom';

gsap.registerPlugin(ScrollTrigger);

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-standard-item]', {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 74%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="standards"
      ref={sectionRef}
      className="py-24 sm:py-32 lg:py-40 bg-[#0A0B0D] border-t border-white/10"
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Studio Showcase Frame */}
          <div className="lg:col-span-6 flex order-2 lg:order-1">
            <div className="relative w-full min-h-[360px] lg:min-h-full overflow-hidden bg-[#121418] border border-white/10">
              <img
                src="/assets/frames/stage_05_finished.jpg"
                alt="Finished matte black sports coupe inside the MUHAMMAD VARSHA inspection bay"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#070708]/85 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-6 left-6 right-6 border-t border-white/15 pt-4">
                <p className="text-xs tracking-[0.2em] uppercase text-[#C9A96E]">
                  Final Delivery Standard
                </p>
                <p className="mt-1 text-sm text-[#E6E8EC]">
                  Calibrated booth inspection prior to client handover
                </p>
              </div>
            </div>
          </div>

          {/* Standards List */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.24em] uppercase text-[#C9A96E] mb-4">
                Why Choose Us
              </p>
              <h2
                className="font-display font-medium text-[#F2F4F7] leading-[1.06] text-balance"
                style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)' }}
              >
                QUALITY IS NOT AN OPTION. IT&apos;S OUR STANDARD.
              </h2>
            </div>

            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {STANDARDS.map((item) => (
                <div
                  key={item.index}
                  data-standard-item
                  className="py-5 flex items-baseline gap-5"
                >
                  <span className="font-mono-tabular text-xs text-[#C9A96E] shrink-0">
                    {item.index}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-[#F2F4F7]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#9AA0AB] leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
