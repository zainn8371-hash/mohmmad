import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  'Attention to detail across every panel gap and surface line',
  'Professional workmanship in denting, preparation, and refinishing',
  'Quality-focused service structured around clear vehicle care',
  'Modern automotive repair techniques in a dedicated booth environment',
  'Customer satisfaction built through transparent handover reviews',
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-about-fade]', {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
          once: true,
        },
      });

      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current.querySelector('img'),
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-32 lg:py-40 bg-[#0A0B0D] border-t border-white/10"
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Editorial Copy Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p
                data-about-fade
                className="text-xs font-medium tracking-[0.24em] uppercase text-[#C9A96E] mb-5"
              >
                About The Showroom
              </p>

              <h2
                data-about-fade
                className="font-display font-medium text-[#F2F4F7] leading-[1.05] text-balance"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.6rem)' }}
              >
                CRAFTSMANSHIP THAT RESTORES CONFIDENCE.
              </h2>

              <p
                data-about-fade
                className="mt-7 text-base sm:text-lg text-[#C4C9D3] leading-relaxed max-w-xl"
              >
                MUHAMMAD VARSHA is an automotive denting, painting, and body restoration showroom
                built around disciplined workmanship. Whether recovering a single creased panel or
                refinishing an entire exterior, every vehicle is treated with patience, clean
                preparation, and respect for original design lines.
              </p>

              <p
                data-about-fade
                className="mt-5 text-sm sm:text-base text-[#9AA0AB] leading-relaxed max-w-xl"
              >
                Our focus remains straightforward: precise bodywork, controlled paint application,
                and a finished vehicle you feel proud to drive out of the bay.
              </p>
            </div>

            <div data-about-fade className="mt-12 pt-8 border-t border-white/10">
              <ul className="space-y-3.5">
                {PILLARS.map((item, idx) => (
                  <li key={item} className="flex items-baseline gap-4 text-sm text-[#D4D7DD]">
                    <span className="font-mono-tabular text-xs text-[#C9A96E] shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Large Editorial Visual Column */}
          <div className="lg:col-span-6 flex">
            <div
              ref={imageWrapRef}
              data-about-fade
              className="relative w-full min-h-[380px] lg:min-h-full overflow-hidden bg-[#121418] border border-white/10"
            >
              <img
                src="/assets/frames/stage_04_paintbooth.jpg"
                alt="Paint specialist applying precision finish inside the MUHAMMAD VARSHA spray booth"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#070708]/85 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 border-t border-white/15 pt-4">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#C9A96E]">
                    Studio Discipline
                  </p>
                  <p className="mt-1 text-sm text-[#E6E8EC]">
                    Enclosed spray booth · Measured preparation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
