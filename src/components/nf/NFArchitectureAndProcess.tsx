import React, { useEffect, useRef, useState } from 'react';
import { NFLogo } from './NFLogo';
import { ClipboardCheck, Network, Cpu, Rocket, ArrowRight, Activity, Terminal, Shield, CheckCircle, Play, Pause, Sparkles, Check } from 'lucide-react';

interface NFArchitectureAndProcessProps {
  onOpenApplication: (track?: string) => void;
  onOpenLabDetails: (domain: 'AI' | 'IoT' | 'Robotics' | 'Electronics') => void;
  isDark?: boolean;
}

export const NFArchitectureAndProcess: React.FC<NFArchitectureAndProcessProps> = ({
  onOpenApplication,
  onOpenLabDetails,
  isDark = true,
}) => {
  const [activeStage, setActiveStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(25);
  const [isManualSelection, setIsManualSelection] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const manualTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const stages = [
    {
      id: 1,
      label: 'STAGE I – ASSESS',
      subtitle: 'MoU & Comprehensive Capability Audit',
      month: 'M1',
      tag: 'MoU & Audit',
      badge: 'Month 1',
      tagColor: isDark ? 'text-sky-300 bg-sky-500/20 border border-sky-400/30' : 'text-[#0284c7] bg-sky-50 border border-sky-200',
      borderActive: isDark ? 'border-sky-400 shadow-lg shadow-sky-500/20 ring-1 ring-sky-400/40 bg-[#0c1f3d]' : 'border-[#0284c7] shadow-md shadow-sky-200/80 ring-1 ring-[#0284c7]/40 bg-white',
      borderIdle: isDark ? 'bg-slate-900/70 border-slate-800 hover:border-sky-400/50' : 'bg-white/80 border-slate-200 hover:border-sky-400/50',
      iconBg: isDark ? 'bg-sky-500/20 text-sky-400 border-sky-400/40' : 'bg-sky-100 text-[#0284c7] border-sky-300',
      titleColor: isDark ? 'text-sky-300' : 'text-[#0284c7]',
      barColor: '#38bdf8',
      Icon: ClipboardCheck,
      desc: 'Capability audit of research labs, student projects, faculty patents and E-Cell activity; baseline scoring against NBA/NAAC/NIRF metrics; bilateral institutional MoU signing.',
      deliverables: [
        'Lab, infrastructure & ongoing IP audit',
        'NBA / NAAC Criterion 3 baseline score card',
        'Bilateral institutional co-execution MoU',
      ],
    },
    {
      id: 2,
      label: 'STAGE II – GOVERN',
      subtitle: 'Board Constitution & IP Policy Ratification',
      month: 'M2',
      tag: 'Board & IP',
      badge: 'Month 2',
      tagColor: isDark ? 'text-amber-300 bg-amber-400/20 border border-amber-400/30' : 'text-amber-800 bg-amber-50 border border-amber-200',
      borderActive: isDark ? 'border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/40 bg-[#1f1a0d]' : 'border-amber-500 shadow-md shadow-amber-200/80 ring-1 ring-amber-400/40 bg-white',
      borderIdle: isDark ? 'bg-slate-900/70 border-slate-800 hover:border-amber-400/50' : 'bg-white/80 border-slate-200 hover:border-amber-400/50',
      iconBg: isDark ? 'bg-amber-500/20 text-amber-400 border-amber-400/40' : 'bg-amber-100 text-amber-800 border-amber-300',
      titleColor: isDark ? 'text-amber-300' : 'text-amber-800',
      barColor: '#f59e0b',
      Icon: Network,
      desc: 'Constitution of Institutional Incubation Board (leadership + faculty + industry CXOs + NFVS) and ratification of an AICTE-NISP-compliant IP & equity-sharing policy.',
      deliverables: [
        'Constitution of Institutional Incubation Board',
        'AICTE-NISP compliant IP & equity policy',
        'Designated Faculty SPOC & E-Cell governance',
      ],
    },
    {
      id: 3,
      label: 'STAGE III – BUILD',
      subtitle: 'Physical Space & Digital Incubation ERP',
      month: 'M3-4',
      tag: 'Space & ERP',
      badge: 'Months 3–4',
      tagColor: isDark ? 'text-sky-300 bg-sky-500/20 border border-sky-400/30' : 'text-[#0284c7] bg-sky-50 border border-sky-200',
      borderActive: isDark ? 'border-sky-400 shadow-lg shadow-sky-500/20 ring-1 ring-sky-400/40 bg-[#0c1f3d]' : 'border-[#0284c7] shadow-md shadow-sky-200/80 ring-1 ring-[#0284c7]/40 bg-white',
      borderIdle: isDark ? 'bg-slate-900/70 border-slate-800 hover:border-sky-400/50' : 'bg-white/80 border-slate-200 hover:border-sky-400/50',
      iconBg: isDark ? 'bg-sky-500/20 text-sky-400 border-sky-400/40' : 'bg-sky-100 text-[#0284c7] border-sky-300',
      titleColor: isDark ? 'text-sky-300' : 'text-[#0284c7]',
      barColor: '#0ea5e9',
      Icon: Cpu,
      desc: 'Optimisation of 500–2,000+ sq. ft. of co-working/prototyping space; turnkey deployment of Digital Incubation ERP for activity tracking; release of annual IIC/workshop calendar.',
      deliverables: [
        '500–2,000+ sq. ft. innovation space setup',
        'Digital Incubation ERP tracking portal deployed',
        'Annual MIC/IIC master workshop calendar',
      ],
    },
    {
      id: 4,
      label: 'STAGE IV – OPERATE & HANDOVER',
      subtitle: 'Cohort Launch & Self-Sustaining Handover',
      month: 'M5-12',
      tag: 'Self-Sustaining',
      badge: 'Months 5–12+',
      tagColor: isDark ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-400/30' : 'text-emerald-800 bg-emerald-50 border border-emerald-200',
      borderActive: isDark ? 'border-emerald-400 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40 bg-[#0d2319]' : 'border-emerald-500 shadow-md shadow-emerald-200/80 ring-1 ring-emerald-400/40 bg-white',
      borderIdle: isDark ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-400/50' : 'bg-white/80 border-slate-200 hover:border-emerald-400/50',
      iconBg: isDark ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/40' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
      titleColor: isDark ? 'text-emerald-300' : 'text-emerald-800',
      barColor: '#10b981',
      Icon: Rocket,
      desc: 'Cohort-1 intake, mentor matching, institutional patent filings, investor demo days, faculty upskilling — ending in full operational handover to run a self-sustaining centre.',
      deliverables: [
        'Cohort-1 student/faculty venture intake',
        'Investor demo days & institutional patent filings',
        'Full operational handover for self-sufficiency',
      ],
    },
  ];

  // Dynamic scroll synchronization with passive listener & RAF
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (isManualSelection || isPlaying) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = processRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;

            const startScroll = vh * 0.80;
            const endScroll = vh * 0.25 - rect.height;
            const totalScroll = startScroll - endScroll;
            const currentScroll = startScroll - rect.top;

            if (currentScroll <= 0) {
              setScrollProgress(25);
              setActiveStage(0);
            } else {
              const ratio = Math.max(0, Math.min(1, currentScroll / totalScroll));
              const pct = Math.min(100, Math.max(25, Math.round(25 + ratio * 75)));
              setScrollProgress(pct);

              if (ratio < 0.25) {
                setActiveStage(0);
              } else if (ratio < 0.50) {
                setActiveStage(1);
              } else if (ratio < 0.75) {
                setActiveStage(2);
              } else {
                setActiveStage(3);
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isManualSelection, isPlaying]);

  const handleSelectStage = (idx: number) => {
    if (isPlaying && playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
      setIsPlaying(false);
    }
    setActiveStage(idx);
    setScrollProgress(Math.round(((idx + 1) / stages.length) * 100));
    setIsManualSelection(true);
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      setIsManualSelection(false);
    }, 4000);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
      setIsPlaying(false);
      setIsManualSelection(false);
    } else {
      setIsPlaying(true);
      setIsManualSelection(true);
      let step = 0;
      setActiveStage(0);
      setScrollProgress(25);

      playIntervalRef.current = setInterval(() => {
        step += 1;
        if (step >= stages.length) {
          if (playIntervalRef.current) clearInterval(playIntervalRef.current);
          setIsPlaying(false);
          setIsManualSelection(false);
        } else {
          setActiveStage(step);
          setScrollProgress(Math.round(((step + 1) / stages.length) * 100));
        }
      }, 1800);
    }
  };
  return (
    <section
      id="architecture"
      className={`py-16 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#081528] border-sky-500/20' : 'bg-white border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* ================= LEFT BOX: THE INTEGRATED SYSTEM ARCHITECTURE ================= */}
          <div
            className={`flex flex-col glass-card rounded-3xl border p-6 sm:p-8 shadow-2xl relative overflow-hidden ${
              isDark ? 'border-sky-500/30' : 'border-slate-200 bg-slate-50/70'
            }`}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header Pill */}
            <div className="flex justify-center mb-6">
              <div
                className={`inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full shadow-xl border ${
                  isDark
                    ? 'bg-[#0b1e3c] text-white border-sky-400/40'
                    : 'bg-white text-[#081c3b] border-slate-300 shadow-md'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <h3
                  className={`text-xs sm:text-sm font-mono font-black tracking-wider uppercase text-center ${
                    isDark
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-amber-300'
                      : 'text-[#081c3b]'
                  }`}
                >
                  THE FOUR-PILLAR INCUBATION ARCHITECTURE
                </h3>
                <span className="w-2 h-2 rounded-full bg-sky-400" />
              </div>
            </div>

            {/* 4 Pillars Grid with Central Emblem */}
            <div className="relative flex-1 flex flex-col justify-between space-y-3.5">
              
              {/* Top Row: Pillar 1 & Pillar 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Pillar 1: Pre-Incubation Ecosystem */}
                <div
                  className={`p-4 rounded-2xl border shadow-md flex flex-col justify-between transition-colors ${
                    isDark
                      ? 'bg-slate-900/80 border-sky-500/30 hover:border-sky-400'
                      : 'bg-white border-sky-200 hover:border-sky-400 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      <h4
                        className={`text-xs font-mono font-black uppercase tracking-wider ${
                          isDark ? 'text-sky-300' : 'text-[#0284c7]'
                        }`}
                      >
                        1. PRE-INCUBATION ECOSYSTEM
                      </h4>
                    </div>
                    <ul className={`space-y-1 text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>Idea scouting, hackathons & design-thinking bootcamps</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>3–6 month structured cohorts & PoC micro-grants</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>AI / IoT / hardware prototyping access</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>E-Cell revitalisation with calendarised demo days</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Pillar 2: Full-Fledged Incubation */}
                <div
                  className={`p-4 rounded-2xl border shadow-md flex flex-col justify-between transition-colors ${
                    isDark
                      ? 'bg-slate-900/80 border-amber-500/30 hover:border-amber-400'
                      : 'bg-white border-amber-200 hover:border-amber-400 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <h4
                        className={`text-xs font-mono font-black uppercase tracking-wider ${
                          isDark ? 'text-amber-300' : 'text-amber-800'
                        }`}
                      >
                        2. FULL-FLEDGED INCUBATION
                      </h4>
                    </div>
                    <ul className={`space-y-1 text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>MVP engineering (Dev-for-Equity framework)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>Legal incorporation (Pvt Ltd / LLP / MSME)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>Curated CXO & operator mentorship</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>Go-to-Market sprints, corporate pilots & angel syndication</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Central Core Emblem Strip */}
              <div className="py-1 flex items-center justify-center">
                <div
                  className={`px-5 py-2 rounded-2xl border-2 shadow-2xl flex items-center gap-3 animate-pulse-glow ${
                    isDark
                      ? 'bg-[#060f1e] text-white border-amber-400 shadow-amber-500/20'
                      : 'bg-white text-[#081c3b] border-amber-400 shadow-amber-500/10'
                  }`}
                >
                  <NFLogo size="sm" variant={isDark ? 'light' : 'dark'} showSubtitle={false} />
                  <div className={`text-left border-l pl-3 ${isDark ? 'border-slate-700' : 'border-slate-300'}`}>
                    <div className={`text-[11px] font-mono font-black uppercase tracking-wider ${
                      isDark ? 'text-amber-300' : 'text-amber-800'
                    }`}>
                      Central Core Hub
                    </div>
                    <div className={`text-[10px] font-mono ${isDark ? 'text-sky-300' : 'text-[#0284c7]'}`}>
                      From Lab to Market Pipeline Engine
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Pillar 3 & Pillar 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Pillar 3: IPR & Technology Transfer */}
                <div
                  className={`p-4 rounded-2xl border shadow-md flex flex-col justify-between transition-colors ${
                    isDark
                      ? 'bg-slate-900/80 border-sky-500/30 hover:border-sky-400'
                      : 'bg-white border-sky-200 hover:border-sky-400 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      <h4
                        className={`text-xs font-mono font-black uppercase tracking-wider ${
                          isDark ? 'text-sky-300' : 'text-[#0284c7]'
                        }`}
                      >
                        3. IPR & TECH TRANSFER
                      </h4>
                    </div>
                    <ul className={`space-y-1 text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>End-to-end patent drafting & filing (provisional/complete)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>Institutional IP & equity policy (AICTE-NISP compliant)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>Technology Transfer Office (TTO) enablement</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>Corporate licensing & spin-off governance</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Pillar 4: IIC Activities & Accreditation */}
                <div
                  className={`p-4 rounded-2xl border shadow-md flex flex-col justify-between transition-colors ${
                    isDark
                      ? 'bg-slate-900/80 border-emerald-500/30 hover:border-emerald-400'
                      : 'bg-white border-emerald-200 hover:border-emerald-400 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <h4
                        className={`text-xs font-mono font-black uppercase tracking-wider ${
                          isDark ? 'text-emerald-300' : 'text-emerald-800'
                        }`}
                      >
                        4. IIC & ACCREDITATION
                      </h4>
                    </div>
                    <ul className={`space-y-1 text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>100% execution of MIC-mandated IIC annual calendar</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>Documented dossiers for NAAC Criterion 3 (KI 3.3)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>Complete NBA SAR evidence packs & NIRF RP/GO/OI uplift</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-mono font-bold leading-none">▶</span>
                        <span>ARIIA / NIRF-Innovation & AICTE-NISP adoption</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT BOX: 12-MONTH TURNKEY ROLLOUT ================= */}
          <div
            id="process"
            ref={processRef}
            className={`flex flex-col glass-card rounded-3xl border p-6 sm:p-8 shadow-2xl relative overflow-hidden ${
              isDark ? 'border-sky-500/30' : 'border-slate-200 bg-slate-50/70'
            }`}
          >
            <div className="absolute top-0 left-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header Pill */}
            <div className="flex justify-center mb-4">
              <div
                className={`inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full shadow-xl border ${
                  isDark
                    ? 'bg-[#0b1e3c] text-white border-sky-400/40'
                    : 'bg-white text-[#081c3b] border-slate-300 shadow-md'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <h3
                  className={`text-xs sm:text-sm font-mono font-black tracking-wider uppercase text-center ${
                    isDark
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-amber-300'
                      : 'text-[#081c3b]'
                  }`}
                >
                  12-MONTH TURNKEY ROLLOUT JOURNEY
                </h3>
                <span className="w-2 h-2 rounded-full bg-sky-400" />
              </div>
            </div>

            {/* ── INTERACTIVE STAGE MILESTONE TABS ── */}
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {stages.map((st, i) => {
                const isSelected = i === activeStage;
                const isPast = i < activeStage;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelectStage(i)}
                    className={`py-1.5 px-1 rounded-xl text-center border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-md shadow-sky-500/20 scale-[1.02]'
                          : 'bg-sky-100 border-[#0284c7] text-[#0284c7] font-bold shadow-xs scale-[1.02]'
                        : isPast
                          ? isDark
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : isDark
                            ? 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                    title={`Click to inspect ${st.label}`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {isPast ? (
                        <CheckCircle className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
                      ) : isSelected ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping flex-shrink-0" />
                      ) : null}
                      <span className="text-[10px] font-mono font-black">{st.month}</span>
                    </div>
                    <div className="text-[8px] font-mono font-bold truncate mt-0.5">
                      {st.tag}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ── PROGRESS RAIL ── */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
                    isDark ? 'text-sky-400' : 'text-[#0284c7]'
                  }`}>
                    Incubation Flow Progress
                  </span>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    isDark ? 'bg-sky-500/10 border-sky-400/30 text-sky-300' : 'bg-sky-50 border-sky-200 text-[#0284c7]'
                  }`}>
                    Stage {activeStage + 1} of 4: {stages[activeStage].tag}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTogglePlay}
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-lg border flex items-center gap-1 transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                        : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    }`}
                    title={isPlaying ? 'Pause Auto-Play' : 'Auto-Play Stages Walkthrough'}
                  >
                    {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                    <span>{isPlaying ? 'Pause' : 'Play Flow'}</span>
                  </button>

                  <span className={`text-xs font-mono font-black transition-all duration-300 ${
                    scrollProgress >= 100
                      ? isDark ? 'text-emerald-400' : 'text-emerald-700'
                      : isDark ? 'text-amber-400' : 'text-amber-700'
                  }`}>
                    {scrollProgress}%
                  </span>
                </div>
              </div>

              {/* Progress Track */}
              <div className={`relative h-2.5 sm:h-3 rounded-full overflow-hidden p-0.5 ${
                isDark ? 'bg-slate-800 border border-slate-700/60' : 'bg-slate-200 border border-slate-300'
              }`}>
                <div
                  className="h-full rounded-full transition-all duration-300 ease-out relative"
                  style={{
                    width: `${scrollProgress}%`,
                    background: 'linear-gradient(90deg, #38bdf8 0%, #f59e0b 50%, #10b981 100%)',
                    backgroundSize: '200% 100%',
                  }}
                >
                  {/* Glowing tip */}
                  <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/90 rounded-full blur-[1px] shadow-sm animate-pulse" />
                </div>

                {/* Stage Milestone Dividers */}
                {[25, 50, 75].map((pct, idx) => (
                  <div
                    key={idx}
                    className={`absolute top-0 bottom-0 w-0.5 transition-colors duration-300 ${
                      scrollProgress >= pct
                        ? 'bg-white/80'
                        : isDark ? 'bg-slate-700' : 'bg-slate-400'
                    }`}
                    style={{ left: `${pct}%` }}
                  />
                ))}
              </div>

              {/* Stage labels under the bar */}
              <div className="grid grid-cols-4 mt-1">
                {stages.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectStage(i)}
                    className={`text-[8px] font-mono font-bold text-center transition-colors duration-300 cursor-pointer hover:underline ${
                      i === activeStage
                        ? isDark ? 'text-amber-300 font-black' : 'text-amber-700 font-black'
                        : i < activeStage
                          ? isDark ? 'text-emerald-400' : 'text-emerald-700'
                          : isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    {s.month}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Sequential Stages Cards */}
            <div className="flex-1 flex flex-col justify-between space-y-2.5">
              {stages.map((stage, i) => {
                const Icon = stage.Icon;
                const isActive = i <= activeStage;
                const isCurrent = i === activeStage;
                const isCompleted = i < activeStage;

                return (
                  <div
                    key={i}
                    onClick={() => handleSelectStage(i)}
                    className={`p-3 sm:p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-3 cursor-pointer group ${
                      isCurrent
                        ? `${stage.borderActive} scale-[1.01]`
                        : isCompleted
                          ? isDark
                            ? 'bg-slate-900/80 border-emerald-500/30 hover:border-emerald-400/60'
                            : 'bg-white border-emerald-200 hover:border-emerald-300 shadow-xs'
                          : stage.borderIdle
                    }`}
                  >
                    {/* Month Badge */}
                    <div className={`w-11 h-11 rounded-xl border flex flex-col items-center justify-center flex-shrink-0 font-mono transition-all duration-300 ${
                      stage.iconBg
                    } ${
                      isCurrent ? 'animate-badge-pulse ring-2 ring-amber-400/50' : ''
                    }`}>
                      <span className="text-[10px] font-black">{stage.month}</span>
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className={`text-[11px] sm:text-xs font-mono font-black uppercase tracking-wider leading-tight ${
                            stage.titleColor
                          }`}>
                            {stage.label}
                          </h4>
                          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border hidden sm:inline-block ${
                            isDark ? 'text-slate-400 border-slate-700 bg-slate-800/60' : 'text-slate-600 border-slate-200 bg-slate-100'
                          }`}>
                            {stage.badge}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${stage.tagColor}`}>
                            {isCompleted ? '✓ Done' : isCurrent ? '● Active' : stage.tag}
                          </span>
                          {/* Animated check when stage is done */}
                          <CheckCircle
                            className={`w-3.5 h-3.5 flex-shrink-0 transition-all duration-300 ${
                              isCompleted
                                ? 'text-emerald-400 opacity-100 scale-100'
                                : isCurrent
                                  ? 'text-amber-400 opacity-100 scale-100 animate-pulse'
                                  : 'opacity-0 scale-50'
                            }`}
                          />
                        </div>
                      </div>

                      <p className={`text-[10px] sm:text-xs leading-relaxed font-medium transition-colors duration-300 mb-1.5 ${
                        isActive
                          ? isDark ? 'text-slate-200' : 'text-slate-700'
                          : isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {stage.desc}
                      </p>

                      {/* Deliverables Checklist (always visible, highlighted when current) */}
                      <div className={`pt-1.5 border-t space-y-0.5 transition-opacity duration-300 ${
                        isCurrent
                          ? isDark ? 'border-sky-500/20' : 'border-sky-100'
                          : isDark ? 'border-slate-800/80' : 'border-slate-100'
                      }`}>
                        {stage.deliverables.map((d, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono">
                            <span className={`w-1 h-1 rounded-full flex-shrink-0 ${
                              isCurrent
                                ? 'bg-amber-400'
                                : isCompleted
                                  ? 'bg-emerald-400'
                                  : isDark ? 'bg-slate-600' : 'bg-slate-400'
                            }`} />
                            <span className={`${
                              isCurrent
                                ? isDark ? 'text-sky-200 font-semibold' : 'text-[#0369a1] font-semibold'
                                : isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                              {d}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Action CTA */}
              <div className="pt-1">
                <button
                  onClick={() => onOpenApplication('institutional')}
                  className="w-full py-3 px-4 rounded-xl text-xs font-mono font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#081c3b] hover:from-[#0ea5e9] hover:to-[#0284c7] shadow-xl border border-sky-400/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Book Free On-Campus Readiness Assessment</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>
          </div>
        </div>{/* end grid */}

        {/* Institutional Partnership Framework: Clear Roles (From Proposal Page 2) */}
        <div
          className={`mt-8 sm:mt-10 p-5 sm:p-7 md:p-8 rounded-3xl glass-card border shadow-2xl relative overflow-hidden ${
            isDark ? 'border-sky-500/30' : 'border-slate-200 bg-slate-50/80'
          }`}
        >
          <div
            className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-5 border-b ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-mono font-bold mb-1 ${
                  isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                <span>GOVERNANCE & RESPONSIBILITY MATRIX</span>
              </div>
              <h3 className={`text-base sm:text-lg md:text-xl font-black uppercase tracking-tight ${
                isDark ? 'text-white' : 'text-[#081c3b]'
              }`}>
                Clear Roles & Institutional Partnership Model
              </h3>
            </div>
            <span
              className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border ${
                isDark
                  ? 'text-sky-400 bg-sky-500/10 border-sky-500/30'
                  : 'text-[#0284c7] bg-sky-50 border-sky-200'
              }`}
            >
              Turnkey Co-Execution Framework
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
            {/* Left: What NF Venture Studio Deploys */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border ${
                isDark ? 'bg-[#091b38]/90 border-sky-500/30' : 'bg-white border-sky-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <h4
                  className={`text-xs sm:text-sm font-mono font-black uppercase tracking-wider ${
                    isDark ? 'text-sky-300' : 'text-[#0284c7]'
                  }`}
                >
                  NF VENTURE STUDIO DEPLOYS
                </h4>
              </div>
              <ul className={`space-y-2 text-xs sm:text-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">▶</span>
                  <span>Turnkey operating protocols & Digital Incubation ERP system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">▶</span>
                  <span>Experienced venture builders, domain mentors & CXO operators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">▶</span>
                  <span>Structured cohorts, hackathons, bootcamps & patent drafting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">▶</span>
                  <span>Active investor networks, angel syndication & corporate pilots</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">▶</span>
                  <span>Quarterly compliance dossiers for NAAC, NBA, NIRF, IIC & AICTE-NISP</span>
                </li>
              </ul>
            </div>

            {/* Right: What Your Institute Provides */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border ${
                isDark ? 'bg-[#14223d]/90 border-amber-500/30' : 'bg-white border-amber-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <h4
                  className={`text-xs sm:text-sm font-mono font-black uppercase tracking-wider ${
                    isDark ? 'text-amber-300' : 'text-amber-800'
                  }`}
                >
                  YOUR INSTITUTE PROVIDES
                </h4>
              </div>
              <ul className={`space-y-2 text-xs sm:text-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">▶</span>
                  <span>Dedicated physical space (500–2,000+ sq. ft.) on campus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">▶</span>
                  <span>Basic infrastructure (power, high-speed internet, desks)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">▶</span>
                  <span>Designated Faculty Incubation SPOC + IIC Coordinator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">▶</span>
                  <span>Outreach, student awareness & participation support across departments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">▶</span>
                  <span>Institutional Incubation Board representation & IP policy ratification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
