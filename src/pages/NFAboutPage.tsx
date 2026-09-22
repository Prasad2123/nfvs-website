import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NFNavbar } from '../components/nf/NFNavbar';
import { NFFooter } from '../components/nf/NFFooter';
import { NFApplicationModal } from '../components/nf/NFApplicationModal';
import { NFLogo } from '../components/nf/NFLogo';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Lightbulb,
  FlaskConical,
  Sparkles,
  Target,
  Cpu,
  Wifi,
  Bot,
  CircuitBoard,
  Layers,
  Rocket,
  Building2,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const NFAboutPage: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('nf-theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('student');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll reveal hook for animated elements and footer visibility
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

  // 4 Core Pillars from project foundation
  const pillars = [
    {
      title: 'Innovate',
      desc: 'Identifying high-potential technical problems and translating academic research into structured intellectual property.',
      icon: Lightbulb,
      color: 'text-amber-400',
      bgDark: 'bg-amber-500/10 border-amber-500/30',
      bgLight: 'bg-amber-50 border-amber-200',
    },
    {
      title: 'Incubate',
      desc: 'Turnkey access to specialized lab infrastructure, prototyping hardware, technical mentorship, and business support.',
      icon: FlaskConical,
      color: 'text-sky-400',
      bgDark: 'bg-sky-500/10 border-sky-500/30',
      bgLight: 'bg-sky-50 border-sky-200',
    },
    {
      title: 'Inspire',
      desc: 'Hands-on immersion, student-faculty development, hackathons, and cross-disciplinary knowledge sharing.',
      icon: Sparkles,
      color: 'text-indigo-400',
      bgDark: 'bg-indigo-500/10 border-indigo-500/30',
      bgLight: 'bg-indigo-50 border-indigo-200',
    },
    {
      title: 'Impact',
      desc: 'Commercializing research outcomes, achieving institutional accreditation milestones, and scaling venture revenue.',
      icon: Target,
      color: 'text-emerald-400',
      bgDark: 'bg-emerald-500/10 border-emerald-500/30',
      bgLight: 'bg-emerald-50 border-emerald-200',
    },
  ];

  // 4 Core Tech Domains from project README
  const domains = [
    { name: 'AI & Machine Learning', icon: Cpu },
    { name: 'IoT & Connected Systems', icon: Wifi },
    { name: 'Robotics & Mechatronics', icon: Bot },
    { name: 'Embedded Hardware Systems', icon: CircuitBoard },
  ];

  // 3 Incubation Tracks
  const tracks = [
    {
      track: 'Track A',
      name: 'Student Innovators & Ideation',
      audience: 'UG/PG students, campus innovators & E-Cell teams',
      outcome: 'Validated POC, patent readiness, initial prototypes',
      icon: Layers,
    },
    {
      track: 'Track B',
      name: 'Hardware & Deep-Tech Startups',
      audience: 'Early-stage founders, research spin-offs & engineers',
      outcome: 'Turnkey fabrication, MVP build, investor readiness',
      icon: Rocket,
    },
    {
      track: 'Track C',
      name: 'MSME & Institutional Projects',
      audience: 'Engineering institutions, faculty researchers & MSMEs',
      outcome: 'NBA/NAAC accreditation evidence, sponsored R&D, productization',
      icon: Building2,
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-[#0284c7] selection:text-white relative overflow-x-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#060f1e] text-slate-100' : 'bg-slate-50 text-[#081c3b]'
      }`}
    >
      {/* Background Ambient Glow matching logo colors */}
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

      <main className="flex-1 w-full pt-20 sm:pt-24 pb-4 sm:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

          {/* Section 1: Hero Banner */}
          <section className="text-center pt-6 sm:pt-10">
            <div className="flex justify-center mb-4">
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
                  isDark
                    ? 'bg-[#0b1d3a] border-sky-400/40 text-sky-300'
                    : 'bg-white border-slate-300 text-[#0369a1] shadow-xs'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>About NF Venture Studio • NAREE Foundation</span>
              </div>
            </div>

            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight max-w-4xl mx-auto leading-tight ${
                isDark
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-amber-200'
                  : 'text-[#081c3b]'
              }`}
            >
              Transforming Campus Research Into Venture-Ready Enterprises
            </h1>

            <p
              className={`text-base sm:text-lg max-w-3xl mx-auto mt-4 leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              NF Venture Studio (NCF) is an incubation ecosystem in Pune, Maharashtra, connecting
              students, research faculty, early-stage startups, and institutions to accelerate
              deep-tech innovations from laboratory prototype to commercial enterprise.
            </p>

            {/* Core Philosophy Strip */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono font-bold">
              <span className={`px-3 py-1.5 rounded-xl border ${isDark ? 'bg-sky-500/10 border-sky-400/30 text-sky-300' : 'bg-sky-50 border-sky-200 text-[#0284c7]'}`}>
                From Lab to Market
              </span>
              <span className={`px-3 py-1.5 rounded-xl border ${isDark ? 'bg-amber-500/10 border-amber-400/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
                From Idea to Impact
              </span>
              <span className={`px-3 py-1.5 rounded-xl border ${isDark ? 'bg-indigo-500/10 border-indigo-400/30 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'}`}>
                From Campus to Capital
              </span>
              <span className={`px-3 py-1.5 rounded-xl border ${isDark ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                From Research to Revenue
              </span>
            </div>
          </section>

          {/* Section 2: Mission & Core Domains */}
          <section
            className={`p-6 sm:p-8 rounded-3xl border ${
              isDark ? 'bg-[#0a1832]/80 border-sky-500/30 shadow-2xl' : 'bg-white border-slate-200 shadow-lg'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Institutional Vision</span>
                </div>
                <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#081c3b]'}`}>
                  Bridging Academia and Deep-Tech Industry
                </h2>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  As an initiative of the <strong>NAREE Foundation</strong>, NF Venture Studio establishes turnkey
                  incubation centers and specialized prototyping laboratories directly on partner academic
                  campuses. We provide institutional capability, governance frameworks, and technical execution
                  that align directly with statutory accreditation criteria including NBA, NAAC, IIC, and NIRF-Innovation.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono font-bold">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Turnkey Laboratory Infrastructure</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sky-400">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Accreditation-Ready Documentation</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Cross-Track Mentorship & Incubation</span>
                  </div>
                </div>
              </div>

              {/* 4 Technical Domains */}
              <div className="lg:col-span-5 space-y-3">
                <div className={`text-xs font-mono font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-sky-300' : 'text-slate-600'}`}>
                  Specialized Technical Domains
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                  {domains.map((dom) => {
                    const Icon = dom.icon;
                    return (
                      <div
                        key={dom.name}
                        className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                          isDark
                            ? 'bg-[#0d2247]/80 border-sky-500/20 text-slate-200'
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                          isDark ? 'bg-[#071328] border-sky-400/30 text-amber-400' : 'bg-white border-slate-200 text-[#0284c7]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold">{dom.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: The 4 Strategic Pillars */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">
                Foundational Architecture
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#081c3b]'}`}>
                The 4 Core Pillars of NFVS
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
                      isDark ? 'bg-[#0a1832] border-sky-500/30' : 'bg-white border-slate-200 shadow-md'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                        isDark ? p.bgDark : p.bgLight
                      }`}>
                        <Icon className={`w-6 h-6 ${p.color}`} />
                      </div>
                      <h3 className={`text-lg font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#081c3b]'}`}>
                        {p.title}
                      </h3>
                      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 4: 3 Specialized Incubation Tracks */}
          <section
            className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
              isDark ? 'bg-[#08152b]/90 border-sky-500/30' : 'bg-white border-slate-200 shadow-md'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-800">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-amber-400">
                  Targeted Incubation Delivery
                </div>
                <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#081c3b]'}`}>
                  3 Specialized Incubation Tracks
                </h2>
              </div>
              <button
                type="button"
                onClick={() => handleOpenApplication()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide text-white bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#081c3b] hover:from-[#0ea5e9] hover:to-[#0284c7] border border-sky-400/50 shadow-md cursor-pointer self-start sm:self-auto"
              >
                <span>Apply for Tracks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tracks.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.track}
                    className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between ${
                      isDark ? 'bg-[#0d2247]/70 border-sky-500/20' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30">
                          {t.track}
                        </span>
                        <Icon className="w-5 h-5 text-sky-400" />
                      </div>
                      <h3 className={`text-base font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#081c3b]'}`}>
                        {t.name}
                      </h3>
                      <div className="text-xs space-y-1">
                        <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                          <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>Target:</strong> {t.audience}
                        </p>
                        <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                          <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>Outcome:</strong> {t.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 5: Leadership & Studio Headquarters */}
          <section
            className={`p-6 sm:p-8 rounded-3xl border grid grid-cols-1 md:grid-cols-3 gap-6 items-start ${
              isDark ? 'bg-[#0b1a33]/90 border-sky-500/40 shadow-xl' : 'bg-white border-slate-200 shadow-md'
            }`}
          >
            {/* Column 1: Leadership */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                OFFICE OF THE CEO
              </div>
              <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Mr. Ashok Patil
              </div>
              <p className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                CEO, NF Venture Studio — A NAREE Foundation Initiative, Pune.
              </p>
              <div className="pt-0.5">
                <a
                  href="mailto:ceo@ncfvs.in"
                  className={`inline-flex items-center gap-1.5 text-xs font-mono hover:underline ${
                    isDark ? 'text-sky-300 hover:text-white' : 'text-[#0284c7] hover:text-[#0369a1]'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>ceo@ncfvs.in</span>
                </a>
              </div>
            </div>

            {/* Column 2: Studio Headquarters */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>STUDIO HEADQUARTERS</span>
              </div>
              <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                Parijatak, Near Nigdi Police Station, Nigdi, Pune – 411044, Maharashtra
              </p>
            </div>

            {/* Column 3: Contact & Communication */}
            <div className="space-y-2 text-xs font-mono">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                COMMUNICATION
              </div>
              <div className="flex flex-col gap-1.5">
                <a
                  href="tel:8379879846"
                  className={`flex items-center gap-2 hover:underline ${isDark ? 'text-amber-300' : 'text-amber-700'} font-bold`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 83798 79846 | +91 9209112577</span>
                </a>
                <a
                  href="mailto:contact@ncfvs.in"
                  className={`flex items-center gap-2 hover:underline ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>contact@ncfvs.in</span>
                </a>
                <a
                  href="mailto:ncfventurestudio@gmail.com"
                  className={`flex items-center gap-2 hover:underline ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>ncfventurestudio@gmail.com</span>
                </a>
              </div>
            </div>
          </section>

          {/* Section 6: Action CTA */}
          <section
            className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 ${
              isDark
                ? 'bg-gradient-to-br from-[#0c1f3d] via-[#07152b] to-[#060f1e] border-sky-400/40'
                : 'bg-gradient-to-br from-sky-50 via-white to-amber-50 border-sky-200 shadow-lg'
            }`}
          >
            <h2 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#081c3b]'}`}>
              Partner With NF Venture Studio Today
            </h2>
            <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Accelerate your campus innovation potential or build deep-tech ventures with turnkey institutional support.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleOpenApplication()}
                className="h-10 px-5 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#081c3b] hover:from-[#0ea5e9] hover:to-[#0284c7] shadow-lg shadow-sky-500/25 border border-sky-400/50 transition-all hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Apply for Incubation Center</span>
              </button>
              <Link
                to="/"
                className={`h-10 px-5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-[#0284c7]'
                }`}
              >
                <span>Explore Home Sections</span>
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
