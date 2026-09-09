import React from 'react';
import { FileText, FlaskConical, IndianRupee, ArrowRight, ShieldCheck, Cpu, Wifi, Bot, Zap, Terminal } from 'lucide-react';

interface NFSupportSectionProps {
  onOpenLabDetails: (domain: 'AI' | 'IoT' | 'Robotics' | 'Electronics') => void;
  onOpenApplication: (track?: string) => void;
  isDark?: boolean;
}

export const NFSupportSection: React.FC<NFSupportSectionProps> = ({
  onOpenLabDetails,
  onOpenApplication,
  isDark = true,
}) => {
  return (
    <section
      id="support"
      className={`py-16 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#060f1e] border-sky-500/20' : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Pill */}
        <div className="flex justify-center mb-12">
          <div
            className={`inline-flex items-center gap-3 px-8 py-3 rounded-full shadow-2xl border-2 backdrop-blur-md ${
              isDark
                ? 'bg-[#0b1e3c] text-white border-sky-400/40'
                : 'bg-white text-[#081c3b] border-slate-300 shadow-md'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <h2
              className={`text-sm sm:text-base md:text-lg font-mono font-black tracking-widest uppercase text-center ${
                isDark
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-amber-300'
                  : 'text-[#081c3b]'
              }`}
            >
              COMPREHENSIVE INCUBATION SUPPORT
            </h2>
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: IPR & Technology Transfer Engine */}
          <div
            className={`relative flex flex-col justify-between glass-card rounded-2xl border hover:border-sky-400 shadow-xl transition-all duration-300 overflow-hidden glass-card-hover ${
              isDark ? 'border-sky-500/30' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="p-6 sm:p-7 flex-1 flex flex-col">
              {/* Header Icon + Title */}
              <div className="flex items-center gap-3.5 mb-5">
                <div
                  className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 shadow-lg ${
                    isDark
                      ? 'bg-sky-500/10 border-sky-400/40 text-[#38bdf8] shadow-sky-500/10'
                      : 'bg-sky-50 border-sky-200 text-[#0284c7]'
                  }`}
                >
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <h3
                    className={`text-base sm:text-lg font-black tracking-tight uppercase leading-snug ${
                      isDark ? 'text-white' : 'text-[#081c3b]'
                    }`}
                  >
                    IPR & Technology Transfer Engine
                  </h3>
                  <span className={`text-[11px] font-mono font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    Patent Drafting, Licensing & Policy
                  </span>
                </div>
              </div>

              {/* Exact Bullets from Proposal & Brochure */}
              <div className="space-y-3 flex-1">
                {[
                  'End-to-end patent drafting & filing (provisional/complete + trademarks)',
                  'Institutional IP & equity-sharing policy (AICTE-NISP compliant)',
                  'Technology Transfer Office (TTO) enablement & prior-art training',
                  'Corporate licensing frameworks & spin-off governance',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 text-xs sm:text-sm font-medium leading-relaxed ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    <span className="text-amber-500 font-mono font-bold text-base leading-none">▶</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Trust Badge */}
              <div
                className={`mt-5 p-3 rounded-xl border flex items-center justify-between ${
                  isDark
                    ? 'bg-slate-900/80 border-sky-500/25 text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-sky-500" />
                  <span>AICTE-NISP Aligned</span>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isDark
                      ? 'text-sky-300 bg-sky-500/20 border-sky-400/30'
                      : 'text-[#0284c7] bg-sky-50 border-sky-200'
                  }`}
                >
                  IP_PORTAL
                </span>
              </div>
            </div>

            <div className={`p-4 border-t ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <button
                onClick={() => onOpenApplication('faculty')}
                className={`w-full py-2.5 px-3 text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer border ${
                  isDark
                    ? 'text-sky-300 hover:text-white bg-slate-900 hover:bg-sky-600/30 border-sky-500/30'
                    : 'text-[#0284c7] hover:text-white bg-white hover:bg-[#0284c7] border-sky-200'
                }`}
              >
                <span>Request Patent Guidance</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
              </button>
            </div>
          </div>

          {/* Card 2: High-Tech Prototyping Infrastructure */}
          <div
            className={`relative flex flex-col justify-between glass-card-gold rounded-2xl border hover:border-amber-400 shadow-xl transition-all duration-300 overflow-hidden glass-card-hover ${
              isDark ? 'border-amber-500/30' : 'border-amber-200 bg-amber-50/30'
            }`}
          >
            <div className="p-6 sm:p-7 flex-1 flex flex-col">
              {/* Header Icon + Title */}
              <div className="flex items-center gap-3.5 mb-5">
                <div
                  className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 shadow-lg ${
                    isDark
                      ? 'bg-amber-500/10 border-amber-400/40 text-amber-400 shadow-amber-500/10'
                      : 'bg-amber-100 border-amber-300 text-amber-600'
                  }`}
                >
                  <FlaskConical className="w-7 h-7" />
                </div>
                <div>
                  <h3
                    className={`text-base sm:text-lg font-black tracking-tight uppercase leading-snug ${
                      isDark ? 'text-white' : 'text-[#081c3b]'
                    }`}
                  >
                    High-Tech Prototyping Labs
                  </h3>
                  <span className={`text-[11px] font-mono font-bold ${isDark ? 'text-sky-300' : 'text-[#0284c7]'}`}>
                    AI/Compute, IoT, Embedded & Bio
                  </span>
                </div>
              </div>

              {/* Exact Bullets from Proposal & Brochure */}
              <div className="space-y-3 flex-1">
                <div
                  className={`flex items-start gap-2.5 text-xs sm:text-sm font-medium leading-relaxed ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  <span className="text-amber-500 font-mono font-bold text-base leading-none">▶</span>
                  <span>500–2,000+ sq. ft. campus co-working & prototyping optimisation</span>
                </div>

                <div
                  className={`flex items-start gap-2.5 text-xs sm:text-sm font-medium leading-relaxed ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  <span className="text-amber-500 font-mono font-bold text-base leading-none">▶</span>
                  <span>Specialised hardware testbeds & Digital Incubation ERP</span>
                </div>

                {/* Focus Areas High-Tech Buttons */}
                <div className="pt-2">
                  <div
                    className={`flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider mb-2.5 ${
                      isDark ? 'text-amber-300' : 'text-amber-800'
                    }`}
                  >
                    <span className={isDark ? 'text-sky-400 font-bold' : 'text-[#0284c7] font-bold'}>▶</span> 4 Specialised Domain Labs:
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => onOpenLabDetails('AI')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all shadow-xs flex flex-col items-center justify-center gap-1 group cursor-pointer ${
                        isDark
                          ? 'bg-[#081730] text-white hover:bg-sky-600 border-sky-500/40'
                          : 'bg-white text-[#081c3b] hover:bg-sky-50 border-slate-200 shadow-xs'
                      }`}
                      title="Explore AI Lab"
                    >
                      <Cpu className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform" />
                      <span className="font-mono">AI</span>
                    </button>

                    <button
                      onClick={() => onOpenLabDetails('IoT')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all shadow-xs flex flex-col items-center justify-center gap-1 group cursor-pointer ${
                        isDark
                          ? 'bg-[#081730] text-white hover:bg-cyan-600 border-cyan-500/40'
                          : 'bg-white text-[#081c3b] hover:bg-cyan-50 border-slate-200 shadow-xs'
                      }`}
                      title="Explore IoT Lab"
                    >
                      <Wifi className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                      <span className="font-mono">IoT</span>
                    </button>

                    <button
                      onClick={() => onOpenLabDetails('Robotics')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all shadow-xs flex flex-col items-center justify-center gap-1 group cursor-pointer ${
                        isDark
                          ? 'bg-[#081730] text-white hover:bg-amber-600 border-amber-500/40'
                          : 'bg-white text-[#081c3b] hover:bg-amber-50 border-slate-200 shadow-xs'
                      }`}
                      title="Explore Robotics Lab"
                    >
                      <Bot className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                      <span className="font-mono">Robotics</span>
                    </button>

                    <button
                      onClick={() => onOpenLabDetails('Electronics')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all shadow-xs flex flex-col items-center justify-center gap-1 group cursor-pointer ${
                        isDark
                          ? 'bg-[#081730] text-white hover:bg-emerald-600 border-emerald-500/40'
                          : 'bg-white text-[#081c3b] hover:bg-emerald-50 border-slate-200 shadow-xs'
                      }`}
                      title="Explore Electronics Lab"
                    >
                      <Zap className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                      <span className="font-mono">Electronics</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tag */}
              <div
                className={`mt-4 p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                  isDark
                    ? 'bg-slate-900/80 border-amber-500/30'
                    : 'bg-white border-amber-200 text-amber-800'
                }`}
              >
                <span className={`font-bold font-mono ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                  Hardware & Virtual Labs
                </span>
                <span
                  className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    isDark
                      ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30'
                      : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  }`}
                >
                  ERP TRACKED
                </span>
              </div>
            </div>

            <div className={`p-4 border-t ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <button
                onClick={() => onOpenLabDetails('AI')}
                className={`w-full py-2.5 px-3 text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer border ${
                  isDark
                    ? 'text-amber-300 hover:text-white bg-slate-900 hover:bg-amber-600/30 border-amber-500/30'
                    : 'text-amber-800 hover:text-white bg-white hover:bg-amber-600 border-amber-200'
                }`}
              >
                <span>View Lab Tooling & Specs</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              </button>
            </div>
          </div>

          {/* Card 3: Grant Engineering & Investor Engagement */}
          <div
            className={`relative flex flex-col justify-between glass-card rounded-2xl border hover:border-emerald-400 shadow-xl transition-all duration-300 overflow-hidden glass-card-hover ${
              isDark ? 'border-sky-500/30' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="p-6 sm:p-7 flex-1 flex flex-col">
              {/* Header Icon + Title */}
              <div className="flex items-center gap-3.5 mb-5">
                <div
                  className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 shadow-lg ${
                    isDark
                      ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-400 shadow-emerald-500/10'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  }`}
                >
                  <IndianRupee className="w-7 h-7" />
                </div>
                <div>
                  <h3
                    className={`text-base sm:text-lg font-black tracking-tight uppercase leading-snug ${
                      isDark ? 'text-white' : 'text-[#081c3b]'
                    }`}
                  >
                    Grant Engineering & Syndication
                  </h3>
                  <span className={`text-[11px] font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    NIDHI · BIRAC · MSME · Angel Network
                  </span>
                </div>
              </div>

              {/* Exact Bullets from Proposal & Brochure */}
              <div className="space-y-3 flex-1">
                {[
                  'Non-dilutive grant readiness (NIDHI, BIRAC, MSME, MeitY)',
                  'Proof-of-Concept (PoC) micro-grants & institutional seed funding',
                  'Curated CXO & operator mentorship with Go-to-Market corporate pilots',
                  'Investor demo days, angel syndication & micro-VC networks (₹3Cr+ lines)',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 text-xs sm:text-sm font-medium leading-relaxed ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    <span className="text-amber-500 font-mono font-bold text-base leading-none">▶</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Trust Badge */}
              <div
                className={`mt-5 p-3 rounded-xl border flex items-center justify-between ${
                  isDark
                    ? 'bg-slate-900/80 border-emerald-500/25 text-slate-200'
                    : 'bg-slate-50 border-emerald-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold">
                  <IndianRupee className="w-4 h-4 text-emerald-500" />
                  <span>₹3Cr+ Grant Pipeline</span>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isDark
                      ? 'text-emerald-300 bg-emerald-500/20 border-emerald-400/30'
                      : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  }`}
                >
                  NON-DILUTIVE
                </span>
              </div>
            </div>

            <div className={`p-4 border-t ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <button
                onClick={() => onOpenApplication('student')}
                className={`w-full py-2.5 px-3 text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer border ${
                  isDark
                    ? 'text-emerald-300 hover:text-white bg-slate-900 hover:bg-emerald-600/30 border-emerald-500/30'
                    : 'text-emerald-800 hover:text-white bg-white hover:bg-emerald-600 border-emerald-200'
                }`}
              >
                <span>Apply for Grant & Seed Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
