import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NFLogo } from './NFLogo';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageSquare,
  ArrowUp,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  ChevronRight,
} from 'lucide-react';

interface NFFooterProps {
  onOpenApplication: (track?: string) => void;
  isDark?: boolean;
  showScrollTop?: boolean;
  scrollToTop?: () => void;
}

export const NFFooter: React.FC<NFFooterProps> = ({
  onOpenApplication,
  isDark = true,
  showScrollTop = false,
  scrollToTop,
}) => {
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('8379879846');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith('/#')) {
      const hash = href.replace('/', '');
      if (location.pathname === '/') {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(href);
      }
    } else if (href === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else if (href === '#contact') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <footer
      id="contact"
      className={`pt-12 sm:pt-16 pb-8 sm:pb-12 border-t relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#040a14] text-white border-sky-500/20'
          : 'bg-slate-100 text-slate-900 border-slate-300'
      }`}
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12">
          
          {/* ================= COLUMN 1: NF VENTURE STUDIO ================= */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <NFLogo size="md" variant={isDark ? 'light' : 'dark'} />
            </div>

            <div>
              <span
                className={`inline-block text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isDark
                    ? 'bg-amber-400/10 text-amber-300 border-amber-400/30'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                Naree Care Foundation
              </span>
            </div>

            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              A deep-tech incubation ecosystem bridging academia and industry. Transforming campus innovation into commercial breakthroughs and viable, venture-ready enterprises.
            </p>

            <div
              className={`pt-2 flex items-center gap-2 text-xs font-mono ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Incubation Center • Pune</span>
            </div>
          </div>

          {/* ================= COLUMN 2: NAVIGATION ================= */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-amber-400" />
              <h3
                className={`text-xs sm:text-sm font-mono font-black uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Navigation
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/')}
                  className={`group flex items-center gap-2 transition-colors cursor-pointer text-left ${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-sky-400 transition-transform group-hover:translate-x-1" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/about')}
                  className={`group flex items-center gap-2 transition-colors cursor-pointer text-left ${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-sky-400 transition-transform group-hover:translate-x-1" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/team')}
                  className={`group flex items-center gap-2 transition-colors cursor-pointer text-left ${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-sky-400 transition-transform group-hover:translate-x-1" />
                  <span>Our Team</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('#contact')}
                  className={`group flex items-center gap-2 transition-colors cursor-pointer text-left ${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-sky-400 transition-transform group-hover:translate-x-1" />
                  <span>Contact</span>
                </button>
              </li>
              <li className="pt-1.5">
                <button
                  type="button"
                  onClick={() => onOpenApplication('student')}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#081c3b] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-sky-500/20 border border-sky-400/40 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Apply Now</span>
                  <ArrowRight className="w-3 h-3 text-white transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 3: QUICK LINKS ================= */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-sky-400" />
              <h3
                className={`text-xs sm:text-sm font-mono font-black uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Quick Links
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/#tracks')}
                  className={`group flex items-center gap-2 transition-colors cursor-pointer text-left ${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 transition-transform group-hover:translate-x-1" />
                  <span>Incubation Tracks</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/#support')}
                  className={`group flex items-center gap-2 transition-colors cursor-pointer text-left ${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 transition-transform group-hover:translate-x-1" />
                  <span>Lab Infrastructure</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/#architecture')}
                  className={`group flex items-center gap-2 transition-colors cursor-pointer text-left ${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 transition-transform group-hover:translate-x-1" />
                  <span>Venture Architecture</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/#process')}
                  className={`group flex items-center gap-2 transition-colors cursor-pointer text-left ${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 transition-transform group-hover:translate-x-1" />
                  <span>12-Month Rollout</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/#why-ncf')}
                  className={`group flex items-center gap-2 transition-colors cursor-pointer text-left ${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 transition-transform group-hover:translate-x-1" />
                  <span>Accreditation & NIRF</span>
                </button>
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 4: GET IN TOUCH ================= */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-amber-400" />
              <h3
                className={`text-xs sm:text-sm font-mono font-black uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Get in Touch
              </h3>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              {/* Phone */}
              <div className="flex items-start gap-2.5">
                <div
                  className={`p-1.5 rounded-lg border flex-shrink-0 mt-0.5 ${
                    isDark
                      ? 'bg-[#0a1832] border-sky-500/30 text-amber-400'
                      : 'bg-slate-100 border-slate-200 text-amber-600'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider block ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Helpline & Inquiries
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href="tel:8379879846"
                      className={`font-mono font-bold hover:underline safe-wrap ${
                        isDark ? 'text-white hover:text-amber-300' : 'text-slate-900 hover:text-amber-600'
                      }`}
                    >
                      8379879846
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      aria-label="Copy phone number"
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition-colors flex items-center gap-1 cursor-pointer ${
                        isDark
                          ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
                          : 'bg-white border-slate-300 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* CEO Email */}
              <div className="flex items-start gap-2.5">
                <div
                  className={`p-1.5 rounded-lg border flex-shrink-0 mt-0.5 ${
                    isDark
                      ? 'bg-[#0a1832] border-sky-500/30 text-sky-400'
                      : 'bg-slate-100 border-slate-200 text-sky-600'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider block ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Office of the CEO
                  </span>
                  <a
                    href="mailto:ceo@ncfvs.in"
                    className={`font-mono text-xs hover:underline safe-wrap block mt-0.5 ${
                      isDark ? 'text-sky-300 hover:text-white' : 'text-[#0284c7] hover:text-[#0369a1]'
                    }`}
                  >
                    ceo@ncfvs.in
                  </a>
                </div>
              </div>

              {/* Official Address */}
              <div className="flex items-start gap-2.5">
                <div
                  className={`p-1.5 rounded-lg border flex-shrink-0 mt-0.5 ${
                    isDark
                      ? 'bg-[#0a1832] border-sky-500/30 text-amber-400'
                      : 'bg-slate-100 border-slate-200 text-amber-600'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider block ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Studio Headquarters
                  </span>
                  <p
                    className={`text-xs leading-relaxed mt-0.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    Parijatak, Near Nigdi Police Station, Nigdi, Pune – 411044, Maharashtra
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= HORIZONTAL DIVIDER & BOTTOM BAR ================= */}
        <div
          className={`border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-center sm:text-left ${
            isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-300 text-slate-500'
          }`}
        >
          {/* Copyright Text */}
          <div className="safe-wrap">
            © {new Date().getFullYear()} <strong className={isDark ? 'text-white' : 'text-slate-900'}>NF Venture Studio</strong> • A NAREE Care Foundation Initiative. All rights reserved.
          </div>

          {/* Existing Project Social & Direct Channels */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {/* WhatsApp */}
            <a
              href="https://wa.me/918379879846"
              target="_blank"
              rel="noreferrer"
              aria-label="Connect on WhatsApp"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all hover:scale-105 ${
                isDark
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-900/60'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="font-semibold text-[11px]">WhatsApp</span>
            </a>

            {/* Official Website */}
            <a
              href="https://www.ncfvs.in"
              target="_blank"
              rel="noreferrer"
              aria-label="Official Website"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all hover:scale-105 ${
                isDark
                  ? 'bg-sky-950/40 border-sky-500/30 text-sky-300 hover:text-white hover:bg-sky-900/60'
                  : 'bg-sky-50 border-sky-300 text-[#0284c7] hover:bg-sky-100'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-semibold text-[11px]">www.ncfvs.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && scrollToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full shadow-2xl border flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md ${
            isDark
              ? 'bg-[#0b1e3c]/90 text-sky-400 border-sky-400/40 hover:bg-sky-500/20 shadow-sky-950/60'
              : 'bg-white text-[#081c3b] border-slate-300 hover:bg-slate-50 shadow-slate-400/40'
          }`}
          title="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 text-amber-400" />
        </button>
      )}
    </footer>
  );
};
