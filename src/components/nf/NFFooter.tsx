import React, { useState } from 'react';
import { NFLogo } from './NFLogo';
import { Phone, Lightbulb, FlaskConical, Sparkles, Target, Copy, Check, MessageSquare } from 'lucide-react';

interface NFFooterProps {
  onOpenApplication: (track?: string) => void;
  isDark?: boolean;
}

export const NFFooter: React.FC<NFFooterProps> = ({ onOpenApplication, isDark = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('8379879846');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="contact"
      className={`pt-10 sm:pt-12 pb-6 sm:pb-8 border-t-2 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#040a14] text-white border-sky-500/30' : 'bg-slate-100 text-slate-900 border-sky-400/40'
      }`}
    >
      {/* Background glow accents aligned to logo colors */}
      <div className="absolute top-0 left-1/4 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8">

        {/* Main 3-Column Footer Bar */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border shadow-2xl backdrop-blur-xl reveal ${
            isDark ? 'bg-[#0b1a33]/80 border-sky-500/40' : 'bg-white/90 border-sky-300/60'
          }`}
        >
          
          {/* ================= LEFT: CONTACT US & PHONE 8379879846 ================= */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-3 text-center lg:text-left">
            <div className="text-xs font-mono font-black tracking-widest uppercase text-sky-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span>INCUBATION HELPLINE</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="tel:8379879846"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#ea580c] text-[#081c3b] flex items-center justify-center shadow-lg hover:scale-105 transition-transform flex-shrink-0 border border-amber-300"
                title="Call 8379879846"
              >
                <Phone className="w-6 h-6 sm:w-7 sm:h-7 fill-[#081c3b]" />
              </a>

              <div className="flex flex-col items-center sm:items-start">
                <a
                  href="tel:8379879846"
                  className={`text-2xl sm:text-3xl font-mono font-black tracking-tight transition-colors block ${
                    isDark ? 'text-white hover:text-amber-300' : 'text-slate-900 hover:text-amber-600'
                  }`}
                >
                  8379879846
                </a>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={handleCopyPhone}
                    className={`text-[11px] font-mono flex items-center gap-1 px-2.5 py-0.5 rounded-md transition-colors border ${
                      isDark
                        ? 'text-sky-300 hover:text-white bg-sky-950/60 hover:bg-sky-900/60 border-sky-500/30'
                        : 'text-sky-700 hover:text-sky-900 bg-sky-100 hover:bg-sky-200 border-sky-300'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://wa.me/918379879846"
                    target="_blank"
                    rel="noreferrer"
                    className={`text-[11px] font-mono flex items-center gap-1 px-2.5 py-0.5 rounded-md transition-colors border ${
                      isDark
                        ? 'text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/60 border-emerald-500/30'
                        : 'text-emerald-700 hover:text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border-emerald-300'
                    }`}
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ================= CENTER: NF LOGO EMBLEM EXACT MATCH ================= */}
          <div className={`lg:col-span-4 flex flex-col items-center justify-center text-center py-4 lg:py-0 border-y lg:border-y-0 lg:border-x ${isDark ? 'border-slate-800' : 'border-slate-300'}`}>
            <NFLogo size="lg" variant="light" />
            <p className={`text-xs font-mono mt-2 max-w-xs leading-relaxed ${
              isDark ? 'text-sky-200/80' : 'text-slate-600'
            }`}>
              Deep-tech ecosystem nurturing students, faculty, and innovators to build impactful ventures.
            </p>
          </div>

          {/* ================= RIGHT: INNOVATE TODAY, INSPIRE TOMORROW! ================= */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end space-y-3 text-center lg:text-right">
            <div className="text-xs sm:text-sm font-mono font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-sky-300">
              INNOVATE TODAY, INSPIRE TOMORROW!
            </div>

            {/* 4 Pillars Icons Bar - Responsive (4 on sm+, 4 on mobile) */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 pt-1">
              {/* Pillar 1: Innovate */}
              <div className="flex flex-col items-center space-y-1 group cursor-pointer">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all shadow-md group-hover:bg-amber-400/20 group-hover:border-amber-400 ${
                  isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-100 border-slate-300'
                }`}>
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className={`text-[9px] sm:text-[10px] font-mono font-bold group-hover:text-amber-300 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Innovate
                </span>
              </div>

              {/* Pillar 2: Incubate */}
              <div className="flex flex-col items-center space-y-1 group cursor-pointer">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all shadow-md group-hover:bg-sky-400/20 group-hover:border-sky-400 ${
                  isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-100 border-slate-300'
                }`}>
                  <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className={`text-[9px] sm:text-[10px] font-mono font-bold group-hover:text-sky-300 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Incubate
                </span>
              </div>

              {/* Pillar 3: Inspire */}
              <div className="flex flex-col items-center space-y-1 group cursor-pointer">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all shadow-md group-hover:bg-indigo-400/20 group-hover:border-indigo-400 ${
                  isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-100 border-slate-300'
                }`}>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className={`text-[9px] sm:text-[10px] font-mono font-bold group-hover:text-indigo-500 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Inspire
                </span>
              </div>

              {/* Pillar 4: Impact */}
              <div className="flex flex-col items-center space-y-1 group cursor-pointer">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all shadow-md group-hover:bg-emerald-400/20 group-hover:border-emerald-400 ${
                  isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-100 border-slate-300'
                }`}>
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                </div>
                <span className={`text-[9px] sm:text-[10px] font-mono font-bold group-hover:text-emerald-600 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Impact
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Official Institutional Leadership & Location Strip */}
        <div
          className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl border grid grid-cols-1 md:grid-cols-3 gap-6 items-center reveal delay-2 ${
            isDark ? 'bg-[#0b1a33]/80 border-sky-500/30' : 'bg-white/90 border-sky-300/50'
          }`}
        >
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500 mb-1">
              OFFICE OF THE CEO
            </div>
            <div className={`text-base sm:text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Mr. Ashok Patil
            </div>
            <div className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              CEO, NF Venture Studio — A NAREE Foundation Initiative
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-500 mb-1">
              STUDIO HEADQUARTERS
            </div>
            <div className={`text-xs sm:text-sm leading-relaxed font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Parijatak, Near Nigdi Police Station, Nigdi, Pune – 411044, Maharashtra
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 justify-center md:items-end text-xs font-mono">
            <div className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <span className="text-amber-500">✉️</span>
              <a href="mailto:contact@ncfvs.in" className={`hover:underline ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>contact@ncfvs.in</a>
              <span>·</span>
              <a href="mailto:ncfventurestudio@gmail.com" className={`hover:underline ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>ncfventurestudio@gmail.com</a>
            </div>
            <div className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <span className="text-sky-500">🌐</span>
              <a href="https://www.ncfvs.in" target="_blank" rel="noreferrer" className={`font-bold hover:underline ${isDark ? 'text-sky-300 hover:text-white' : 'text-sky-600 hover:text-sky-800'}`}>www.ncfvs.in</a>
              <span>·</span>
              <span className={`font-bold ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>+91 83798 79846 | +91 9209112577</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright and quick jump */}
        <div className={`pt-3 sm:pt-4 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs gap-2 sm:gap-3 font-mono text-center sm:text-left ${
          isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-300 text-slate-500'
        }`}>
          <div>
            © {new Date().getFullYear()} <strong className={isDark ? 'text-white' : 'text-slate-900'}>NF Venture Studio</strong> • A NAREE Foundation Initiative, Pune. All rights reserved.
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            <button
              onClick={() => onOpenApplication('institutional')}
              className={`hover:underline font-semibold cursor-pointer ${
                isDark ? 'text-amber-400' : 'text-amber-600'
              }`}
            >
              Book Campus Readiness Assessment
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenApplication()}
              className={`font-semibold cursor-pointer transition-colors ${
                isDark ? 'text-slate-400 hover:text-sky-300' : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              Apply Online
            </button>
            <span>•</span>
            <a href="#tracks" className={`font-semibold transition-colors ${
              isDark ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-amber-600'
            }`}>
              3 Tracks
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
