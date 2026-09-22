import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NFLogo } from './NFLogo';
import {
  Phone,
  Sparkles,
  Menu,
  X,
  ArrowUpRight,
  Sun,
  Moon,
  Home,
  ChevronDown,
  Layers,
  FlaskConical,
  Network,
  Rocket,
  Trophy,
  Info,
  Users,
  MessageSquare,
} from 'lucide-react';

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
  const navigate = useNavigate();
  const location = useLocation();
  const isAboutPage = location.pathname === '/about' || location.pathname === '/about-us';
  const isTeamPage = location.pathname === '/team' || location.pathname === '/our-team';
  const isHomePage = location.pathname === '/' || location.pathname === '/nf-venture-studio' || location.pathname === '/studio';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileHomeExpanded, setMobileHomeExpanded] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);

  const isDark = theme === 'dark';
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setHomeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setHomeDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll-spy: detect which section is active
  useEffect(() => {
    if (!isHomePage) return;

    const sections = ['tracks', 'support', 'architecture', 'process', 'why-ncf', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHomePage]);

  // Sections inside the Home dropdown with clear descriptors for optimum readability
  const homeSections = [
    { name: 'Tracks', desc: '3 Specialized Tracks', href: '#tracks', icon: Layers, tooltip: 'The Three Specialized Tracks' },
    { name: 'Support', desc: '3 Capability Pillars', href: '#support', icon: FlaskConical, tooltip: '3 Institutional Capability Pillars' },
    { name: 'Architecture', desc: '4-Pillar Model', href: '#architecture', icon: Network, tooltip: '4-Pillar Incubation Architecture' },
    { name: 'Rollout', desc: '12-Month Journey', href: '#process', icon: Rocket, tooltip: '12-Month Turnkey Rollout Journey' },
    { name: 'Accreditation', desc: 'NBA · NAAC · NIRF', href: '#why-ncf', icon: Trophy, tooltip: 'NBA · NAAC · IIC · NIRF Alignment' },
  ];

  // Main standalone navigation items
  const mainNavItems = [
    { name: 'About Us', href: '/about', icon: Info, tooltip: 'About NF Venture Studio & Mission' },
    { name: 'Our Team', href: '/team', icon: Users, tooltip: 'Our Leadership & Venture Team' },
    { name: 'Contact', href: '#contact', icon: MessageSquare, tooltip: 'Contact & Executive Office' },
  ];

  const handleNavClick = (href: string) => {
    if (href === '/about' || href === '#about') {
      if (!isAboutPage) {
        navigate('/about');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href === '/team' || href === '/our-team') {
      if (!isTeamPage) {
        navigate('/team');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href === '#' || href === '#home' || href === '/') {
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      return;
    }

    if (href.startsWith('#')) {
      if (isHomePage) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/' + href);
      }
      return;
    }

    navigate(href);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setHomeDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setHomeDropdownOpen(false);
    }, 220);
  };

  const isHomeChildActive = isHomePage && ['tracks', 'support', 'architecture', 'process'].includes(activeSection);
  const isHomeActive = isHomePage && (isHomeChildActive || (activeSection === '' && !scrolled));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isDark
          ? scrolled
            ? 'bg-[#060f1e]/98 backdrop-blur-xl border-b border-sky-500/20 shadow-2xl shadow-sky-950/60 py-2 sm:py-2.5'
            : 'bg-[#060f1e]/95 backdrop-blur-lg border-b border-slate-800/80 py-2.5 sm:py-3.5'
          : scrolled
            ? 'bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-lg py-2 sm:py-2.5'
            : 'bg-white/95 backdrop-blur-lg border-b border-slate-200/80 py-2.5 sm:py-3.5'
      }`}
    >
      {/* Animated Top Laser Beam Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#38bdf8] via-[#f59e0b] to-transparent animate-border-beam" />

      {/* Fluid Full-Width Container */}
      <div className="w-full px-3 sm:px-5 lg:px-6 xl:px-8 2xl:px-10">
        <div className="flex items-center justify-between gap-2 lg:gap-3 xl:gap-4 min-h-14 sm:min-h-16 w-full">

          {/* 1. Left: Brand Logo */}
          <div className="flex-shrink-0 z-20">
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('#'); }} className="flex items-center group py-0.5">
              <NFLogo size="sm" variant={isDark ? 'light' : 'dark'} className="xl:hidden" />
              <NFLogo size="md" variant={isDark ? 'light' : 'dark'} className="hidden xl:inline-flex" />
            </a>
          </div>

          {/* 2. Center: Main Nav Buttons (Home Dropdown, About Us, Our Team, Contact) */}
          <nav className="hidden lg:flex items-center justify-center gap-1.5 xl:gap-2 2xl:gap-3 flex-1 mx-2 xl:mx-4 min-w-0">

            {/* Home with Dropdown */}
            <div
              ref={dropdownRef}
              className="relative inline-flex"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <div className="inline-flex items-center">
                {/* Home Main Button */}
                <button
                  type="button"
                  onClick={() => {
                    handleNavClick('#');
                    setHomeDropdownOpen(false);
                  }}
                  title="Home - Go to Top"
                  className={`h-9 pl-2.5 pr-1.5 xl:pl-3 xl:pr-2 rounded-l-xl text-[11px] xl:text-xs font-bold uppercase tracking-wide xl:tracking-wider transition-all duration-200 inline-flex items-center gap-1.5 shadow-xs border-y border-l cursor-pointer whitespace-nowrap ${
                    isHomeActive
                      ? isDark
                        ? 'bg-gradient-to-br from-sky-500/25 to-amber-500/20 border-sky-400/60 text-white shadow-sky-500/20'
                        : 'bg-gradient-to-br from-sky-100 to-amber-50 border-sky-400 text-[#0369a1] shadow-sky-200/60'
                      : isDark
                        ? 'bg-[#0d2247]/80 text-slate-200 border-sky-500/25 hover:border-amber-400 hover:text-white hover:bg-sky-500/20'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-[#0284c7] hover:text-[#0284c7] hover:bg-sky-50'
                  }`}
                >
                  <Home className={`w-3.5 h-3.5 flex-shrink-0 ${isHomeActive ? 'text-amber-400' : isDark ? 'text-amber-400' : 'text-[#0284c7]'}`} />
                  <span>Home</span>
                </button>

                {/* Dropdown Toggle Chevron Button */}
                <button
                  type="button"
                  onClick={() => setHomeDropdownOpen(!homeDropdownOpen)}
                  title="View Home Sections"
                  aria-label="Toggle Home Sections Dropdown"
                  aria-expanded={homeDropdownOpen}
                  className={`h-9 px-1.5 xl:px-2 rounded-r-xl transition-all duration-200 inline-flex items-center justify-center border shadow-xs cursor-pointer ${
                    homeDropdownOpen || isHomeActive
                      ? isDark
                        ? 'bg-gradient-to-br from-sky-500/25 to-amber-500/20 border-sky-400/60 text-amber-300'
                        : 'bg-gradient-to-br from-sky-100 to-amber-50 border-sky-400 text-[#0369a1]'
                      : isDark
                        ? 'bg-[#0d2247]/80 text-slate-300 border-sky-500/25 hover:border-amber-400 hover:text-white hover:bg-sky-500/20'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-[#0284c7] hover:text-[#0284c7] hover:bg-sky-50'
                  }`}
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${homeDropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
              </div>

              {/* Solid, High-Contrast, Perfectly Layered Dropdown Menu */}
              {homeDropdownOpen && (
                <div
                  className={`absolute top-[calc(100%+8px)] left-0 w-72 sm:w-80 rounded-2xl border-2 p-2 shadow-2xl z-[100] transition-all animate-fadeIn ${
                    isDark
                      ? 'bg-[#071328] border-sky-400/50 shadow-[0_20px_60px_rgba(0,0,0,0.95)] ring-1 ring-sky-400/30 text-white'
                      : 'bg-white border-slate-300 shadow-[0_20px_60px_rgba(0,0,0,0.2)] ring-1 ring-slate-200 text-slate-900'
                  }`}
                >
                  {/* Invisible Hover Bridge to prevent premature closing */}
                  <div className="absolute -top-2 left-0 right-0 h-2" />

                  {/* Dropdown Header */}
                  <div className={`px-3 py-2 mb-2 flex items-center justify-between rounded-xl border text-[11px] font-mono font-bold uppercase tracking-wider ${
                    isDark
                      ? 'bg-[#0b1c3b] border-sky-500/30 text-sky-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span>Home Sections</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                      isDark ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-sky-100 text-[#0284c7] border border-sky-200'
                    }`}>
                      5 Key Areas
                    </span>
                  </div>

                  {/* 5 Distinct, High-Legibility Options */}
                  <div className="space-y-1.5">
                    {homeSections.map((item) => {
                      const Icon = item.icon;
                      const sectionId = item.href.replace('#', '');
                      const isItemActive = isHomePage && activeSection === sectionId;
                      return (
                        <button
                          type="button"
                          key={item.name}
                          onClick={() => {
                            setHomeDropdownOpen(false);
                            handleNavClick(item.href);
                          }}
                          title={item.tooltip}
                          className={`w-full p-2 rounded-xl text-left transition-all duration-150 flex items-center justify-between gap-2.5 cursor-pointer group border ${
                            isItemActive
                              ? isDark
                                ? 'bg-gradient-to-r from-sky-600/35 via-sky-500/25 to-amber-500/20 border-amber-400 text-white shadow-md shadow-sky-500/20'
                                : 'bg-sky-100 border-sky-400 text-[#0369a1] shadow-sm'
                              : isDark
                                ? 'bg-[#0c1f3d] hover:bg-[#132f5e] border-sky-500/20 hover:border-amber-400/60 text-slate-100 hover:text-white shadow-xs'
                                : 'bg-slate-50 hover:bg-sky-50 border-slate-200 hover:border-sky-300 text-slate-800 hover:text-[#0284c7] shadow-xs'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            {/* Icon Container */}
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors border ${
                              isItemActive
                                ? 'bg-amber-400/25 border-amber-400/50 text-amber-300'
                                : isDark
                                  ? 'bg-[#071328] border-sky-500/30 text-amber-400 group-hover:border-amber-400'
                                  : 'bg-white border-slate-200 text-[#0284c7] group-hover:border-sky-300'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>

                            {/* Title and Descriptor */}
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs sm:text-[13px] font-black uppercase tracking-wide truncate leading-tight">
                                {item.name}
                              </span>
                              <span className={`text-[10px] font-mono leading-tight truncate mt-0.5 ${
                                isItemActive
                                  ? isDark ? 'text-amber-300 font-semibold' : 'text-[#0369a1] font-semibold'
                                  : isDark ? 'text-slate-300 group-hover:text-slate-200' : 'text-slate-500 group-hover:text-slate-700'
                              }`}>
                                {item.desc}
                              </span>
                            </div>
                          </div>

                          {/* Target Tag / Arrow */}
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <span className={`text-[10px] font-mono opacity-60 group-hover:opacity-100 transition-opacity ${
                              isDark ? 'text-sky-300' : 'text-slate-500'
                            }`}>
                              {item.href}
                            </span>
                            <ArrowUpRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                              isItemActive
                                ? 'text-amber-400'
                                : isDark ? 'text-slate-400 group-hover:text-amber-400' : 'text-slate-400 group-hover:text-[#0284c7]'
                            }`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Standalone Items: About Us, Our Team, Contact */}
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = (item.name === 'About Us' && isAboutPage) ||
                               (item.name === 'Our Team' && isTeamPage) ||
                               (item.name === 'Contact' && activeSection === 'contact' && isHomePage);
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  title={item.tooltip}
                  className={`h-9 px-2 lg:px-2.5 xl:px-3 2xl:px-3.5 rounded-xl text-[11px] xl:text-xs font-bold uppercase tracking-wide xl:tracking-wider transition-all duration-200 inline-flex items-center gap-1 xl:gap-1.5 shadow-xs border hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap flex-shrink min-w-0 ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-br from-sky-500/20 to-amber-500/15 border-sky-400/50 text-white shadow-sky-500/20'
                        : 'bg-gradient-to-br from-sky-100 to-amber-50 border-sky-400 text-[#0369a1] shadow-sky-200/60'
                      : isDark
                        ? 'bg-[#0d2247]/80 text-slate-200 border-sky-500/25 hover:border-amber-400 hover:text-white hover:bg-sky-500/20 hover:shadow-sky-500/10'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-[#0284c7] hover:text-[#0284c7] hover:bg-sky-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-amber-400' : isDark ? 'text-amber-400' : 'text-[#0284c7]'}`} />
                  <span className="truncate">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* 3. Right: Action Buttons (Helpline, Apply Now, Theme Toggle) */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 flex-shrink-0 z-20">

            {/* Helpline Phone Button */}
            <a
              href="tel:8379879846"
              className="hidden md:inline-flex items-center gap-1.5 h-9 px-2.5 xl:px-3.5 rounded-xl font-mono text-[11px] xl:text-xs font-bold text-[#081c3b] bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] shadow-md hover:shadow-amber-500/30 border border-amber-300 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0"
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
              title="Apply for Incubation Center"
              className="h-9 px-2.5 sm:px-3 xl:px-4 rounded-xl font-black text-[11px] xl:text-xs uppercase tracking-wide xl:tracking-wider text-white bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#081c3b] hover:from-[#0ea5e9] hover:to-[#0284c7] shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 border border-sky-400/50 transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-1 xl:gap-1.5 whitespace-nowrap flex-shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-45 transition-transform flex-shrink-0" />
              <span className="hidden 2xl:inline">Apply for Incubation Center</span>
              <span className="2xl:hidden">Apply Now</span>
              <ArrowUpRight className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0 hidden sm:inline-block" />
            </button>

            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`h-9 w-9 rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center shadow-md cursor-pointer flex-shrink-0 ${
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

            {/* Mobile/Tablet Hamburger Button (< 1024px) */}
            <div className="lg:hidden inline-flex items-center flex-shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`h-9 w-9 rounded-xl border focus:outline-none transition-colors inline-flex items-center justify-center cursor-pointer ${
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
          className={`lg:hidden border-b px-4 sm:px-6 pt-3 pb-5 space-y-3.5 shadow-2xl animate-fadeIn max-h-[calc(100vh-64px)] overflow-y-auto ${
            isDark ? 'bg-[#060f1e] border-sky-500/30' : 'bg-white border-slate-200'
          }`}
        >
          <div className={`flex items-center justify-between gap-2 py-1.5 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <span className={`text-xs font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              ● Incubation Portal Active
            </span>
            <span className="text-[10px] uppercase font-mono font-bold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded border border-amber-400/30">
              Menu
            </span>
          </div>

          {/* Home Section with Clean Accordion/Dropdown in Mobile */}
          <div className={`rounded-2xl border-2 overflow-hidden transition-all ${
            isDark ? 'bg-[#08162d] border-sky-500/40' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between p-1.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('#');
                }}
                className={`flex-1 flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wide text-left transition-all cursor-pointer ${
                  isDark ? 'text-white hover:bg-sky-500/20' : 'text-[#081c3b] hover:bg-sky-100'
                }`}
              >
                <Home className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-[#0284c7]'}`} />
                <span>Home</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileHomeExpanded(!mobileHomeExpanded)}
                aria-label="Toggle Home Submenu"
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-[#0284c7] hover:bg-slate-200'
                }`}
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileHomeExpanded ? 'rotate-180 text-amber-400' : ''}`} />
              </button>
            </div>

            {/* Dropdown Items under Home */}
            {mobileHomeExpanded && (
              <div className={`px-2.5 pb-2.5 pt-1.5 space-y-1.5 border-t ${
                isDark ? 'border-slate-800 bg-[#061022]' : 'border-slate-200 bg-white'
              }`}>
                <div className="text-[10px] font-mono uppercase font-bold text-amber-400 px-1 pt-0.5">
                  Home Sections:
                </div>
                <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-1.5">
                  {homeSections.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        type="button"
                        key={item.name}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleNavClick(item.href);
                        }}
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold uppercase tracking-wide border text-left transition-all cursor-pointer min-w-0 ${
                          isDark
                            ? 'bg-[#0d2247] border-sky-500/30 text-white hover:bg-sky-500/25 hover:border-amber-400'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-sky-50 hover:border-sky-400 hover:text-sky-600'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-[#0284c7]'}`} />
                        <div className="flex flex-col min-w-0">
                          <span className="truncate">{item.name}</span>
                          <span className={`text-[9px] font-mono font-normal truncate ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                            {item.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Standalone Items: About Us, Our Team, Contact */}
          <div className="grid grid-cols-1 min-[380px]:grid-cols-3 gap-2">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isItemActive = (item.name === 'About Us' && isAboutPage) ||
                                  (item.name === 'Our Team' && isTeamPage) ||
                                  (item.name === 'Contact' && activeSection === 'contact' && isHomePage);
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick(item.href);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold uppercase tracking-wide border text-left transition-all cursor-pointer min-w-0 ${
                    isItemActive
                      ? isDark
                        ? 'bg-gradient-to-br from-sky-500/30 to-amber-500/20 border-amber-400 text-white shadow-xs'
                        : 'bg-sky-100 border-sky-400 text-[#0284c7] shadow-xs'
                      : isDark
                        ? 'bg-[#0d2247] border-sky-500/30 text-slate-100 hover:bg-sky-500/20 hover:border-sky-400 hover:text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-400 hover:text-sky-600'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isItemActive ? 'text-amber-400' : isDark ? 'text-amber-400' : 'text-[#0284c7]'}`} />
                  <span className="truncate">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Helpline and Apply Now in Mobile Drawer */}
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
              <span>Apply for Incubation Center</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
