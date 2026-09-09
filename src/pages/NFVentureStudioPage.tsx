import React, { useState, useEffect } from 'react';
import { NFNavbar } from '../components/nf/NFNavbar';
import { NFHeroSection } from '../components/nf/NFHeroSection';
import { NFTracksSection } from '../components/nf/NFTracksSection';
import { NFSupportSection } from '../components/nf/NFSupportSection';
import { NFArchitectureAndProcess } from '../components/nf/NFArchitectureAndProcess';
import { NFWhyPartnerSection } from '../components/nf/NFWhyPartnerSection';
import { NFFooter } from '../components/nf/NFFooter';
import { NFApplicationModal } from '../components/nf/NFApplicationModal';
import { NFLabModal } from '../components/nf/NFLabModal';
import { Phone, Sparkles, ArrowUp } from 'lucide-react';

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
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
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
        {/* Hero Section */}
        <NFHeroSection onOpenApplication={handleOpenApplication} isDark={isDark} />

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

      {/* Bottom Footer & Contact Bar */}
      <NFFooter onOpenApplication={handleOpenApplication} isDark={isDark} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-30 flex flex-col items-end gap-2 sm:gap-3 no-print">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-xl border flex items-center justify-center transition-all hover:scale-110 backdrop-blur-md cursor-pointer ${
              isDark
                ? 'bg-[#0b1e3c]/90 text-sky-400 border-sky-400/40 hover:bg-sky-500/20'
                : 'bg-white text-[#081c3b] border-slate-300 hover:bg-slate-50 shadow-md'
            }`}
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          </button>
        )}

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <a
            href="tel:8379879846"
            className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#081c3b] font-black text-[11px] sm:text-xs shadow-xl hover:shadow-amber-500/40 transition-all flex items-center gap-1.5 sm:gap-2 hover:scale-105 border border-amber-300"
            title="Call Helpline: 8379879846"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#081c3b]" />
            <span className="font-extrabold tracking-wide font-mono">8379879846</span>
          </a>

          <button
            onClick={() => handleOpenApplication('student')}
            className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#081c3b] text-white font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-xl hover:shadow-sky-600/40 transition-all flex items-center gap-1.5 sm:gap-2 border border-sky-400/50 hover:scale-105 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span>Apply Now</span>
          </button>
        </div>
      </div>

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
