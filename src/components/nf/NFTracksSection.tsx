import React, { useState } from 'react';
import { GraduationCap, Award, UserCheck, CheckCircle2, ArrowUpRight, Sparkles, Rocket, Zap, BarChart3 } from 'lucide-react';

interface NFTracksSectionProps {
  onOpenApplication: (track: string) => void;
  isDark?: boolean;
}

export const NFTracksSection: React.FC<NFTracksSectionProps> = ({
  onOpenApplication,
  isDark = true,
}) => {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  const tracks = [
    {
      id: 'student',
      number: '01',
      title: 'STUDENT STARTUP TRACK',
      targetGroup: 'Target group: Undergraduate & Postgraduate students, campus innovators, and E-Cell members.',
      icon: GraduationCap,
      avatarBg: 'from-[#f59e0b] to-[#ea580c]',
      borderGlow: 'hover:border-amber-400/80',
      activeBorder: 'border-amber-400/80',
      glowColor: 'rgba(245,158,11,0.15)',
      bullets: [
        'E-Cells revitalisation & calendarised hackathons / bootcamps',
        '3–6 month structured pre-incubation cohorts',
        'Proof-of-Concept (PoC) micro-grants & prototype access',
        'AI / IoT / hardware workstation lab support',
        'Founder mentorship & investor demo days',
      ],
      highlight: 'From College Idea to Scalable Startup',
      badgeText: 'UG/PG_COHORTS',
      ctaText: 'Apply as Student Innovator',
      stat: '250+',
      statLabel: 'Students Engaged',
    },
    {
      id: 'faculty',
      number: '02',
      title: 'FACULTY & RESEARCHER TRACK',
      targetGroup: 'Target group: Professors, research scholars, and departmental lab leads.',
      icon: Award,
      avatarBg: 'from-[#0284c7] to-[#0369a1]',
      borderGlow: 'hover:border-sky-400/80',
      activeBorder: 'border-sky-400/80',
      glowColor: 'rgba(56,189,248,0.15)',
      bullets: [
        'Research-to-venture roadmaps & deep-tech commercialisation',
        'AICTE-NISP compliant institutional IP & equity-sharing policy',
        'Collaborative research & grant readiness (NIDHI, BIRAC, MSME, MeitY)',
        'End-to-end patent drafting, filing & Technology Transfer Office (TTO)',
        'Spin-off governance maintaining academic work-life balance',
      ],
      highlight: 'Commercialise Deep-Tech Patents & Research',
      badgeText: 'RESEARCH_TO_VENTURE',
      ctaText: 'Commercialize Faculty Research',
      stat: '10–20+',
      statLabel: 'IP Filings / Year',
    },
    {
      id: 'external',
      number: '03',
      title: 'INDIVIDUAL & OPEN TRACK',
      targetGroup: 'Target group: Alumni, grassroots founders, and independent early-stage entrepreneurs.',
      icon: UserCheck,
      avatarBg: 'from-[#6366f1] to-[#4338ca]',
      borderGlow: 'hover:border-indigo-400/80',
      activeBorder: 'border-indigo-400/80',
      glowColor: 'rgba(99,102,241,0.15)',
      bullets: [
        'Dedicated physical (500–2,000+ sq. ft.) & virtual co-working zones',
        'Dev-for-Equity & rapid MVP engineering sprints',
        'Go-to-Market (GTM) acceleration with corporate pilots',
        'Curated CXO & operator mentorship networks',
        'Investor demo days, angel & micro-VC syndication',
      ],
      highlight: 'Grassroots & Alumni to Investable Enterprises',
      badgeText: 'DEV_FOR_EQUITY',
      ctaText: 'Join as Solo Founder',
      stat: '₹3Cr+',
      statLabel: 'Grant Pipeline',
    },
  ];

  return (
    <section
      id="tracks"
      className={`py-16 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#081528] border-sky-500/20' : 'bg-white border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header Pill */}
        <div className="flex justify-center mb-12 reveal">
          <div
            className={`inline-flex items-center gap-3 px-8 py-3 rounded-full shadow-2xl border-2 backdrop-blur-md ${
              isDark
                ? 'bg-[#0b1e3c] text-white border-sky-400/40'
                : 'bg-slate-50 text-[#081c3b] border-slate-300 shadow-md'
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
              THE THREE SPECIALIZED TRACKS
            </h2>
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
          </div>
        </div>

        {/* 3 High-Tech Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch reveal-stagger">
          {tracks.map((track) => {
            const Icon = track.icon;
            const isHovered = hoveredTrack === track.id;
            return (
              <div
                key={track.id}
                onMouseEnter={() => setHoveredTrack(track.id)}
                onMouseLeave={() => setHoveredTrack(null)}
                className={`group relative flex flex-col justify-between glass-card rounded-2xl border shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden glass-card-hover ${track.borderGlow} ${
                  isDark ? 'border-sky-500/30' : 'border-slate-200 bg-white'
                }`}
                style={{
                  boxShadow: isHovered
                    ? `0 20px 40px -10px ${track.glowColor}, 0 0 30px ${track.glowColor}`
                    : undefined,
                }}
              >
                {/* Top Glowing Laser Accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#f59e0b] via-[#38bdf8] to-[#0284c7] animate-border-beam" />

                {/* Stat badge top-right */}
                <div className={`absolute top-5 right-5 text-right ${isHovered ? 'animate-scale-in' : ''}`}>
                  <div className={`text-lg font-black font-mono stat-number ${
                    isDark ? 'text-amber-400' : 'text-amber-600'
                  }`}>
                    {track.stat}
                  </div>
                  <div className={`text-[9px] font-mono font-bold uppercase ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {track.statLabel}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col">

                  {/* Header Row: Track Number & Icon */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg bg-gradient-to-br ${track.avatarBg} text-white transition-all group-hover:scale-110 group-hover:rotate-3 border border-white/20`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <div>
                      <span
                        className={`text-2xl font-black font-mono transition-colors ${
                          isDark
                            ? 'text-slate-600 group-hover:text-sky-400'
                            : 'text-slate-300 group-hover:text-[#0284c7]'
                        }`}
                      >
                        #{track.number}
                      </span>
                      <div className="mt-1">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                            isDark
                              ? 'text-sky-300 bg-sky-500/15 border-sky-500/30'
                              : 'text-[#0284c7] bg-sky-50 border-sky-200'
                          }`}
                        >
                          {track.badgeText}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Target Group */}
                  <div className="mb-4">
                    <h3
                      className={`text-base sm:text-lg font-black tracking-tight uppercase leading-snug transition-colors ${
                        isDark ? 'text-white group-hover:text-sky-300' : 'text-[#081c3b] group-hover:text-[#0284c7]'
                      }`}
                    >
                      {track.title}
                    </h3>

                    <div
                      className={`mt-2 p-2 rounded-lg border ${
                        isDark ? 'bg-slate-900/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span
                        className={`text-[11px] font-medium leading-tight block ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {track.targetGroup}
                      </span>
                    </div>
                  </div>

                  {/* Bullet Points with Cyber Gold Checkmarks */}
                  <div className="my-3 flex-1 space-y-3">
                    {track.bullets.map((bullet, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2.5 text-xs sm:text-sm font-medium leading-relaxed transition-all ${
                          isDark ? 'text-slate-200' : 'text-slate-700'
                        }`}
                        style={{ transitionDelay: `${idx * 40}ms` }}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all group-hover:scale-110 ${
                            isDark
                              ? 'bg-amber-400/20 border-amber-400/50'
                              : 'bg-amber-100 border-amber-300'
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isDark ? 'text-amber-300' : 'text-amber-600'}`} />
                        </div>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Highlight Strip */}
                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
                      isDark ? 'border-slate-800' : 'border-slate-200'
                    }`}
                  >
                    <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      {track.highlight}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${
                        isDark
                          ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30'
                          : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      }`}
                    >
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* Card Button */}
                <div className={`p-4 border-t ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <button
                    onClick={() => onOpenApplication(track.id)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#0284c7] to-[#081c3b] hover:from-[#0ea5e9] hover:to-[#0284c7] border border-sky-400/40 hover:border-amber-400/60 transition-all flex items-center justify-center gap-2 shadow-md group/btn cursor-pointer btn-neon-blue"
                  >
                    <span>{track.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 text-amber-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
