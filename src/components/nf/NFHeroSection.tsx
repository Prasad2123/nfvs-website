import React, { useState, useEffect } from 'react';
import { NFLogo } from './NFLogo';
import { Sparkles, ArrowRight, ShieldCheck, Rocket, ChevronRight, Layers, BarChart3, Binary, Zap, Terminal } from 'lucide-react';

interface NFHeroSectionProps {
  onOpenApplication: (track?: string) => void;
  isDark?: boolean;
}

const TYPING_WORDS = [
  'From Lab to Market.',
  'From Idea to Impact.',
  'From Campus to Capital.',
  'From Research to Revenue.',
];

// Small floating particles for the hero background
const PARTICLES = [
  { size: 4, x: '10%', y: '20%', delay: '0s', duration: '6s', color: 'rgba(56,189,248,0.6)' },
  { size: 6, x: '80%', y: '15%', delay: '1s', duration: '8s', color: 'rgba(245,158,11,0.5)' },
  { size: 3, x: '25%', y: '75%', delay: '2s', duration: '5s', color: 'rgba(56,189,248,0.4)' },
  { size: 5, x: '65%', y: '60%', delay: '0.5s', duration: '7s', color: 'rgba(245,158,11,0.4)' },
  { size: 3, x: '45%', y: '30%', delay: '1.5s', duration: '9s', color: 'rgba(99,102,241,0.4)' },
  { size: 4, x: '90%', y: '50%', delay: '3s', duration: '6s', color: 'rgba(52,211,153,0.4)' },
  { size: 2, x: '5%', y: '55%', delay: '2.5s', duration: '10s', color: 'rgba(56,189,248,0.5)' },
  { size: 5, x: '70%', y: '85%', delay: '1.2s', duration: '7.5s', color: 'rgba(245,158,11,0.3)' },
];

export const NFHeroSection: React.FC<NFHeroSectionProps> = ({
  onOpenApplication,
  isDark = true,
}) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Typing animation
  useEffect(() => {
    const currentWord = TYPING_WORDS[typingIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, charIndex === 0 ? 600 : 60);
    } else if (!isDeleting && charIndex > currentWord.length) {
      // Pause then start deleting
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTypingIndex((i) => (i + 1) % TYPING_WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, typingIndex]);

  return (
    <section
      className={`relative overflow-hidden pt-6 sm:pt-8 pb-12 sm:pb-16 border-b transition-colors duration-300 ${
        isDark ? 'bg-[#060f1e] border-sky-500/20' : 'bg-slate-50 border-slate-200'
      }`}
    >
      {/* Background High-Tech Circuit & Grid Overlay */}
      <div className={`absolute inset-0 bg-tech-grid pointer-events-none ${isDark ? 'opacity-75' : 'opacity-40'}`} />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* Floating Particles */}
      {isDark && PARTICLES.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Ambient Pulsing Glow Orbs */}
      <div className={`absolute -top-20 left-1/3 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none animate-pulse-glow ${
        isDark ? 'bg-sky-600/15' : 'bg-sky-400/15'
      }`} />
      <div className={`absolute top-1/2 right-4 sm:right-10 w-60 sm:w-80 h-60 sm:h-80 rounded-full blur-3xl pointer-events-none animate-float ${
        isDark ? 'bg-amber-500/10' : 'bg-amber-400/15'
      }`} />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">

        {/* Top Tagline Pill Banner */}
        <div className="flex justify-center mb-5 sm:mb-6 reveal">
          <div
            className={`inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-xl border backdrop-blur-md max-w-full transition-all duration-300 transform hover:scale-[1.02] animate-badge-pulse ${
              isDark
                ? 'bg-[#0b1d3a]/90 text-white border-sky-400/40 hover:border-amber-400/70'
                : 'bg-white text-[#081c3b] border-slate-200 shadow-md hover:border-amber-400/70'
            }`}
          >
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-amber-400" />
            </span>
            <span
              className={`text-[10px] sm:text-xs md:text-sm font-black tracking-wider sm:tracking-widest uppercase font-mono text-center leading-tight ${
                isDark
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-amber-300'
                  : 'text-[#081c3b]'
              }`}
            >
              NF VENTURE STUDIO · A NAREE FOUNDATION INITIATIVE · PUNE, MAHARASHTRA
            </span>
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-sky-400" />
            </span>
          </div>
        </div>

        {/* Main Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">

          {/* Left Column: Tech & Business Venture Engine (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="space-y-3.5 sm:space-y-4">
              <div
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg border text-[10px] sm:text-xs font-mono max-w-full reveal ${
                  isDark
                    ? 'bg-sky-500/10 border-sky-400/30 text-sky-300'
                    : 'bg-sky-50 border-sky-200 text-[#0284c7] font-semibold'
                }`}
              >
                <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 flex-shrink-0" />
                <span className="truncate">From Lab to Market • NBA · NAAC · IIC · NIRF Aligned</span>
              </div>

              {/* Main headline with static part + typing effect */}
              <div className="reveal delay-1">
                <h1
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2] ${
                    isDark ? 'text-white' : 'text-[#081c3b]'
                  }`}
                >
                  Building Scalable Pipelines for Academia &amp; Beyond
                </h1>
                {/* Layout-locked row using CSS Grid so the typing animation never pushes or shifts content below */}
                <div className="relative mt-1 grid items-center">
                  {/* Invisible placeholder of the longest phrase to reserve exact height across all viewports */}
                  <span
                    aria-hidden="true"
                    className="col-start-1 row-start-1 invisible select-none pointer-events-none text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2]"
                  >
                    — From Research to Revenue.
                  </span>
                  <span
                    className={`col-start-1 row-start-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2] ${
                      isDark
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#fbbf24] animate-gradient-text typing-cursor'
                        : 'text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#d97706] animate-gradient-text typing-cursor'
                    }`}
                  >
                    — {displayText || '\u00A0'}
                  </span>
                </div>
              </div>

              {/* Strapline inside High-Tech Capsule */}
              <div
                className={`p-4 sm:p-5 rounded-2xl glass-card border shadow-xl relative overflow-hidden group reveal delay-2 ${
                  isDark ? 'border-sky-500/30' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#fbbf24] via-[#38bdf8] to-[#0284c7]" />
                <p
                  className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed pl-1.5 sm:pl-2 ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  A turnkey venture-building framework that translates academic research, student talent and faculty expertise into{' '}
                  <strong className={isDark ? 'text-amber-300 font-semibold' : 'text-amber-700 font-bold'}>
                    scalable, investable enterprises
                  </strong>{' '}
                  — engineered for higher education institutions, faculty, students and emerging founders.
                </p>
              </div>
            </div>

            {/* Responsive CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1 reveal delay-3">
              <button
                onClick={() => onOpenApplication('student')}
                className="relative group overflow-hidden px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-xs sm:text-sm text-white bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#081c3b] hover:from-[#0ea5e9] hover:to-[#0284c7] shadow-xl shadow-sky-600/30 border border-sky-400/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 animate-shimmer cursor-pointer btn-neon-blue"
              >
                <Rocket className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Apply for Incubation</span>
                <ArrowRight className="w-4 h-4 text-sky-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenApplication('institutional')}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#081c3b] bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] hover:brightness-110 shadow-lg border border-amber-300 transition-all text-center cursor-pointer btn-neon-amber"
              >
                <ShieldCheck className="w-4 h-4 text-[#081c3b]" />
                <span>Schedule Campus Assessment</span>
              </button>

              <a
                href="#tracks"
                className={`inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-3.5 rounded-xl font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors text-center hover-underline ${
                  isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-800'
                }`}
              >
                <span>Explore 3 Tracks</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Three Engines Strip */}
            <div className="pt-2 reveal delay-4">
              <div
                className={`text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest mb-2.5 flex items-center gap-2 ${
                  isDark ? 'text-sky-400' : 'text-[#0284c7]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>THREE VENTURE ENGINES (FROM PROPOSAL)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 reveal-stagger">
                {[
                  {
                    icon: Rocket,
                    color: 'text-sky-500',
                    label: 'INCUBATE',
                    sub: 'Pre-incubation · Prototypes · Seed',
                    desc: '3–6 month cohorts, hackathons, PoC micro-grants',
                    cardClass: isDark ? 'border-sky-500/25 hover:border-sky-400/60' : 'border-slate-200 bg-white hover:border-sky-400 shadow-xs',
                  },
                  {
                    icon: Zap,
                    color: 'text-amber-500',
                    label: 'BUILD',
                    sub: 'MVP · Tech-for-Equity · GTM',
                    desc: 'Venture build & scale-up with investor-ready traction',
                    cardClass: isDark ? 'border-amber-500/30 hover:border-amber-400/60' : 'border-amber-200 bg-amber-50/40 hover:border-amber-400 shadow-xs',
                    isGold: true,
                  },
                  {
                    icon: BarChart3,
                    color: 'text-emerald-500',
                    label: 'EMBED',
                    sub: 'Incubator-in-a-Box',
                    desc: 'Turnkey campus setup, NIRF/IIC alignment, full handover',
                    cardClass: isDark ? 'border-emerald-500/30 hover:border-emerald-400/60' : 'border-emerald-200 bg-emerald-50/40 hover:border-emerald-400 shadow-xs',
                  },
                ].map((engine, i) => {
                  const Icon = engine.icon;
                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border transition-all tilt-card ${
                        engine.isGold ? 'glass-card-gold' : 'glass-card'
                      } ${engine.cardClass}`}
                    >
                      <div className={`flex items-center gap-1.5 text-xs font-mono font-black uppercase ${engine.color}`}>
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${engine.color}`} />
                        <span>{engine.label}</span>
                      </div>
                      <div className={`text-[10px] font-bold mt-1 ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                        {engine.sub}
                      </div>
                      <p className={`text-[10px] mt-0.5 leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {engine.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div
              className={`flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl border text-[11px] font-mono transition-colors reveal ${
                isDark
                  ? 'bg-slate-950/80 border-slate-800 text-slate-300'
                  : 'bg-white border-slate-200 text-slate-700 shadow-xs'
              }`}
            >
              <span className={isDark ? 'text-amber-300 font-bold' : 'text-amber-700 font-bold'}>
                ● One hub. Three engines. Endless pipeline.
              </span>
              <div className={`flex items-center gap-3 ${isDark ? 'text-sky-400' : 'text-[#0284c7]'}`}>
                <a href="https://www.ncfvs.in" target="_blank" rel="noreferrer" className="hover:underline hover-underline">
                  www.ncfvs.in
                </a>
                <span>·</span>
                <a
                  href="tel:8379879846"
                  className={`hover:underline font-bold hover-underline ${isDark ? 'text-amber-400' : 'text-amber-700'}`}
                >
                  +91 83798 79846
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech "IDEA TO IMPACT" Visual Engine (5 cols) */}
          <div className="lg:col-span-5 flex justify-center w-full reveal delay-2">
            <div
              className={`relative w-full max-w-sm sm:max-w-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 glass-card border-2 shadow-2xl overflow-hidden group transition-all tilt-card animate-glow-ring ${
                isDark ? 'border-sky-500/40' : 'border-sky-200 bg-white'
              }`}
            >
              {/* Animated Corner Tech Gradients */}
              <div className="absolute top-0 right-0 w-28 sm:w-36 h-28 sm:h-36 bg-gradient-to-br from-amber-400/20 to-sky-400/20 rounded-bl-full pointer-events-none blur-lg" />
              {/* Rotating ring accent */}
              <div className={`absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 border-dashed pointer-events-none animate-rotate ${
                isDark ? 'border-sky-500/20' : 'border-sky-200'
              }`} />
              <div className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-full border border-dashed pointer-events-none animate-rotate-reverse ${
                isDark ? 'border-amber-400/20' : 'border-amber-200'
              }`} />

              <div className="space-y-4 sm:space-y-5 relative z-10">
                {/* Tech Bar Header */}
                <div
                  className={`flex items-center justify-between border-b pb-2.5 sm:pb-3 ${
                    isDark ? 'border-slate-800' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className={`text-[11px] sm:text-xs font-mono font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      INCUBATION_FLOW
                    </span>
                  </div>
                  <span
                    className={`text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                      isDark
                        ? 'text-amber-300 bg-amber-400/15 border-amber-400/30'
                        : 'text-amber-700 bg-amber-50 border-amber-200'
                    }`}
                  >
                    DEEP-TECH
                  </span>
                </div>

                {/* Central Diagram: Idea to Impact High-Tech Journey */}
                <div className="relative py-2 sm:py-3 flex flex-col items-center justify-center">

                  {/* Glowing 3D Lightbulb with Tech Gear Matrix */}
                  <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#f59e0b] via-[#0284c7] to-[#081c3b] p-1 shadow-2xl flex items-center justify-center animate-pulse-glow">
                    <div
                      className={`w-full h-full rounded-xl flex flex-col items-center justify-center border ${
                        isDark
                          ? 'bg-[#060f1e] text-amber-300 border-sky-400/40'
                          : 'bg-white text-amber-600 border-sky-200 shadow-inner'
                      }`}
                    >
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
                      <span
                        className={`text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-widest mt-0.5 sm:mt-1 ${
                          isDark ? 'text-sky-300' : 'text-[#0284c7]'
                        }`}
                      >
                        INNOVATE
                      </span>
                    </div>
                  </div>

                  {/* Connected High-Tech Road Pathway */}
                  <div className="w-full my-4 sm:my-5 relative">
                    <div className="h-2.5 sm:h-3 bg-gradient-to-r from-[#f59e0b] via-[#0ea5e9] to-[#081c3b] rounded-full shadow-inner animate-border-beam" />

                    <div
                      className={`absolute -top-3.5 left-1/2 transform -translate-x-1/2 text-[10px] sm:text-[11px] font-mono font-black tracking-widest uppercase px-3 sm:px-4 py-0.5 sm:py-1 rounded-full border-2 shadow-2xl flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                        isDark
                          ? 'bg-[#060f1e] text-white border-amber-400'
                          : 'bg-white text-[#081c3b] border-amber-400 shadow-md'
                      }`}
                    >
                      <span className={isDark ? 'text-sky-300' : 'text-[#0284c7]'}>IDEA</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                      <span className={isDark ? 'text-amber-400' : 'text-amber-600'}>TO IMPACT</span>
                    </div>
                  </div>

                  {/* 3 Tech Milestones */}
                  <div className="w-full grid grid-cols-3 gap-1.5 sm:gap-2.5 text-center pt-1 reveal-stagger">
                    {[
                      { num: '01', label: 'Ideate', sub: 'Students & Faculty', color: isDark ? 'text-sky-400' : 'text-[#0284c7]', bg: isDark ? 'bg-[#0b1c38] border-sky-500/30' : 'bg-sky-50/70 border-sky-200' },
                      { num: '02', label: 'Incubate', sub: 'Labs & Mentors', color: isDark ? 'text-amber-400' : 'text-amber-700', bg: isDark ? 'bg-[#0b1c38] border-amber-500/30' : 'bg-amber-50/70 border-amber-200' },
                      { num: '03', label: 'Scale', sub: 'Venture Funds', color: isDark ? 'text-emerald-400' : 'text-emerald-700', bg: isDark ? 'bg-[#0b1c38] border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200' },
                    ].map((m, i) => (
                      <div key={i} className={`p-2 sm:p-2.5 rounded-xl border shadow-xs transition-all hover:scale-105 cursor-default ${m.bg}`}>
                        <div className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase truncate ${m.color}`}>
                          {m.num}. {m.label}
                        </div>
                        <div className={`text-[8px] sm:text-[9px] mt-0.5 truncate ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {m.sub}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Trust & Helpline Strip */}
                <div
                  className={`pt-2.5 sm:pt-3 border-t flex flex-wrap items-center justify-between gap-1 text-[11px] sm:text-xs font-mono ${
                    isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <div className={`flex items-center gap-1 sm:gap-1.5 font-bold truncate ${isDark ? 'text-sky-300' : 'text-[#0284c7]'}`}>
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                    <span className="truncate">Nigdi, Pune · Maharashtra</span>
                  </div>
                  <div className={`flex items-center gap-2 font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    <a href="tel:8379879846" className="hover:underline">8379879846</a>
                    <span>|</span>
                    <a href="tel:9209112577" className="hover:underline">9209112577</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
