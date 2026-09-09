import React from 'react';
import { NFLogo } from './NFLogo';
import { ClipboardCheck, Network, Cpu, Rocket, ArrowRight, Activity, Terminal, Shield, CheckCircle } from 'lucide-react';

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
            className={`flex flex-col glass-card rounded-3xl border p-6 sm:p-8 shadow-2xl relative overflow-hidden ${
              isDark ? 'border-sky-500/30' : 'border-slate-200 bg-slate-50/70'
            }`}
          >
            <div className="absolute top-0 left-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

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
                  12-MONTH TURNKEY ROLLOUT JOURNEY
                </h3>
                <span className="w-2 h-2 rounded-full bg-sky-400" />
              </div>
            </div>

            {/* 4 Sequential Stages from PDF */}
            <div className="flex-1 flex flex-col justify-between space-y-3">
              
              {/* Stage I – Assess (Month 1) */}
              <div
                className={`p-3.5 rounded-2xl border shadow-xs transition-all flex items-start gap-3.5 ${
                  isDark
                    ? 'bg-slate-900/80 border-sky-500/30 hover:border-sky-400'
                    : 'bg-white border-slate-200 hover:border-sky-400 shadow-xs'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-400/40 flex flex-col items-center justify-center flex-shrink-0 font-mono">
                  <span className="text-xs font-black">M1</span>
                  <ClipboardCheck className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-xs font-mono font-black uppercase tracking-wider ${
                        isDark ? 'text-sky-300' : 'text-[#0284c7]'
                      }`}
                    >
                      STAGE I – ASSESS (MONTH 1)
                    </h4>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isDark
                          ? 'text-sky-400 bg-sky-500/20'
                          : 'text-[#0284c7] bg-sky-50 border border-sky-200'
                      }`}
                    >
                      MoU & Audit
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed font-medium mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Capability audit of research labs, ongoing projects, faculty patents and E-Cell activity; baseline scoring against NBA/NAAC/NIRF metrics; bilateral institutional MoU.
                  </p>
                </div>
              </div>

              {/* Stage II – Govern (Month 2) */}
              <div
                className={`p-3.5 rounded-2xl border shadow-xs transition-all flex items-start gap-3.5 ${
                  isDark
                    ? 'bg-slate-900/80 border-amber-500/30 hover:border-amber-400'
                    : 'bg-white border-amber-200 hover:border-amber-400 shadow-xs'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-400/40 flex flex-col items-center justify-center flex-shrink-0 font-mono">
                  <span className="text-xs font-black">M2</span>
                  <Network className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-xs font-mono font-black uppercase tracking-wider ${
                        isDark ? 'text-amber-300' : 'text-amber-800'
                      }`}
                    >
                      STAGE II – GOVERN (MONTH 2)
                    </h4>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isDark
                          ? 'text-amber-400 bg-amber-400/20'
                          : 'text-amber-800 bg-amber-50 border border-amber-200'
                      }`}
                    >
                      Board & IP
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed font-medium mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Constitution of Institutional Incubation Board (leadership + faculty + industry experts + NFVS) and ratification of an AICTE-NISP-compliant IP & equity-sharing policy.
                  </p>
                </div>
              </div>

              {/* Stage III – Build (Months 3–4) */}
              <div
                className={`p-3.5 rounded-2xl border shadow-xs transition-all flex items-start gap-3.5 ${
                  isDark
                    ? 'bg-slate-900/80 border-sky-500/30 hover:border-sky-400'
                    : 'bg-white border-slate-200 hover:border-sky-400 shadow-xs'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-400/40 flex flex-col items-center justify-center flex-shrink-0 font-mono">
                  <span className="text-xs font-black">M3-4</span>
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-xs font-mono font-black uppercase tracking-wider ${
                        isDark ? 'text-sky-300' : 'text-[#0284c7]'
                      }`}
                    >
                      STAGE III – BUILD (MONTHS 3–4)
                    </h4>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isDark
                          ? 'text-emerald-400 bg-emerald-500/20'
                          : 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                      }`}
                    >
                      Space & ERP
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed font-medium mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Optimisation of 500–2,000+ sq. ft. of co-working/prototyping space; deployment of Digital Incubation ERP for activity tracking; release of annual IIC/workshop calendar.
                  </p>
                </div>
              </div>

              {/* Stage IV – Operate & Handover (Months 5–12+) */}
              <div
                className={`p-3.5 rounded-2xl border shadow-xs transition-all flex items-start gap-3.5 ${
                  isDark
                    ? 'bg-slate-900/80 border-emerald-500/30 hover:border-emerald-400'
                    : 'bg-white border-emerald-200 hover:border-emerald-400 shadow-xs'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-400/40 flex flex-col items-center justify-center flex-shrink-0 font-mono">
                  <span className="text-xs font-black">M5-12</span>
                  <Rocket className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-xs font-mono font-black uppercase tracking-wider ${
                        isDark ? 'text-emerald-300' : 'text-emerald-800'
                      }`}
                    >
                      STAGE IV – OPERATE & HANDOVER (MONTHS 5–12+)
                    </h4>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isDark
                          ? 'text-amber-300 bg-amber-400/20'
                          : 'text-amber-800 bg-amber-50 border border-amber-200'
                      }`}
                    >
                      Self-Sustaining
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed font-medium mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Cohort-1 intake, mentor matching, institutional patent filings, investor demo days, faculty upskilling — ending in full operational handover to run a self-sustaining centre.
                  </p>
                </div>
              </div>

              {/* Action: Book Campus Assessment */}
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
        </div>

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
