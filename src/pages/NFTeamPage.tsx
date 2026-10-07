import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NFNavbar } from '../components/nf/NFNavbar';
import { NFFooter } from '../components/nf/NFFooter';
import { NFApplicationModal } from '../components/nf/NFApplicationModal';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Users,
  Sparkles,
  Quote,
  ArrowRight,
  ShieldCheck,
  Target,
  Compass,
  Camera,
} from 'lucide-react';
import ashokPatilImg from '../../assets/ashok patil.jpg';
import rahulMoreImg from '../../assets/rahul more.png';
import pallaviShirkeImg from '../../assets/pallavi shrike.png';
import mohammadAshparazImg from '../../assets/Mohammed Ashparaz.png';
import sayaliKaleImg from '../../assets/sayali kale.jpeg';

interface PillarMember {
  id: string;
  name: string;
  designation: string;
  shortRole: string;
  imageSrc: string;
  initials: string;
  focus: string;
  responsibilities: string[];
  gridPlacement: string;
  animDelay: string;
}

interface ExecutiveMessage {
  id: string;
  title: string;
  roleBadge: string;
  badgeStyle: string;
  cardBorder: string;
  message: string;
}

const TeamMemberPhoto: React.FC<{
  src: string;
  name: string;
  initials: string;
  isDark: boolean;
}> = ({ src, name, initials, isDark }) => {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [src]);

  if (src && !imgFailed) {
    return (
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-slate-700/50 shadow-inner group-hover:border-amber-400/60 transition-colors">
        <img
          src={src}
          alt={name}
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full aspect-square rounded-2xl border flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:border-amber-400/60 ${
        isDark
          ? 'bg-gradient-to-b from-[#0f2347] via-[#09172f] to-[#061021] border-sky-500/30 text-slate-300 shadow-inner'
          : 'bg-gradient-to-b from-slate-100 via-sky-50 to-slate-200 border-slate-300 text-slate-600 shadow-inner'
      }`}
    >
      {/* Subtle radial pattern for high-tech aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none rounded-2xl" />

      {/* Silhouette & Initials Emblem */}
      <div
        className={`relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border flex flex-col items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 ${
          isDark
            ? 'bg-gradient-to-br from-sky-900/60 to-slate-900 border-sky-400/40 text-sky-300 shadow-sky-950/50'
            : 'bg-gradient-to-br from-white to-sky-100 border-sky-300 text-[#0284c7] shadow-slate-300/60'
        }`}
      >
        <span className="font-mono font-black text-2xl sm:text-3xl tracking-wider">
          {initials}
        </span>
      </div>

      {/* Photo Placeholder Pill Badge */}
      <div className="relative z-10 mt-3 sm:mt-4 text-center">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase border shadow-xs ${
            isDark
              ? 'bg-amber-400/15 text-amber-300 border-amber-400/35'
              : 'bg-amber-100 text-amber-800 border-amber-300'
          }`}
        >
          <Camera className="w-3 h-3 text-amber-400" />
          PHOTO PLACEHOLDER
        </span>
      </div>

      <div
        className={`relative z-10 text-[10px] font-mono mt-1.5 opacity-70 text-center ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}
      >
        Official Photograph Coming Soon
      </div>
    </div>
  );
};

export const NFTeamPage: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('nf-theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('student');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Activate scroll-reveal animations across general elements
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

  const isDark = theme === 'dark';

  // 1. CORE WORKING PILLARS DATA (5 Executive Members)
  const corePillars: PillarMember[] = [
    {
      id: 'ashok-patil',
      name: 'Mr. Ashok Patil',
      designation: 'Chief Executive Officer (CEO)',
      shortRole: 'CEO',
      imageSrc: ashokPatilImg,
      initials: 'AP',
      focus:
        'Executive venture leadership, strategic institutional partnerships, turnkey incubation deployment, and startup venture syndication.',
      responsibilities: ['Venture Creation Strategy', 'Institutional Governance', 'Investor Syndication'],
      gridPlacement: 'lg:col-span-2',
      animDelay: '0.05s',
    },
    {
      id: 'rahul-more',
      name: 'Capt. Rahul More',
      designation: 'Chief Operating Officer (COO)',
      shortRole: 'COO',
      imageSrc: rahulMoreImg,
      initials: 'RM',
      focus:
        'Operational infrastructure rollout, campus incubation operations, turnkey execution, and defense / deep-tech program orchestration.',
      responsibilities: ['Turnkey Lab Rollout', 'Operations Governance', 'Defense & Deep-Tech Cohorts'],
      gridPlacement: 'lg:col-span-2',
      animDelay: '0.12s',
    },
    {
      id: 'pallavi-shirke',
      name: 'Mrs. Pallavi Shirke',
      designation: 'Chief Financial Officer (CFO)',
      shortRole: 'CFO',
      imageSrc: pallaviShirkeImg,
      initials: 'PS',
      focus:
        'Financial governance, fiscal strategy, venture grant allocation, statutory compliance, and capital structuring for student & faculty startups.',
      responsibilities: ['Fiscal Strategy & Audits', 'Venture Grant Allocation', 'Capital Structuring'],
      gridPlacement: 'lg:col-span-2',
      animDelay: '0.19s',
    },
    {
      id: 'mohammad-ashparaz',
      name: 'Mr. Mohammad Ashparaz',
      designation: 'Chief Marketing Officer (CMO)',
      shortRole: 'CMO',
      imageSrc: mohammadAshparazImg,
      initials: 'MA',
      focus:
        'Ecosystem positioning, institutional partner outreach, student innovator recruitment, commercialization funnels, and corporate alliances.',
      responsibilities: ['Ecosystem Marketing', 'Institutional Alliances', 'Founder Acquisition'],
      gridPlacement: 'lg:col-span-2 lg:col-start-2',
      animDelay: '0.26s',
    },
    {
      id: 'sayali-kale',
      name: 'Ms. Sayali Kale',
      designation: 'HR A. Executive',
      shortRole: 'HR',
      imageSrc: sayaliKaleImg,
      initials: 'SK',
      focus:
        'Venture talent sourcing, human resource administration, founder-team formation, internship fellowship programs, and organizational culture.',
      responsibilities: ['Talent Sourcing & Culture', 'Team Formation Support', 'Fellowship Cohorts'],
      gridPlacement: 'lg:col-span-2 md:col-span-2 md:max-w-md md:mx-auto w-full lg:max-w-none',
      animDelay: '0.33s',
    },
  ];

  // 2. EXECUTIVE MESSAGES DATA (Role/Title only — NO names, photos, or avatars)
  // Shortened to ~20 authoritative words per prompt specification
  const executiveMessages: ExecutiveMessage[] = [
    {
      id: 'msg-president',
      title: 'Message from the President',
      roleBadge: 'Office of the President',
      badgeStyle: isDark
        ? 'bg-amber-400/15 text-amber-300 border-amber-400/40'
        : 'bg-amber-100 text-amber-800 border-amber-300',
      cardBorder: isDark
        ? 'border-amber-400/40 hover:border-amber-400/70 shadow-amber-950/20'
        : 'border-amber-200 hover:border-amber-400 shadow-amber-100',
      message:
        'Strong institutions create the environment where ideas become impact, innovation becomes opportunity, and ambition translates into lasting institutional value.',
    },
    {
      id: 'msg-ceo',
      title: 'Message from the CEO',
      roleBadge: 'Office of the Chief Executive Officer',
      badgeStyle: isDark
        ? 'bg-sky-400/15 text-sky-300 border-sky-400/40'
        : 'bg-sky-100 text-[#0284c7] border-sky-300',
      cardBorder: isDark
        ? 'border-sky-400/40 hover:border-sky-400/70 shadow-sky-950/30'
        : 'border-sky-200 hover:border-sky-400 shadow-sky-100',
      message:
        'We build disciplined pathways that transform promising ideas into scalable ventures through strategic guidance, execution excellence, and strong ecosystem partnerships.',
    },
    {
      id: 'msg-coo',
      title: 'Message from the COO',
      roleBadge: 'Office of the Chief Operating Officer',
      badgeStyle: isDark
        ? 'bg-emerald-400/15 text-emerald-300 border-emerald-400/40'
        : 'bg-emerald-100 text-emerald-800 border-emerald-300',
      cardBorder: isDark
        ? 'border-emerald-400/40 hover:border-emerald-400/70 shadow-emerald-950/20'
        : 'border-emerald-200 hover:border-emerald-400 shadow-emerald-100',
      message:
        'Operational excellence turns innovation into measurable outcomes through structured execution, accountable processes, and partnerships built for sustainable growth.',
    },
  ];

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-20">

          {/* ========================================================= */}
          {/* 1. Page Header (Strategic, Institutional, Inspiring)       */}
          {/* ========================================================= */}
          <section className="text-center pt-4 sm:pt-8 animate-fade-in" style={{ opacity: 1, visibility: 'visible' }}>
            <div className="flex justify-center mb-3">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
                  isDark
                    ? 'bg-[#0b1d3a] border-sky-400/40 text-sky-300'
                    : 'bg-white border-slate-300 text-[#0369a1] shadow-xs'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Executive Leadership & Operations • NF Venture Studio</span>
              </div>
            </div>

            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight max-w-4xl mx-auto leading-tight ${
                isDark
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-amber-200'
                  : 'text-[#081c3b]'
              }`}
            >
              Unified by Purpose, Driven by Deep-Tech Innovation
            </h1>

            <p
              className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-3.5 leading-relaxed font-normal ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              At NF Venture Studio, our strength lies in cross-disciplinary execution and institutional rigor.
              We unite educators, engineers, operators, and researchers to transform campus ideas
              into commercial breakthroughs and sustainable deep-tech enterprises.
            </p>

            {/* Core Values / Team Culture Pillars */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono font-bold">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border ${
                  isDark
                    ? 'bg-amber-500/10 border-amber-400/30 text-amber-300'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                <Target className="w-3.5 h-3.5 text-amber-400" />
                Shared Mission
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border ${
                  isDark
                    ? 'bg-sky-500/10 border-sky-400/30 text-sky-300'
                    : 'bg-sky-50 border-sky-200 text-[#0284c7]'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                Collaborative Rigor
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border ${
                  isDark
                    ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Institutional Integrity
              </span>
            </div>
          </section>

          {/* ========================================================= */}
          {/* 2. CORE WORKING PILLARS SECTION                           */}
          {/*    Guaranteed immediate visibility on page load           */}
          {/* ========================================================= */}
          <section
            className="space-y-8"
            style={{ opacity: 1, visibility: 'visible', transform: 'none' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b pb-4 border-slate-800">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                  Institutional Leadership & Operations
                </div>
                <h2
                  className={`text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight ${
                    isDark ? 'text-white' : 'text-[#081c3b]'
                  }`}
                >
                  CORE WORKING PILLARS
                </h2>
              </div>
              <span
                className={`text-xs font-mono ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                5 Key Executive Pillars
              </span>
            </div>

            {/* Grid Layout: Desktop (3 top, 2 centered bottom), Tablet (2 cols), Mobile (1 col) */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 items-stretch"
              style={{ opacity: 1, visibility: 'visible' }}
            >
              {corePillars.map((member) => (
                <div
                  key={member.id}
                  style={{
                    opacity: 1,
                    visibility: 'visible',
                    transform: 'none',
                    animationDelay: member.animDelay,
                  }}
                  className={`${member.gridPlacement} animate-fade-in rounded-3xl border p-5 sm:p-6 transition-all duration-300 hover:scale-[1.015] shadow-xl relative group flex flex-col justify-between ${
                    isDark
                      ? 'bg-[#0a1832]/95 border-sky-500/30 hover:border-amber-400/60 shadow-sky-950/40'
                      : 'bg-white border-slate-200 hover:border-sky-300 shadow-slate-200/60'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top: Photo Container with Placeholder / Image Fallback */}
                    <TeamMemberPhoto
                      src={member.imageSrc}
                      name={member.name}
                      initials={member.initials}
                      isDark={isDark}
                    />

                    {/* Member Details */}
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                            isDark
                              ? 'bg-sky-400/10 text-sky-300 border-sky-400/30'
                              : 'bg-sky-50 text-[#0284c7] border-sky-200'
                          }`}
                        >
                          {member.shortRole}
                        </span>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          NFVS Executive
                        </span>
                      </div>

                      {/* Full Name */}
                      <h3
                        className={`text-lg sm:text-xl font-black uppercase tracking-tight mt-2 leading-tight ${
                          isDark ? 'text-white' : 'text-[#081c3b]'
                        }`}
                      >
                        {member.name}
                      </h3>

                      {/* Official Designation */}
                      <div
                        className={`text-xs sm:text-sm font-bold mt-1 tracking-wide ${
                          isDark ? 'text-amber-300' : 'text-amber-700'
                        }`}
                      >
                        {member.designation}
                      </div>

                      {/* Separator */}
                      <div className="h-px bg-slate-800/80 my-3" />

                      {/* Core Scope / Focus */}
                      <p
                        className={`text-xs leading-relaxed font-normal ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {member.focus}
                      </p>
                    </div>
                  </div>

                  {/* Responsibilities Tags Footer */}
                  <div className="pt-4 mt-4 border-t border-slate-800/60 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase font-bold text-sky-400">
                      Core Functional Scope:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {member.responsibilities.map((resp, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                            isDark
                              ? 'bg-slate-900/90 text-slate-300 border-slate-700'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {resp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================= */}
          {/* 3. EXECUTIVE MESSAGES SECTION                             */}
          {/*    Role/Title only (NO names, NO photos)                  */}
          {/* ========================================================= */}
          <section
            className="space-y-8"
            style={{ opacity: 1, visibility: 'visible', transform: 'none' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b pb-4 border-slate-800">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">
                  Institutional Leadership Addresses
                </div>
                <h2
                  className={`text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight ${
                    isDark ? 'text-white' : 'text-[#081c3b]'
                  }`}
                >
                  Executive Messages
                </h2>
              </div>
              <span
                className={`text-xs font-mono ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Governance & Vision
              </span>
            </div>

            {/* 3 Strategic Executive Messages in 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {executiveMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{ opacity: 1, visibility: 'visible', transform: 'none' }}
                  className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 shadow-xl relative animate-fade-in ${
                    msg.cardBorder
                  } ${
                    isDark ? 'bg-[#09152b]/95' : 'bg-white'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Office Badge & Quote Icon */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${msg.badgeStyle}`}
                      >
                        {msg.roleBadge}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-amber-400'
                            : 'bg-slate-100 border-slate-200 text-amber-600'
                        }`}
                      >
                        <Quote className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Title: Exactly Role / Title only (NO names, NO photos) */}
                    <div>
                      <h3
                        className={`text-lg sm:text-xl font-black uppercase tracking-tight ${
                          isDark ? 'text-white' : 'text-[#081c3b]'
                        }`}
                      >
                        {msg.title}
                      </h3>
                      <div
                        className={`text-[11px] font-mono font-semibold mt-1 ${
                          isDark ? 'text-sky-300' : 'text-[#0284c7]'
                        }`}
                      >
                        NF Venture Studio • Institutional Governance
                      </div>
                    </div>

                    {/* Gradient Divider */}
                    <div className="h-px bg-gradient-to-r from-sky-400/30 via-amber-400/20 to-transparent" />

                    {/* Executive Strategic Message Text (Concise ~20 words) */}
                    <p
                      className={`text-sm sm:text-base leading-relaxed italic ${
                        isDark ? 'text-slate-200' : 'text-slate-700'
                      }`}
                    >
                      "{msg.message}"
                    </p>
                  </div>

                  {/* Bottom Verification Note */}
                  <div className="pt-4 mt-5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-amber-400/90 flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3 h-3" />
                      Official Institutional Policy
                    </span>
                    <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                      Naree Care Foundation
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================= */}
          {/* 4. Action CTA Banner                                      */}
          {/* ========================================================= */}
          <section
            className={`p-6 sm:p-8 rounded-3xl border text-center space-y-3.5 ${
              isDark
                ? 'bg-gradient-to-br from-[#0c1f3d] via-[#07152b] to-[#060f1e] border-sky-400/40 shadow-xl'
                : 'bg-gradient-to-br from-sky-50 via-white to-amber-50 border-sky-200 shadow-md'
            }`}
          >
            <h2
              className={`text-lg sm:text-xl font-black uppercase tracking-tight ${
                isDark ? 'text-white' : 'text-[#081c3b]'
              }`}
            >
              Collaborate With Our Leadership & Venture Team
            </h2>
            <p
              className={`text-xs sm:text-sm max-w-xl mx-auto ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Whether you are an academic institution seeking turnkey incubation setup or a student innovator ready to build, our team is here to support your journey.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1.5">
              <button
                type="button"
                onClick={() => handleOpenApplication()}
                className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#081c3b] hover:from-[#0ea5e9] hover:to-[#0284c7] shadow-lg shadow-sky-500/25 border border-sky-400/50 transition-all hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Apply for Incubation Center</span>
              </button>
              <Link
                to="/contact"
                className={`h-9 sm:h-10 px-4 sm:px-5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-[#0284c7]'
                }`}
              >
                <span>Contact Executive Office</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

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
