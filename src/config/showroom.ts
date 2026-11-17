export interface ShowroomConfig {
  brandName: string;
  tagline: string;
  footerStatement: string;
  whatsappNumber: string;
  phoneDisplay: string;
  email: string;
  addressDisplay: string;
  mapsUrl: string;
  openingHours: string;
}

export const SHOWROOM_CONFIG: ShowroomConfig = {
  brandName: 'MUHAMMAD VARSHA',
  tagline: 'PERFECTION IN EVERY DETAIL.',
  footerStatement: 'EXCELLENCE IN AUTOMOTIVE RESTORATION.',
  whatsappNumber: '966571212767',
  phoneDisplay: '0571212767',
  email: 'rohailrohailsyeddd@gmail.com',
  addressDisplay: 'Configure Showroom Street Address, City',
  mapsUrl: '',
  openingHours: 'Configure Opening Hours',
};

export function buildWhatsAppUrl(message: string): string | null {
  const digits = SHOWROOM_CONFIG.whatsappNumber.replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortDescription: string;
  detailedSummary: string;
  scopePoints: string[];
  image: string;
  imageAlt: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'dent-repair',
    index: '01',
    title: 'Automotive Dent Repair',
    shortDescription: 'Professional dent removal and vehicle body restoration.',
    detailedSummary:
      'Precision structural and cosmetic dent recovery designed to restore original factory panel contours without compromising surrounding finishes.',
    scopePoints: [
      'Crease, impact, and parking-dent straightening',
      'Panel contour alignment and gap verification',
      'Clean surface preparation prior to priming',
    ],
    image: '/assets/frames/stage_01_bay.jpg',
    imageAlt: 'Technician inspecting and prepping a silver coupe fender inside the MUHAMMAD VARSHA studio',
  },
  {
    id: 'car-painting',
    index: '02',
    title: 'Professional Car Painting',
    shortDescription: 'High-quality automotive paint application and finishing.',
    detailedSummary:
      'Controlled-environment paint application focused on color accuracy, uniform film build, and crisp gloss or satin clarity.',
    scopePoints: [
      'Enclosed paint booth spraying for dust control',
      'Accurate shade matching for OEM and bespoke finishes',
      'Layered basecoat and clearcoat curing',
    ],
    image: '/assets/frames/stage_04_paintbooth.jpg',
    imageAlt: 'Paint technician in protective suit spraying a matte black coupe inside the paint booth',
  },
  {
    id: 'accident-damage',
    index: '03',
    title: 'Accident Damage Repair',
    shortDescription: 'Restoration of damaged vehicle body panels.',
    detailedSummary:
      'Methodical restoration of collision-affected exterior panels, returning structural fitment and visual symmetry to showroom standards.',
    scopePoints: [
      'Comprehensive exterior damage assessment',
      'Panel reshaping, replacement fitment, and alignment',
      'Seamless transition blending into adjacent bodywork',
    ],
    image: '/assets/frames/stage_02_metalwork.jpg',
    imageAlt: 'Technician performing precision bodywork and metalwork preparation on a vehicle frame',
  },
  {
    id: 'scratch-correction',
    index: '04',
    title: 'Scratch & Paint Correction',
    shortDescription: 'Repairing visible scratches and improving exterior appearance.',
    detailedSummary:
      'Targeted surface remediation to address clearcoat scuffs, key marks, swirl haze, and localized paint blemishes.',
    scopePoints: [
      'Surface depth inspection under studio lighting',
      'Localized refinishing or multi-stage surface leveling',
      'Uniform gloss restoration and final surface check',
    ],
    image: '/assets/frames/stage_05_finished.jpg',
    imageAlt: 'Finished satin-black luxury coupe showing uniform exterior finish under studio booth lighting',
  },
  {
    id: 'bodywork-restoration',
    index: '05',
    title: 'Bodywork & Panel Restoration',
    shortDescription: 'Professional preparation, reshaping, and finishing.',
    detailedSummary:
      'Disciplined metalwork, sanding, and surface fairing to ensure crisp body lines and flat reflections across every restored panel.',
    scopePoints: [
      'Precision sanding and bare-metal conditioning',
      'Contour block-sanding for distortion-free surfaces',
      'Primer surfacing ready for final topcoat',
    ],
    image: '/assets/frames/stage_03_sparks.jpg',
    imageAlt: 'Bodywork technician shaping and grinding steel panel structure in the workshop',
  },
  {
    id: 'full-repainting',
    index: '06',
    title: 'Full Vehicle Repainting',
    shortDescription: 'Complete exterior repainting services.',
    detailedSummary:
      'End-to-end exterior refinishing for vehicles requiring a complete surface renewal or a disciplined color transformation.',
    scopePoints: [
      'Full-body disassembly of exterior trim where required',
      'Uniform multi-stage primer, basecoat, and clearcoat',
      'Panel-by-panel studio light inspection before handover',
    ],
    image: '/assets/frames/stage_06_reveal.jpg',
    imageAlt: 'Completed full exterior refinishing showcase inside the MUHAMMAD VARSHA studio',
  },
];

export interface ScrollChapter {
  index: string;
  label: string;
  headline: string;
  caption: string;
  start: number;
  end: number;
  fallbackImage: string;
}

export const SCROLL_CHAPTERS: ScrollChapter[] = [
  {
    index: '01',
    label: 'Workshop Intake',
    headline: 'Inside the Studio Bay',
    caption: 'Every vehicle enters a clean, brightly lit bay for panel inspection and careful disassembly.',
    start: 0.0,
    end: 0.2,
    fallbackImage: '/assets/frames/stage_01_bay.jpg',
  },
  {
    index: '02',
    label: 'Bodywork & Shaping',
    headline: 'Precision Denting & Metalwork',
    caption: 'Trained technicians restore original panel geometry and prepare bare metal with disciplined control.',
    start: 0.2,
    end: 0.42,
    fallbackImage: '/assets/frames/stage_02_metalwork.jpg',
  },
  {
    index: '03',
    label: 'Surface Preparation',
    headline: 'Refining Every Contour',
    caption: 'Controlled fabrication and surface conditioning ensure smooth, distortion-free panel transitions.',
    start: 0.42,
    end: 0.64,
    fallbackImage: '/assets/frames/stage_03_sparks.jpg',
  },
  {
    index: '04',
    label: 'Paint Booth',
    headline: 'Precision Paint Application',
    caption: 'Inside the sealed spray booth, atomized coatings build an even, factory-grade finish.',
    start: 0.64,
    end: 0.84,
    fallbackImage: '/assets/frames/stage_04_paintbooth.jpg',
  },
  {
    index: '05',
    label: 'Showroom Reveal',
    headline: 'Finished to Standard',
    caption: 'Under calibrated booth illumination, every reflection and panel gap is verified before delivery.',
    start: 0.84,
    end: 1.0,
    fallbackImage: '/assets/frames/stage_05_finished.jpg',
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Inspection',
    description: "Understanding the vehicle's condition.",
  },
  {
    index: '02',
    title: 'Preparation',
    description: 'Preparing the damaged bodywork.',
  },
  {
    index: '03',
    title: 'Restoration',
    description: 'Professional denting and body repair.',
  },
  {
    index: '04',
    title: 'Painting',
    description: 'Precision painting and finishing.',
  },
  {
    index: '05',
    title: 'Final Inspection',
    description: 'Reviewing the finished vehicle before delivery.',
  },
];

export interface PortfolioProject {
  id: string;
  index: string;
  category: string;
  title: string;
  summary: string;
  beforeImage: string;
  afterImage: string;
  cropMode: 'letterbox' | 'screenshot' | 'full';
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'project-rear-quarter-dent',
    index: '01',
    category: 'Dent Repair',
    title: 'Rear Quarter & Bumper Dent Recovery',
    summary: 'Deep rear-corner impact crease restored to clean factory curvature and pearl-white gloss.',
    beforeImage: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_4.35.39_AM__1__f95f4392.jpeg',
    afterImage: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_4.35.39_AM_185bca95.jpeg',
    cropMode: 'letterbox',
  },
  {
    id: 'project-suv-fender-arch',
    index: '02',
    category: 'Bodywork & Paint',
    title: 'SUV Fender & Wheel Arch Restoration',
    summary: 'Damaged wheel-arch cladding and creased fender reshaped, aligned, and color-matched.',
    beforeImage: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_4.35.40_AM_28872250.jpeg',
    afterImage: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_4.35.39_AM__2__636373d8.jpeg',
    cropMode: 'screenshot',
  },
  {
    id: 'project-black-sedan-front',
    index: '03',
    category: 'Collision Restoration',
    title: 'Black Sedan Front-End Reconstruction',
    summary: 'Front bumper, hood corner, and headlamp alignment restored with deep gloss black refinishing.',
    beforeImage: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_4.35.40_AM__2__eef3a292.jpeg',
    afterImage: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_4.35.40_AM__1__21d85efc.jpeg',
    cropMode: 'screenshot',
  },
  {
    id: 'project-pickup-front-fender',
    index: '04',
    category: 'Panel Restoration',
    title: 'Pickup Front Fender & Bumper Alignment',
    summary: 'Crushed front quarter panel, headlamp surround, and bumper corner rebuilt to factory gaps.',
    beforeImage: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_4.35.40_AM__4__4144920e.jpeg',
    afterImage: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_4.35.40_AM__3__43b3f9c2.jpeg',
    cropMode: 'screenshot',
  },
  {
    id: 'project-hyundai-front-end',
    index: '05',
    category: 'Collision & Paint',
    title: 'Hyundai Sedan Front-End & Fender Rebuild',
    summary: 'Severe front bumper, headlamp, and right fender damage rebuilt with seamless gloss-black paint.',
    beforeImage: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_5.51.08_AM_62fe5d85.jpeg',
    afterImage: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_5.51.08_AM__2__a4fcd592.jpeg',
    cropMode: 'full',
  },
  {
    id: 'project-camry-front-restoration',
    index: '06',
    category: 'Bodywork & Refinishing',
    title: 'Toyota Camry Front Restoration & Paint',
    summary: 'Front bumper assembly, dented fender, and front fascia restored with uniform metallic finish.',
    beforeImage: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.00.42_AM_4cceeb72.jpeg',
    afterImage: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_6.00.41_AM_7ccab3b4.jpeg',
    cropMode: 'full',
  },
];

export interface GalleryItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  sourceLabel: string;
  image: string;
  aspect: 'wide' | 'standard';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'ws-intake',
    index: '01',
    title: 'Front Fender & Structural Preparation',
    subtitle: 'Workshop bay · Precision masking & inspection',
    sourceLabel: 'Studio Capture',
    image: '/assets/frames/stage_01_bay.jpg',
    aspect: 'wide',
  },
  {
    id: 'ws-metalwork',
    index: '02',
    title: 'Metal Conditioning & Panel Shaping',
    subtitle: 'Fabrication bay · Surface leveling',
    sourceLabel: 'Studio Capture',
    image: '/assets/frames/stage_02_metalwork.jpg',
    aspect: 'standard',
  },
  {
    id: 'ws-paint',
    index: '03',
    title: 'Sealed Booth Refinishing',
    subtitle: 'Paint booth · Controlled lacquer application',
    sourceLabel: 'Studio Capture',
    image: '/assets/frames/stage_04_paintbooth.jpg',
    aspect: 'standard',
  },
  {
    id: 'ws-finished',
    index: '04',
    title: 'Completed Matte Finish Inspection',
    subtitle: 'Final lighting bay · Delivery review',
    sourceLabel: 'Studio Capture',
    image: '/assets/frames/stage_05_finished.jpg',
    aspect: 'wide',
  },
];

export const STANDARDS: { index: string; title: string; detail: string }[] = [
  {
    index: '01',
    title: 'Professional Attention to Detail',
    detail: 'Every crease, panel gap, and clearcoat edge is evaluated closely rather than rushed through.',
  },
  {
    index: '02',
    title: 'Careful Workmanship',
    detail: 'Disciplined preparation and clean masking protect adjacent trim, glass, and factory components.',
  },
  {
    index: '03',
    title: 'Quality-Focused Finishing',
    detail: 'Coatings are applied in a controlled booth to achieve clean reflection depth and consistent texture.',
  },
  {
    index: '04',
    title: 'Modern Equipment & Techniques',
    detail: 'Updated body repair tools and structured refinishing workflows support dependable outcomes.',
  },
  {
    index: '05',
    title: 'Customer-Focused Service',
    detail: 'Clear communication from initial inspection through final walkthrough before vehicle handover.',
  },
];
