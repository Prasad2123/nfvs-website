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
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  honorific?: string;
  designation: string;
  roleType: 'Founder' | 'CEO' | 'Lead';
  badgeColor: string;
  avatarText: string;
  avatarBg: string;
  shortMessage: string;
  isPlaceholder?: boolean;
}

interface LeadershipMessage {
  id: string;
  title: string;
  author: string;
  designation: string;
  roleBadge: string;
  badgeStyle: string;
  cardBorder: string;
  avatarText: string;
  message: string;
  isPlaceholder?: boolean;
}

export const NFTeamPage: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('nf-theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('student');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Activate scroll-reveal animations across cards
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

  // 1. Team Members Data (Structured for easy editing and future member additions)
  const teamMembers: TeamMember[] = [
    {
      id: 'founder',
      name: 'Mr. Nilesh Sir',
      designation: 'Founder',
      roleType: 'Founder',
      badgeColor: isDark
        ? 'bg-amber-400/15 text-amber-300 border-amber-400/40'
        : 'bg-amber-100 text-amber-800 border-amber-300',
      avatarText: 'NS',
      avatarBg: isDark
        ? 'from-amber-500/30 to-amber-700/20 border-amber-400/50 text-amber-300'
        : 'from-amber-100 to-amber-200 border-amber-300 text-amber-800',
      shortMessage:
        'Guiding the institutional vision of bridging academic labs with commercial venture acceleration.',
    },
    {
      id: 'ceo',
      name: 'Mr. Ashok Patil Sir',
      designation: 'CEO',
      roleType: 'CEO',
      badgeColor: isDark
        ? 'bg-sky-400/15 text-sky-300 border-sky-400/40'
        : 'bg-sky-100 text-[#0284c7] border-sky-300',
      avatarText: 'AP',
      avatarBg: isDark
        ? 'from-sky-500/30 to-blue-700/20 border-sky-400/50 text-sky-300'
        : 'from-sky-100 to-sky-200 border-sky-300 text-[#0369a1]',
      shortMessage:
        'Leading day-to-day incubation execution, partner campus deployment, and startup venture development.',
    },
    {
      id: 'member-xyz-1',
      name: 'XYZ',
      designation: '[Temporary Designation / Technology Lead]',
      roleType: 'Lead',
      badgeColor: isDark
        ? 'bg-slate-800 text-slate-300 border-slate-700'
        : 'bg-slate-100 text-slate-700 border-slate-300',
      avatarText: 'XYZ',
      avatarBg: isDark
        ? 'from-slate-800 to-slate-900 border-slate-700 text-slate-400'
        : 'from-slate-100 to-slate-200 border-slate-300 text-slate-600',
      shortMessage:
        '[Team member statement and domain specialty will be updated here.]',
      isPlaceholder: true,
    },
    {
      id: 'member-xyz-2',
      name: 'XYZ',
      designation: '[Temporary Designation / Operations Lead]',
      roleType: 'Lead',
      badgeColor: isDark
        ? 'bg-slate-800 text-slate-300 border-slate-700'
        : 'bg-slate-100 text-slate-700 border-slate-300',
      avatarText: 'XYZ',
      avatarBg: isDark
        ? 'from-slate-800 to-slate-900 border-slate-700 text-slate-400'
        : 'from-slate-100 to-slate-200 border-slate-300 text-slate-600',
      shortMessage:
        '[Team member statement and operational responsibility will be updated here.]',
      isPlaceholder: true,
    },
  ];

  // 2. Separated Leadership Messages
  const leadershipMessages: LeadershipMessage[] = [
    {
      id: 'message-founder',
      title: 'Message from Founder',
      author: 'Mr. Nilesh Sir',
      designation: 'Founder, NF Venture Studio',
      roleBadge: 'Founder Address',
      badgeStyle: isDark
        ? 'bg-amber-400/15 text-amber-300 border-amber-400/40'
        : 'bg-amber-100 text-amber-800 border-amber-300',
      cardBorder: isDark ? 'border-amber-400/40 hover:border-amber-400/60' : 'border-amber-200 hover:border-amber-400',
      avatarText: 'NS',
      message:
        '[Official Founder message and strategic vision statement will be updated here. NF Venture Studio is dedicated to translating high-potential academic innovations into viable, scalable, and venture-ready enterprises.]',
      isPlaceholder: true,
    },
    {
      id: 'message-ceo',
      title: 'Message from CEO',
      author: 'Mr. Ashok Patil Sir',
      designation: 'CEO, NF Venture Studio — A NAREE Foundation Initiative',
      roleBadge: 'CEO Address',
      badgeStyle: isDark
        ? 'bg-sky-400/15 text-sky-300 border-sky-400/40'
        : 'bg-sky-100 text-[#0284c7] border-sky-300',
      cardBorder: isDark ? 'border-sky-400/40 hover:border-sky-400/60' : 'border-sky-200 hover:border-sky-400',
      avatarText: 'AP',
      message:
        '[Official CEO address will be updated here. Our core commitment is providing turnkey lab infrastructure, technical mentorship, and streamlined industry connect to empower campus innovators and founders across our three incubation tracks.]',
      isPlaceholder: true,
    },
    {
      id: 'message-xyz',
      title: 'Message from Leadership Team',
      author: 'XYZ',
      designation: '[Designation / Head of Department]',
      roleBadge: 'Leadership Message',
      badgeStyle: isDark
        ? 'bg-slate-800 text-slate-300 border-slate-700'
        : 'bg-slate-100 text-slate-700 border-slate-300',
      cardBorder: isDark ? 'border-slate-800 hover:border-slate-700' : 'border-slate-200 hover:border-slate-400',
      avatarText: 'XYZ',
      message:
        '[Additional leadership perspectives, domain guidance, and mentorship statements will be updated here.]',
      isPlaceholder: true,
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-[#0284c7] selection:text-white relative overflow-x-hidden transition-colors duration-300 ${
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

      <main className="flex-1 w-full pt-20 sm:pt-24 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

          {/* ========================================================= */}
          {/* 1. Team Introduction (Short, motivational, professional)  */}
          {/* ========================================================= */}
          <section className="text-center pt-4 sm:pt-8">
            <div className="flex justify-center mb-3">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
                  isDark
                    ? 'bg-[#0b1d3a] border-sky-400/40 text-sky-300'
                    : 'bg-white border-slate-300 text-[#0369a1] shadow-xs'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Our Leadership & Team • NF Venture Studio</span>
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

            {/* Concise, professional, motivational statement */}
            <p
              className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-3.5 leading-relaxed font-normal ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              At NF Venture Studio, our strength lies in cross-disciplinary teamwork and shared vision.
              We unite educators, engineers, entrepreneurs, and researchers to transform campus ideas
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
          {/* 2. Our Team (Clean, professional profile cards)            */}
          {/* ========================================================= */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b pb-3 border-slate-800">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                  Key People
                </div>
                <h2
                  className={`text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight ${
                    isDark ? 'text-white' : 'text-[#081c3b]'
                  }`}
                >
                  Our Team Members
                </h2>
              </div>
              <span
                className={`text-xs font-mono ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Leadership & Operations
              </span>
            </div>

            {/* Vertical List of Full-Width Team Member Profile Rows */}
            <div className="flex flex-col space-y-4 sm:space-y-5">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`w-full p-5 sm:p-7 lg:py-8 lg:px-8 min-h-[140px] sm:min-h-[155px] lg:min-h-[165px] rounded-2xl sm:rounded-3xl border transition-all duration-300 hover:scale-[1.006] shadow-lg relative group flex flex-col justify-center ${
                    isDark
                      ? 'bg-[#0a1832]/90 border-sky-500/30 hover:border-amber-400/60 shadow-sky-950/40'
                      : 'bg-white border-slate-200 hover:border-sky-300 shadow-slate-200/60'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
                    {/* Left: Square Profile Avatar + Name/Designation/Message */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-7 flex-1 min-w-0">
                      
                      {/* Square Profile Image Container with Rounded Corners (Generous sizing, no cropping) */}
                      <div
                        className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${member.avatarBg} border flex items-center justify-center font-mono font-black text-2xl sm:text-3xl tracking-wider shadow-inner flex-shrink-0 transition-transform group-hover:scale-105`}
                        title={member.name}
                      >
                        {member.avatarText}
                      </div>

                      {/* Immediately beside image: Name on line 1, Designation on line 2, Message on line 3 */}
                      <div className="flex flex-col min-w-0 flex-1 justify-center">
                        {/* Line 1: Member Name */}
                        <h3
                          className={`text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tight leading-tight ${
                            isDark ? 'text-white' : 'text-[#081c3b]'
                          }`}
                        >
                          {member.name}
                        </h3>

                        {/* Line 2: Designation directly below name (displayed only once) */}
                        <div
                          className={`text-xs sm:text-sm font-bold mt-1 tracking-wide ${
                            isDark ? 'text-sky-300' : 'text-[#0284c7]'
                          }`}
                        >
                          {member.designation}
                        </div>

                        {/* Line 3: Short 1–2 line message */}
                        <p
                          className={`text-xs sm:text-sm leading-relaxed mt-2.5 font-normal italic max-w-2xl ${
                            isDark ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          "{member.shortMessage}"
                        </p>
                      </div>
                    </div>

                    {/* Right side: Clean Organization Affiliation Tag (Verified Member removed) */}
                    <div className="flex items-center md:items-end justify-start md:justify-center flex-shrink-0 text-xs font-mono pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
                      <span className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        NFVS Pune • NAREE Foundation
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================= */}
          {/* 3. Leadership Messages (Clearly separated message cards)  */}
          {/* ========================================================= */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b pb-3 border-slate-800">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">
                  Direct Perspectives
                </div>
                <h2
                  className={`text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight ${
                    isDark ? 'text-white' : 'text-[#081c3b]'
                  }`}
                >
                  Leadership Messages
                </h2>
              </div>
              <span
                className={`text-xs font-mono ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Vision & Guidance
              </span>
            </div>

            {/* Leadership Message Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {leadershipMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 shadow-xl relative ${
                    msg.cardBorder
                  } ${
                    isDark ? 'bg-[#09152b]/95' : 'bg-white'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Role Badge & Quote Icon */}
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

                    {/* Section Header & Author Details */}
                    <div>
                      <h3
                        className={`text-lg font-black uppercase tracking-tight ${
                          isDark ? 'text-white' : 'text-[#081c3b]'
                        }`}
                      >
                        {msg.title}
                      </h3>
                      <div
                        className={`text-xs font-bold mt-0.5 ${
                          isDark ? 'text-amber-400' : 'text-amber-700'
                        }`}
                      >
                        {msg.author}
                      </div>
                      <div
                        className={`text-[11px] font-mono ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {msg.designation}
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="h-px bg-gradient-to-r from-sky-400/30 via-amber-400/20 to-transparent" />

                    {/* Message Body */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-slate-200' : 'text-slate-700'
                      }`}
                    >
                      {msg.message}
                    </p>
                  </div>

                  {/* Bottom Note */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-amber-400/80 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Official Statement
                    </span>
                    <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                      Easily Replaceable
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================= */}
          {/* Action CTA & Cross-Links                                  */}
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
                to="/about"
                className={`h-9 sm:h-10 px-4 sm:px-5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-[#0284c7]'
                }`}
              >
                <span>Read About Us</span>
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
