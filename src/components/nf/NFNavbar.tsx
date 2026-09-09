import React, { useState, useEffect } from 'react';
import { NFLogo } from './NFLogo';
import { Phone, Sparkles, Menu, X, ArrowUpRight, Sun, Moon, Layers, FlaskConical, Network, Rocket, Trophy, MessageSquare } from 'lucide-react';

interface NFNavbarProps {
  onOpenApplication: (track?: string) => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const NFNavbar: React.FC<NFNavbarProps> = ({
  onOpenApplication,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navButtons = [
    { name: 'Tracks', href: '#tracks', icon: Layers, tooltip: 'The Three Specialized Tracks' },
    { name: 'Support', href: '#support', icon: FlaskConical, tooltip: '3 Institutional Capability Pillars' },
    { name: 'Architecture', href: '#architecture', icon: Network, tooltip: '4-Pillar Incubation Architecture' },
    { name: 'Rollout', href: '#process', icon: Rocket, tooltip: '12-Month Turnkey Rollout Journey' },
    { name: 'Accreditation', href: '#why-ncf', icon: Trophy, tooltip: 'NBA · NAAC · IIC · NIRF Alignment' },
    { name: 'Contact', href: '#contact', icon: MessageSquare, tooltip: 'Contact & Executive Office' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isDark
          ? scrolled
            ? 'bg-[#060f1e]/98 backdrop-blur-xl border-b border-sky-500/20 shadow-2xl shadow-sky-950/60 py-2 sm:py-2.5'
            : 'bg-[#060f1e]/90 backdrop-blur-md border-b border-slate-800 py-2.5 sm:py-3.5'
          : scrolled
            ? 'bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-md py-2 sm:py-2.5'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-2.5 sm:py-3.5'
      }`}
    >
      {/* Animated Top Laser Beam Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#38bdf8] via-[#f59e0b] to-transparent animate-border-beam" />

      {/* Fluid Full-Width Container: Utilizes horizontal space properly with balanced edge padding */}
      <div className="w-full px-3 sm:px-5 lg:px-6 xl:px-8 2xl:px-10">
        <div className="flex items-center justify-between gap-2 lg:gap-3 xl:gap-4 h-14 sm:h-16 w-full">
          
          {/* 1. Left: Brand Logo - Docked to left edge with clean padding, eliminating the empty void */}
          <div className="flex-shrink-0 z-20">
            <a href="#" className="flex items-center group py-0.5">
              <NFLogo size="sm" variant={isDark ? 'light' : 'dark'} className="xl:hidden" />
              <NFLogo size="md" variant={isDark ? 'light' : 'dark'} className="hidden xl:inline-flex" />
            </a>
          </div>

          {/* 2. Center: Nav Buttons - Perfectly centered, evenly spaced, strictly in ONE line */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-1.5 2xl:gap-2 flex-1 mx-2 xl:mx-4">
            {navButtons.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  title={item.tooltip}
                  className={`h-8.5 xl:h-9 px-2 lg:px-2.5 xl:px-3 2xl:px-3.5 rounded-xl text-[10.5px] lg:text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-all duration-200 inline-flex items-center gap-1 xl:gap-1.5 shadow-xs border hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                    isDark
                      ? 'bg-[#0d2247]/80 text-slate-200 border-sky-500/25 hover:border-amber-400 hover:text-white hover:bg-sky-500/20 hover:shadow-sky-500/10'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-[#0284c7] hover:text-[#0284c7] hover:bg-sky-50'
                  }`}
                >
                  <Icon className={`w-3 h-3 xl:w-3.5 xl:h-3.5 flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-[#0284c7]'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* 3. Right: Action Buttons - Docked to right edge */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 flex-shrink-0 z-20">
            
            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`h-8.5 w-8.5 xl:h-9 xl:w-9 rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center shadow-md cursor-pointer flex-shrink-0 ${
                  isDark
                    ? 'bg-[#0b1e3c] border-amber-400/50 text-amber-300 hover:bg-[#112a55] hover:border-amber-400 shadow-amber-500/10'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-[#0284c7] hover:border-[#0284c7]'
                }`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Website Theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className="w-4 h-4 text-[#0284c7]" />
                )}
              </button>
            )}

            {/* Helpline Phone Button */}
            <a
              href="tel:8379879846"
              className="hidden md:inline-flex items-center gap-1.5 h-8.5 xl:h-9 px-2.5 xl:px-3.5 rounded-xl font-mono text-[11px] xl:text-xs font-bold text-[#081c3b] bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] shadow-md hover:shadow-amber-500/30 border border-amber-300 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0"
              title="Call Helpline: 8379879846"
            >
              <div className="w-3.5 h-3.5 xl:w-4 xl:h-4 rounded-md bg-[#081c3b]/15 flex items-center justify-center flex-shrink-0">
                <Phone className="w-2.5 h-2.5 xl:w-3 xl:h-3 text-[#081c3b]" />
              </div>
              <span className="tracking-wider">8379879846</span>
            </a>

            {/* Apply Now Button */}
            <button
              type="button"
              onClick={() => onOpenApplication()}
              className="h-8.5 xl:h-9 px-3 xl:px-4 rounded-xl font-black text-[11px] xl:text-xs uppercase tracking-wider xl:tracking-widest text-white bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#081c3b] hover:from-[#0ea5e9] hover:to-[#0284c7] shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 border border-sky-400/50 transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-1 xl:gap-1.5 whitespace-nowrap flex-shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-amber-300 group-hover:rotate-45 transition-transform flex-shrink-0" />
              <span>Apply Now</span>
              <ArrowUpRight className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0 hidden sm:inline-block" />
            </button>

            {/* Mobile/Tablet Hamburger Button (< 1024px) */}
            <div className="lg:hidden inline-flex items-center flex-shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`h-8.5 w-8.5 rounded-xl border focus:outline-none transition-colors inline-flex items-center justify-center cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-[#081c3b]'
                }`}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 text-amber-400" /> : <Menu className="w-4 h-4 text-sky-400" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile/Tablet Drawer Menu (< 1024px) */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 sm:px-6 pt-3 pb-5 space-y-3.5 shadow-2xl animate-fadeIn ${
            isDark ? 'bg-[#0a162b]/98 backdrop-blur-2xl border-sky-500/30' : 'bg-white/98 backdrop-blur-2xl border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
            <span className={`text-xs font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              ● Incubation Portal Active
            </span>
            <span className="text-[10px] uppercase font-mono font-bold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded border border-amber-400/30">
              Menu
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navButtons.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick(item.href);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border text-left transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-sky-500/20 hover:border-sky-400 hover:text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-400 hover:text-sky-600'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-[#0284c7]'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="tel:8379879846"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-[#081c3b] font-black text-xs shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Helpline: 8379879846
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApplication();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#081c3b] text-white text-xs font-black uppercase tracking-wider shadow-lg border border-sky-400/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Submit Incubation Application</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
