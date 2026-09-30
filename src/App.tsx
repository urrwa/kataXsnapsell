import React, { useState, useRef, useCallback } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Modal, ModalType } from './components/Modal';

// 13 Full-Screen Sections
import { HeroSection } from './components/sections/HeroSection';
import { StruggleSection } from './components/sections/StruggleSection';
import { MeetKataSection } from './components/sections/MeetKataSection';
import { ThreePillarsSection } from './components/sections/ThreePillarsSection';
import { AiChatSection } from './components/sections/AiChatSection';
import { AiContentSection } from './components/sections/AiContentSection';
import { SnapSellSection } from './components/sections/SnapSellSection';
import { ConnectedJourneySection } from './components/sections/ConnectedJourneySection';
import { ExpertTeamSection } from './components/sections/ExpertTeamSection';
import { GlobalLifestyleSection } from './components/sections/GlobalLifestyleSection';
import { ProductionsSection } from './components/sections/ProductionsSection';
import { GrowthSection } from './components/sections/GrowthSection';
import { FinalApplicationSection } from './components/sections/FinalApplicationSection';

import { SectionProgress, AcademySection } from './components/BriefAdditions';
import { MotionConfig } from 'motion/react';

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollReveal(containerRef);

  // Smooth Navigation to any Section
  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user"><div className="relative min-h-screen bg-[#080808] text-[#F8F6F7] selection:bg-[#20C997] selection:text-white overflow-x-clip">
      {/* Top Header */}
      <Header
        onNavigate={scrollToSection}
        onOpenAssetGuide={() => setActiveModal('assets')}
      />

      {/* Main Continuous Flow Container */}
      <main id="main-content" ref={containerRef} className="w-full relative overflow-visible">
        {/* Section 01: Hero */}
        <HeroSection
          onJoin={() => scrollToSection('section-13')}
          onExplore={() => scrollToSection('section-4')}
          onScrollNext={() => scrollToSection('section-2')}
        />

        {/* Section 02: The Current Struggle */}
        <StruggleSection
          onNext={() => scrollToSection('section-4')}
        />

        {/* Section 03: Meet Kata */}
        <MeetKataSection
          onStartWithKata={() => scrollToSection('section-13')}
        />

        {/* Section 04: Three Pillars Overview */}
        <ThreePillarsSection
          onSelectPillar={(targetId) => scrollToSection(targetId)}
        />

        {/* Section 05: Pillar 01 - AI Chat Support */}
        <AiChatSection />

        {/* Section 06: Pillar 02 - AI Content Creation */}
        <AiContentSection />

        {/* Section 07: Pillar 03 - SnapSell Direct Sales */}
        <SnapSellSection
          onDiscoverSnapSell={() => scrollToSection('section-8')}
        />

        {/* Section 08: Connected Journey */}
        <ConnectedJourneySection />

        {/* Section 09: Expert Team */}
        <AcademySection />
        <ExpertTeamSection />

        {/* Section 10: Global Creator Lifestyle */}
        <GlobalLifestyleSection
          onExploreOpportunities={() => scrollToSection('section-13')}
        />

        {/* Section 11: Professional Productions */}
        

        {/* Section 12: Growth Potential & Transparent Disclaimer */}
        <GrowthSection />

        {/* Section 13: Final CTA & Application Form */}
        <FinalApplicationSection
          onOpenModal={(type) => setActiveModal(type)}
          onSuccessReturn={() => scrollToSection('section-1')}
        />

        {/* Footer */}
        <Footer
          onOpenModal={(type) => setActiveModal(type)}
          onNavigate={scrollToSection}
        />
      </main>

      {/* Accessible Global Modals (Privacy, Terms, Legal, Contact, Asset Slots) */}
      <Modal
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div></MotionConfig>
  );
}
