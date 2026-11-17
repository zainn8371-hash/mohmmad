import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';
import { SCROLL_CHAPTERS, SHOWROOM_CONFIG } from '../config/showroom';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onExploreWork: () => void;
  onBookService: () => void;
}

export function HeroSection({ onExploreWork, onBookService }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  // Entrance animation for hero typography on initial mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !pinRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-hero-reveal]', {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, pinRef);

    return () => ctx.revert();
  }, []);

  // Unlock mobile Safari video frame seeking on first touch/pointer interaction
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    let unlocked = false;
    const unlock = () => {
      if (unlocked || !video) return;
      unlocked = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            video.pause();
          })
          .catch(() => {
            // Safe ignore if browser prevents programmatic unlock
          });
      }
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('pointerdown', unlock);
    };

    window.addEventListener('touchstart', unlock, { passive: true });
    window.addEventListener('pointerdown', unlock, { passive: true });

    return () => {
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('pointerdown', unlock);
    };
  }, [reducedMotion]);

  // GSAP ScrollTrigger pinning + rAF interpolated scrubbing directly inside the Hero
  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !pinRef.current) return;

    const video = videoRef.current;
    let rafId = 0;
    let lastRenderedUiProgress = -1;

    const handleLoadedMetadata = () => {
      if (video && video.readyState >= 1) {
        setVideoReady(true);
      }
    };

    if (video) {
      if (video.readyState >= 1) {
        setVideoReady(true);
      }
      video.addEventListener('loadeddata', handleLoadedMetadata);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: pinRef.current,
        start: 'top top',
        end: '+=320%',
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetProgressRef.current = self.progress;
        },
      });
    }, sectionRef);

    const tick = () => {
      const target = targetProgressRef.current;
      const prev = currentProgressRef.current;
      const next = prev + (target - prev) * 0.14;
      currentProgressRef.current = Math.abs(target - next) < 0.0005 ? target : next;

      if (video && video.readyState >= 2 && Number.isFinite(video.duration) && video.duration > 0) {
        const clamped = Math.min(0.996, Math.max(0.01, currentProgressRef.current));
        const targetTime = clamped * video.duration;
        if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.018) {
          video.currentTime = targetTime;
        }
      }

      if (Math.abs(currentProgressRef.current - lastRenderedUiProgress) > 0.005) {
        lastRenderedUiProgress = currentProgressRef.current;
        setDisplayProgress(currentProgressRef.current);

        const chapterIdx = SCROLL_CHAPTERS.findIndex(
          (ch, idx) =>
            currentProgressRef.current >= ch.start &&
            (currentProgressRef.current < ch.end || idx === SCROLL_CHAPTERS.length - 1)
        );
        if (chapterIdx !== -1) {
          setActiveIndex(chapterIdx);
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      scrollTriggerRef.current = null;
      if (video) {
        video.removeEventListener('loadeddata', handleLoadedMetadata);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
      ctx.revert();
    };
  }, [reducedMotion]);

  const activeChapter = SCROLL_CHAPTERS[activeIndex] ?? SCROLL_CHAPTERS[0];
  const isWorkshopWalkthrough = !reducedMotion && displayProgress > 0.08;

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Hero and Scroll-Controlled Workshop Tour"
      className="relative w-full bg-[#070708]"
    >
      <div
        ref={pinRef}
        className="relative min-h-screen h-screen w-full overflow-hidden bg-[#070708]"
      >
        {/* Crisp Fallback Frame Layer */}
        <img
          src={activeChapter.fallbackImage}
          alt={activeChapter.headline}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Scroll-Synchronized All-Keyframe Workshop Video */}
        {!reducedMotion && (
          <video
            ref={videoRef}
            src="/assets/aistudio/workshop_scrub.mp4"
            poster="/assets/frames/stage_01_bay.jpg"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Measured Studio Vignette & Legibility Scrim */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/35 to-[#070708]/65 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#070708]/85 via-[#070708]/25 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Foreground Content & Interactive Workshop HUD */}
        <div className="relative z-10 h-full w-full px-5 sm:px-8 lg:px-12 xl:px-16 pt-24 pb-8 sm:pb-12 flex flex-col justify-between">
          {/* Top Stage Indicator Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-4">
              <span className="font-mono-tabular text-xs tracking-[0.2em] text-[#C9A96E]">
                {activeChapter.index} / 05
              </span>
              <span className="text-xs tracking-[0.18em] uppercase text-[#C8CDD6]">
                {activeChapter.label}
              </span>
            </div>
            <p className="text-xs text-[#9AA0AB]">
              Scroll continuously to move through the restoration studio
            </p>
          </div>

          {/* Center-Bottom Editorial Lockup (Transitions cleanly between Hero Intro & Scroll Stages) */}
          <div className="space-y-8">
            <div className="max-w-4xl">
              {!isWorkshopWalkthrough ? (
                <div>
                  <p
                    data-hero-reveal
                    className="text-xs sm:text-sm font-medium tracking-[0.28em] text-[#C9A96E] uppercase mb-4"
                  >
                    {SHOWROOM_CONFIG.brandName}
                  </p>

                  <h1
                    data-hero-reveal
                    className="font-display font-medium text-[#F2F4F7] tracking-[-0.02em] leading-[1.02] text-balance"
                    style={{ fontSize: 'clamp(2.65rem, 5.8vw, 4.9rem)' }}
                  >
                    PERFECTION IN EVERY DETAIL.
                  </h1>

                  <p
                    data-hero-reveal
                    className="mt-5 text-base sm:text-lg lg:text-xl text-[#C8CDD6] max-w-xl leading-relaxed font-normal"
                  >
                    Premium Automotive Denting, Painting &amp; Restoration.
                  </p>

                  <div
                    data-hero-reveal
                    className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5"
                  >
                    <button
                      type="button"
                      onClick={onBookService}
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase bg-[#C9A96E] text-[#070708] hover:bg-[#DFC38E] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC38E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708]"
                    >
                      <span>BOOK YOUR SERVICE</span>
                      <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={onExploreWork}
                      className="inline-flex items-center justify-center px-7 py-4 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase border border-[#E6E8EC]/30 text-[#E6E8EC] bg-[#070708]/45 backdrop-blur-sm hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                    >
                      EXPLORE OUR WORK
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl">
                  <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C9A96E] mb-3">
                    {activeChapter.label}
                  </p>
                  <h2
                    className="font-display font-medium text-[#F2F4F7] leading-[1.06] text-balance"
                    style={{ fontSize: 'clamp(2rem, 4.2vw, 3.5rem)' }}
                  >
                    {activeChapter.headline}
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-[#D0D5DE] max-w-xl leading-relaxed">
                    {activeChapter.caption}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
