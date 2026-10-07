import React, { useState, useEffect } from 'react';
import { NFNavbar } from '../components/nf/NFNavbar';
import { NFFooter } from '../components/nf/NFFooter';
import { NFApplicationModal } from '../components/nf/NFApplicationModal';
import { NFApplicationForm } from '../components/nf/NFApplicationForm';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Building2,
  GraduationCap,
  Copy,
  Check,
  ShieldCheck,
  Rocket,
  Compass,
} from 'lucide-react';

export const NFContactPage: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('nf-theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('student');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Scroll reveal hook
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
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

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('8379879846');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@nareecarefoundation.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-[#0284c7] selection:text-white relative overflow-x-hidden transition-colors duration-300 animate-fadeIn ${
        isDark ? 'bg-[#060f1e] text-slate-100' : 'bg-slate-50 text-[#081c3b]'
      }`}
    >
      {/* Background Ambient Glows aligned to brand Gold & Blue */}
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

      {/* Top Navbar */}
      <NFNavbar
        onOpenApplication={handleOpenApplication}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 w-full pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">

          {/* ========================================================= */}
          {/* 1. Hero Introduction Header                               */}
          {/* ========================================================= */}
          <section className="text-center pt-4 sm:pt-8 reveal">
            <div className="flex justify-center mb-3">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
                  isDark
                    ? 'bg-[#0b1d3a] border-sky-400/40 text-sky-300'
                    : 'bg-white border-slate-300 text-[#0369a1] shadow-xs'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Executive Office & Incubation Desk • Pune</span>
              </div>
            </div>

            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight max-w-4xl mx-auto leading-tight ${
                isDark
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-amber-200'
                  : 'text-[#081c3b]'
              }`}
            >
              Start Your Innovation Journey
            </h1>

            <p
              className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-3.5 leading-relaxed font-normal ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Partner with NF Venture Studio to establish turnkey campus incubation centers, commercialize deep-tech research, or accelerate your startup venture with institutional backing.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono font-bold">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border ${
                  isDark
                    ? 'bg-amber-500/10 border-amber-400/30 text-amber-300'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                Campus Partnerships
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border ${
                  isDark
                    ? 'bg-sky-500/10 border-sky-400/30 text-sky-300'
                    : 'bg-sky-50 border-sky-200 text-[#0284c7]'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                Student & Faculty Track
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border ${
                  isDark
                    ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Institutional Rigor
              </span>
            </div>
          </section>

          {/* ========================================================= */}
          {/* 2. Main Grid: Contact Info (Left) + Form (Right)          */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* Left Column: Direct Office Contact Details */}
            <div className="lg:col-span-5 space-y-6">

              {/* Primary Contact Card */}
              <div
                className={`p-6 sm:p-7 rounded-3xl border shadow-xl transition-all duration-300 relative overflow-hidden ${
                  isDark
                    ? 'bg-[#0a1832]/90 border-sky-500/30 shadow-sky-950/40'
                    : 'bg-white border-slate-200 shadow-slate-200/60'
                }`}
              >
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#fbbf24] via-[#38bdf8] to-[#0284c7]" />

                <div className="space-y-5 pl-1.5 sm:pl-2">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
                      Official Communications
                    </span>
                    <h2
                      className={`text-xl font-black uppercase tracking-tight mt-1 ${
                        isDark ? 'text-white' : 'text-[#081c3b]'
                      }`}
                    >
                      NF Venture Studio
                    </h2>
                    <p className={`text-xs font-mono mt-0.5 ${isDark ? 'text-sky-300' : 'text-[#0284c7]'}`}>
                      A NAREE Care Foundation Initiative
                    </p>
                  </div>

                  <div className="h-px bg-slate-800/80" />

                  {/* Phone Helpline */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${
                        isDark
                          ? 'bg-amber-400/10 border-amber-400/30 text-amber-300'
                          : 'bg-amber-50 border-amber-200 text-amber-800'
                      }`}
                    >
                      <Phone className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Direct Incubation Helpline
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <a
                          href="tel:8379879846"
                          className={`text-sm sm:text-base font-mono font-black tracking-wider transition-colors ${
                            isDark ? 'text-white hover:text-amber-300' : 'text-[#081c3b] hover:text-[#0284c7]'
                          }`}
                        >
                          +91 8379879846
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyPhone}
                          title="Copy phone number"
                          className={`p-1 rounded-md text-xs border transition-colors cursor-pointer ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                              : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${
                        isDark
                          ? 'bg-sky-400/10 border-sky-400/30 text-sky-300'
                          : 'bg-sky-50 border-sky-200 text-[#0284c7]'
                      }`}
                    >
                      <Mail className="w-5 h-5 text-sky-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Official Desk Email
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <a
                          href="mailto:contact@nareecarefoundation.com"
                          className={`text-xs sm:text-sm font-mono font-bold break-all transition-colors ${
                            isDark ? 'text-white hover:text-sky-300' : 'text-[#081c3b] hover:text-[#0284c7]'
                          }`}
                        >
                          contact@nareecarefoundation.com
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          title="Copy email address"
                          className={`p-1 rounded-md text-xs border transition-colors cursor-pointer ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                              : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${
                        isDark
                          ? 'bg-emerald-400/10 border-emerald-400/30 text-emerald-300'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      }`}
                    >
                      <MapPin className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Venture Studio Headquarters
                      </div>
                      <p className={`text-xs sm:text-sm font-semibold mt-0.5 ${isDark ? 'text-white' : 'text-[#081c3b]'}`}>
                        Pune, Maharashtra, India
                      </p>
                      <p className={`text-[11px] font-mono mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Incubation Center • Innovation Cluster
                      </p>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${
                        isDark
                          ? 'bg-indigo-400/10 border-indigo-400/30 text-indigo-300'
                          : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      }`}
                    >
                      <Clock className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Operating Hours
                      </div>
                      <p className={`text-xs sm:text-sm font-semibold mt-0.5 ${isDark ? 'text-white' : 'text-[#081c3b]'}`}>
                        Monday – Saturday: 9:30 AM – 6:30 PM IST
                      </p>
                      <p className={`text-[11px] font-mono mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Review Committee active every week
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* What Happens After Applying Card */}
              <div
                className={`p-5 sm:p-6 rounded-3xl border ${
                  isDark
                    ? 'bg-[#081427]/80 border-slate-800 text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-4 h-4 text-amber-400" />
                  <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Incubation Process Flow
                  </h3>
                </div>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">1</span>
                    <span>Submit your application form with basic project or institution details.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">2</span>
                    <span>Our Screening Committee reviews your submission within 48 business hours.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">3</span>
                    <span>Direct discovery call scheduled for onboarding and lab resource allocation.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Right Column: Embedded Application Form */}
            <div className="lg:col-span-7">
              <div
                className={`p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all duration-300 relative ${
                  isDark
                    ? 'bg-[#091528] text-white border-sky-500/40 shadow-sky-950/60'
                    : 'bg-white text-[#081c3b] border-slate-200 shadow-slate-200/80'
                }`}
              >
                {/* Form Header */}
                <div className="mb-6 pb-4 border-b border-slate-800/80">
                  <div
                    className={`inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2 border ${
                      isDark
                        ? 'bg-amber-400/15 text-amber-300 border-amber-400/30'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    DIRECT SUBMISSION PORTAL
                  </div>
                  <h2 className={`text-xl sm:text-2xl font-black tracking-tight font-sans text-balance ${isDark ? 'text-white' : 'text-[#081c3b]'}`}>
                    Apply for Incubation Center
                  </h2>
                  <p className={`text-xs sm:text-sm mt-0.5 ${isDark ? 'text-sky-300' : 'text-[#0284c7]'}`}>
                    Submit your application directly to the NF Venture Studio Review Committee.
                  </p>
                </div>

                {/* Reusable Form */}
                <NFApplicationForm
                  initialTrack="student"
                  isDark={isDark}
                  isModal={false}
                />
              </div>
            </div>

          </div>

        </div>
      </main>

      <NFFooter
        onOpenApplication={handleOpenApplication}
        isDark={isDark}
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />

      {/* Application Intake Modal */}
      <NFApplicationModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        initialTrack={selectedTrack}
        isDark={isDark}
      />
    </div>
  );
};
