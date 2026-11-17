import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Columns2, Maximize2, MoveHorizontal, X } from 'lucide-react';
import {
  GALLERY_ITEMS,
  GalleryItem,
  PORTFOLIO_PROJECTS,
  PortfolioProject,
} from '../config/showroom';

gsap.registerPlugin(ScrollTrigger);

type FilterMode = 'all' | 'transformations' | 'studio';
type CompareMode = 'slider' | 'split';

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<FilterMode>('all');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [activeStudioItem, setActiveStudioItem] = useState<GalleryItem | null>(null);
  const [compareMode, setCompareMode] = useState<CompareMode>('slider');
  const [sliderPos, setSliderPos] = useState(50);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-gallery-card]', {
        y: 24,
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

  useEffect(() => {
    if (!activeProject && !activeStudioItem) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
        setActiveStudioItem(null);
      } else if (e.key === 'ArrowRight') {
        stepModal(1);
      } else if (e.key === 'ArrowLeft') {
        stepModal(-1);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const stepModal = (dir: number) => {
    if (activeProject) {
      const idx = PORTFOLIO_PROJECTS.findIndex((p) => p.id === activeProject.id);
      const next = (idx + dir + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length;
      setActiveProject(PORTFOLIO_PROJECTS[next]);
      setSliderPos(50);
    } else if (activeStudioItem) {
      const idx = GALLERY_ITEMS.findIndex((i) => i.id === activeStudioItem.id);
      const next = (idx + dir + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
      setActiveStudioItem(GALLERY_ITEMS[next]);
    }
  };

  const openProjectModal = (project: PortfolioProject) => {
    setActiveStudioItem(null);
    setActiveProject(project);
    setSliderPos(50);
  };

  const showTransformations = filter === 'all' || filter === 'transformations';
  const showStudio = filter === 'all' || filter === 'studio';

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 sm:py-32 lg:py-40 bg-[#0A0B0D] border-t border-white/10"
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header + Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <p className="text-xs font-medium tracking-[0.24em] uppercase text-[#C9A96E] mb-4">
              Our Work · Portfolio
            </p>
            <h2
              className="font-display font-medium text-[#F2F4F7] leading-[1.06] text-balance"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
            >
              Proven Transformations.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#9AA0AB] max-w-2xl leading-relaxed">
              Real before-and-after dent repair, collision reconstruction, and paint restoration
              work delivered by MUHAMMAD VARSHA.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter portfolio items"
            className="inline-flex items-center gap-1 p-1 bg-[#121418] border border-white/10 self-start lg:self-auto"
          >
            {[
              { id: 'all', label: 'All Work' },
              { id: 'transformations', label: 'Before & After (12)' },
              { id: 'studio', label: 'Studio Bays' },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setFilter(tab.id as FilterMode)}
                  className={`px-4 py-2 text-xs font-medium tracking-[0.1em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#C9A96E] text-[#070708]'
                      : 'text-[#A5ACB8] hover:text-[#F2F4F7]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Client Before & After Portfolio Grid */}
        {showTransformations && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-8">
            {PORTFOLIO_PROJECTS.map((project) => {
              const imgCropClass =
                project.cropMode === 'letterbox'
                  ? 'scale-[1.26] object-center'
                  : project.cropMode === 'screenshot'
                    ? 'scale-[1.04] object-[50%_48%]'
                    : 'object-center';

              return (
                <article
                  key={project.id}
                  data-gallery-card
                  className="group bg-[#0E0F12] border border-white/10 hover:border-[#C9A96E]/55 transition-colors duration-300 overflow-hidden flex flex-col"
                >
                  {/* Side-by-Side Before & After Images */}
                  <div className="grid grid-cols-2 gap-px bg-white/10">
                    {/* Before Photo */}
                    <button
                      type="button"
                      onClick={() => openProjectModal(project)}
                      aria-label={`Inspect before photo for ${project.title}`}
                      className="relative aspect-[5/6] w-full overflow-hidden bg-[#121418] cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                    >
                      <img
                        src={project.beforeImage}
                        alt={`${project.title} — Before repair`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:brightness-105 ${imgCropClass}`}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#070708]/85 via-transparent to-[#070708]/25 pointer-events-none"
                        aria-hidden="true"
                      />
                      <span className="absolute bottom-3 left-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C8CDD6]">
                        Before
                      </span>
                    </button>

                    {/* After Photo */}
                    <button
                      type="button"
                      onClick={() => openProjectModal(project)}
                      aria-label={`Inspect after photo for ${project.title}`}
                      className="relative aspect-[5/6] w-full overflow-hidden bg-[#121418] cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                    >
                      <img
                        src={project.afterImage}
                        alt={`${project.title} — After restoration`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:brightness-105 ${imgCropClass}`}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#070708]/85 via-transparent to-[#070708]/25 pointer-events-none"
                        aria-hidden="true"
                      />
                      <span className="absolute bottom-3 left-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C9A96E]">
                        After
                      </span>
                    </button>
                  </div>

                  {/* Project Metadata Footer */}
                  <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#9AA0AB] mb-2">
                        <span className="font-mono-tabular text-[#C9A96E]">{project.index}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.category}</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-[1.7rem] font-medium text-[#F2F4F7] leading-tight">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-[#9AA0AB] leading-relaxed max-w-md">
                        {project.summary}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => openProjectModal(project)}
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#C9A96E] hover:text-[#DFC38E] transition-colors shrink-0 cursor-pointer"
                    >
                      <MoveHorizontal className="w-4 h-4" aria-hidden="true" />
                      <span>Compare</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Studio Bays Showcase Captures */}
        {showStudio && (
          <div className={showTransformations ? 'mt-16 pt-14 border-t border-white/10' : ''}>
            {showTransformations && (
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C9A96E]">
                    Studio Facility
                  </p>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-[#F2F4F7]">
                    Inside the Bodywork &amp; Paint Bays
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#8F96A3]">
                  Controlled lighting, panel preparation, and spray booth execution
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-7">
              {GALLERY_ITEMS.map((item) => {
                const colSpan = item.aspect === 'wide' ? 'md:col-span-7' : 'md:col-span-5';
                return (
                  <article
                    key={item.id}
                    data-gallery-card
                    className={`${colSpan} group relative bg-[#0E0F12] border border-white/10 hover:border-[#C9A96E]/50 transition-colors duration-300 overflow-hidden flex flex-col`}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#14161A]">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#0E0F12]/90 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setActiveProject(null);
                          setActiveStudioItem(item);
                        }}
                        aria-label={`Inspect ${item.title} in fullscreen`}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-[#070708]/75 border border-white/20 text-[#E6E8EC] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors cursor-pointer"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-6 flex items-end justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#9AA0AB] mb-1.5">
                          <span className="font-mono-tabular text-[#C9A96E]">{item.index}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.sourceLabel}</span>
                        </div>
                        <h4 className="font-display text-xl sm:text-2xl font-medium text-[#F2F4F7]">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-[#8F96A3]">{item.subtitle}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveProject(null);
                          setActiveStudioItem(item);
                        }}
                        className="text-xs font-medium tracking-[0.14em] uppercase text-[#C9A96E] hover:text-[#DFC38E] transition-colors shrink-0 cursor-pointer"
                      >
                        Inspect
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Before / After Comparison Lightbox */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.title}
          className="fixed inset-0 z-50 bg-[#050506]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#C8CDD6]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono-tabular text-[#C9A96E]">{activeProject.index}</span>
              <span aria-hidden="true">·</span>
              <span className="uppercase tracking-[0.18em]">{activeProject.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCompareMode('slider')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 border text-xs uppercase tracking-[0.12em] cursor-pointer transition-colors ${
                  compareMode === 'slider'
                    ? 'border-[#C9A96E] bg-[#C9A96E] text-[#070708]'
                    : 'border-white/20 text-[#C8CDD6] hover:border-white/40'
                }`}
              >
                <MoveHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Slider</span>
              </button>
              <button
                type="button"
                onClick={() => setCompareMode('split')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 border text-xs uppercase tracking-[0.12em] cursor-pointer transition-colors ${
                  compareMode === 'split'
                    ? 'border-[#C9A96E] bg-[#C9A96E] text-[#070708]'
                    : 'border-white/20 text-[#C8CDD6] hover:border-white/40'
                }`}
              >
                <Columns2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Side-by-Side</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close comparison view"
                className="w-10 h-10 flex items-center justify-center border border-white/20 text-[#F2F4F7] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors cursor-pointer ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className="flex-1 flex items-center justify-center my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => stepModal(-1)}
              aria-label="Previous project"
              className="hidden sm:flex w-12 h-12 items-center justify-center border border-white/15 bg-[#0A0B0D]/80 text-[#F2F4F7] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors mr-4 cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {compareMode === 'slider' ? (
              <div className="relative w-full max-w-xl aspect-[5/6] max-h-[70vh] overflow-hidden bg-[#0E0F12] border border-white/15 select-none">
                {/* Base After Image */}
                <img
                  src={activeProject.afterImage}
                  alt={`${activeProject.title} — After`}
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover ${
                    activeProject.cropMode === 'letterbox'
                      ? 'scale-[1.26] object-center'
                      : activeProject.cropMode === 'screenshot'
                        ? 'scale-[1.04] object-[50%_48%]'
                        : 'object-center'
                  }`}
                />

                {/* Clipped Before Image */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={activeProject.beforeImage}
                    alt={`${activeProject.title} — Before`}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover ${
                      activeProject.cropMode === 'letterbox'
                        ? 'scale-[1.26] object-center'
                        : activeProject.cropMode === 'screenshot'
                          ? 'scale-[1.04] object-[50%_48%]'
                          : 'object-center'
                    }`}
                  />
                </div>

                {/* Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-[#C9A96E] pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-[#070708]/90 border border-[#C9A96E] flex items-center justify-center text-[#C9A96E]">
                    <MoveHorizontal className="w-4 h-4" />
                  </div>
                </div>

                {/* Labels */}
                <span className="absolute top-4 left-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#E6E8EC] bg-[#070708]/75 px-2.5 py-1 pointer-events-none">
                  Before
                </span>
                <span className="absolute top-4 right-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A96E] bg-[#070708]/75 px-2.5 py-1 pointer-events-none">
                  After
                </span>

                {/* Accessible Range Input Overlay */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  aria-label="Slide to compare before and after restoration"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
                <div className="relative aspect-[5/6] max-h-[70vh] overflow-hidden bg-[#0E0F12] border border-white/15">
                  <img
                    src={activeProject.beforeImage}
                    alt={`${activeProject.title} — Before`}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover ${
                      activeProject.cropMode === 'letterbox'
                        ? 'scale-[1.26] object-center'
                        : activeProject.cropMode === 'screenshot'
                          ? 'scale-[1.04] object-[50%_48%]'
                          : 'object-center'
                    }`}
                  />
                  <span className="absolute top-4 left-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#E6E8EC] bg-[#070708]/75 px-2.5 py-1">
                    Before
                  </span>
                </div>
                <div className="relative aspect-[5/6] max-h-[70vh] overflow-hidden bg-[#0E0F12] border border-white/15">
                  <img
                    src={activeProject.afterImage}
                    alt={`${activeProject.title} — After`}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover ${
                      activeProject.cropMode === 'letterbox'
                        ? 'scale-[1.26] object-center'
                        : activeProject.cropMode === 'screenshot'
                          ? 'scale-[1.04] object-[50%_48%]'
                          : 'object-center'
                    }`}
                  />
                  <span className="absolute top-4 left-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A96E] bg-[#070708]/75 px-2.5 py-1">
                    After
                  </span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => stepModal(1)}
              aria-label="Next project"
              className="hidden sm:flex w-12 h-12 items-center justify-center border border-white/15 bg-[#0A0B0D]/80 text-[#F2F4F7] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors ml-4 cursor-pointer shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div
            className="max-w-3xl mx-auto text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl text-[#F2F4F7]">{activeProject.title}</h3>
            <p className="mt-1 text-xs sm:text-sm text-[#9AA0AB]">{activeProject.summary}</p>
          </div>
        </div>
      )}

      {/* Studio Bay Fullscreen Lightbox */}
      {activeStudioItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeStudioItem.title}
          className="fixed inset-0 z-50 bg-[#050506]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          onClick={() => setActiveStudioItem(null)}
        >
          <div
            className="flex items-center justify-between gap-4 text-xs text-[#C8CDD6]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono-tabular text-[#C9A96E]">{activeStudioItem.index}</span>
              <span aria-hidden="true">·</span>
              <span className="uppercase tracking-[0.18em]">{activeStudioItem.sourceLabel}</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveStudioItem(null)}
              aria-label="Close image preview"
              className="w-11 h-11 flex items-center justify-center border border-white/20 text-[#F2F4F7] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative flex-1 flex items-center justify-center my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => stepModal(-1)}
              aria-label="Previous image"
              className="hidden sm:flex w-12 h-12 items-center justify-center border border-white/15 bg-[#0A0B0D]/80 text-[#F2F4F7] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors mr-4 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <img
              src={activeStudioItem.image}
              alt={activeStudioItem.title}
              referrerPolicy="no-referrer"
              className="max-h-[74vh] max-w-full object-contain border border-white/10"
            />

            <button
              type="button"
              onClick={() => stepModal(1)}
              aria-label="Next image"
              className="hidden sm:flex w-12 h-12 items-center justify-center border border-white/15 bg-[#0A0B0D]/80 text-[#F2F4F7] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors ml-4 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div
            className="max-w-3xl mx-auto text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl text-[#F2F4F7]">{activeStudioItem.title}</h3>
            <p className="mt-1 text-xs sm:text-sm text-[#9AA0AB]">{activeStudioItem.subtitle}</p>
          </div>
        </div>
      )}
    </section>
  );
}
