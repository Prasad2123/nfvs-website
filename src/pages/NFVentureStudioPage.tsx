import React, { useState, useEffect, useRef } from 'react';
import { NFNavbar } from '../components/nf/NFNavbar';
import { NFHeroSection } from '../components/nf/NFHeroSection';
import { NFTracksSection } from '../components/nf/NFTracksSection';
import { NFSupportSection } from '../components/nf/NFSupportSection';
import { NFArchitectureAndProcess } from '../components/nf/NFArchitectureAndProcess';
import { NFWhyPartnerSection } from '../components/nf/NFWhyPartnerSection';
import { NFFooter } from '../components/nf/NFFooter';
import { NFApplicationModal } from '../components/nf/NFApplicationModal';
import { NFLabModal } from '../components/nf/NFLabModal';
import { NFMarquee } from '../components/nf/NFMarquee';
import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal';

export const NFVentureStudioPage: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('nf-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('student');
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const [activeLabDomain, setActiveLabDomain] = useState<'AI' | 'IoT' | 'Robotics' | 'Electronics'>('AI');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll reveal hooks
  useScrollReveal();
  useCountUp();

  useEffect(() => {
    localStorage.setItem('nf-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenApplication = (track: string = 'student') => {
    setSelectedTrack(track);
    setIsAppModalOpen(true);
  };

  const handleOpenLab = (domain: 'AI' | 'IoT' | 'Robotics' | 'Electronics') => {
    setActiveLabDomain(domain);
    setIsLabModalOpen(true);
  };

  const handleApplyFromLab = (domain: string) => {
    setSelectedTrack('student');
    setIsAppModalOpen(true);
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-[#0284c7] selection:text-white relative overflow-x-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#060f1e] text-slate-100' : 'bg-slate-50 text-[#081c3b]'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Ambient background glow matching logo colors (Gold & Sapphire Blue) */}
      <div
        className={`fixed top-0 left-1/4 w-72 sm:w-[600px] h-72 sm:h-[600px] rounded-full blur-3xl pointer-events-none -z-10 transition-opacity duration-500 ${
          isDark
            ? 'bg-gradient-to-br from-sky-500/10 via-amber-400/5 to-transparent opacity-100'
            : 'bg-gradient-to-br from-sky-300/20 via-amber-300/15 to-transparent opacity-80'
        }`}
      />
      <div
        className={`fixed bottom-1/3 right-4 sm:right-10 w-60 sm:w-[500px] h-60 sm:h-[500px] rounded-full blur-3xl pointer-events-none -z-10 transition-opacity duration-500 ${
          isDark
            ? 'bg-gradient-to-tl from-amber-400/10 via-blue-600/10 to-transparent opacity-100'
            : 'bg-gradient-to-tl from-amber-300/20 via-blue-400/15 to-transparent opacity-80'
        }`}
      />

      {/* Top sticky Navbar with Theme Toggle and Buttons */}
      <NFNavbar
        onOpenApplication={handleOpenApplication}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* Spacer that pushes content below the fixed navbar */}
        <div className="h-[60px] sm:h-[72px]" aria-hidden="true" />
        {/* Hero Section */}
        <NFHeroSection onOpenApplication={handleOpenApplication} isDark={isDark} />

        {/* Marquee ticker between hero and tracks */}
        <NFMarquee isDark={isDark} />

        {/* Section 1: The Three Specialized Tracks */}
        <NFTracksSection onOpenApplication={handleOpenApplication} isDark={isDark} />

        {/* Section 2: Comprehensive Incubation Support */}
        <NFSupportSection
          onOpenLabDetails={handleOpenLab}
          onOpenApplication={handleOpenApplication}
          isDark={isDark}
        />

        {/* Section 3: Integrated System Architecture & 4-Step Process */}
        <NFArchitectureAndProcess
          onOpenApplication={handleOpenApplication}
          onOpenLabDetails={handleOpenLab}
          isDark={isDark}
        />

        {/* Section 4: Why Partner With NCF? */}
        <NFWhyPartnerSection onOpenApplication={handleOpenApplication} isDark={isDark} />
      </main>

      <NFFooter
        onOpenApplication={handleOpenApplication}
        isDark={isDark}
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />

      {/* Interactive Application Modal */}
      <NFApplicationModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        initialTrack={selectedTrack}
        isDark={isDark}
      />

      {/* Interactive Lab Details Modal */}
      <NFLabModal
        isOpen={isLabModalOpen}
        onClose={() => setIsLabModalOpen(false)}
        activeDomain={activeLabDomain}
        onSelectDomain={(d) => setActiveLabDomain(d)}
        onApply={handleApplyFromLab}
        isDark={isDark}
      />
    </div>
  );
};
