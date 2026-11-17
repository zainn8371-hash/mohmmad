import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../config/showroom';

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-process-step]', {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
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
      id="process"
      ref={sectionRef}
      className="py-24 sm:py-32 lg:py-36 bg-[#070708] border-t border-white/10"
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-2xl mb-16 sm:mb-20">
          <p className="text-xs font-medium tracking-[0.24em] uppercase text-[#C9A96E] mb-4">
            The Process
          </p>
          <h2
            className="font-display font-medium text-[#F2F4F7] leading-[1.06] text-balance"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
          >
            Five Disciplined Stages.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#9AA0AB] leading-relaxed">
            Every vehicle follows a structured studio sequence from initial condition review to
            final delivery verification.
          </p>
        </div>

        {/* Horizontal 5-Column Timeline on Desktop, Vertical Stack on Mobile */}
        <div className="relative">
          <div
            className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-white/12"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.index}
                data-process-step
                className="relative pt-0 lg:pt-12 border-t lg:border-t-0 border-white/10 pt-6 lg:pt-0"
              >
                {/* Node Marker on Desktop Rail */}
                <div className="lg:absolute lg:top-0 lg:left-0 flex items-center gap-3 mb-4 lg:mb-0">
                  <span className="w-12 h-12 flex items-center justify-center bg-[#0E0F12] border border-[#C9A96E]/45 font-mono-tabular text-xs tracking-[0.15em] text-[#C9A96E]">
                    {step.index}
                  </span>
                </div>

                <div className="lg:mt-16">
                  <h3 className="font-display text-2xl font-medium text-[#F2F4F7]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#9AA0AB] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
