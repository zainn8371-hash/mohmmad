import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { ProcessSection } from './components/ProcessSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ContactBookingSection } from './components/ContactBookingSection';
import { Footer } from './components/Footer';
import { SERVICES } from './config/showroom';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].title);

  useEffect(() => {
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    let resizeTimer = 0;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.clearTimeout(refreshTimer);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookClick = () => {
    scrollToSection('contact');
  };

  const handleExploreWork = () => {
    scrollToSection('gallery');
  };

  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#070708] text-[#E6E8EC]">
      <Navbar onBookClick={handleBookClick} />

      <main>
        <HeroSection
          onExploreWork={handleExploreWork}
          onBookService={handleBookClick}
        />

        <AboutSection />

        <ServicesSection onSelectServiceForBooking={handleSelectServiceForBooking} />

        <GallerySection />

        <ProcessSection />

        <WhyChooseUsSection />

        <ContactBookingSection preselectedService={selectedService} />
      </main>

      <Footer />
    </div>
  );
}
