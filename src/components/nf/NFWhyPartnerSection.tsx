import React, { useState } from 'react';
import { Trophy, Settings2, GitPullRequest, ArrowRight, CheckCircle2, TrendingUp, Award, FileCheck2, ShieldCheck, Sparkles, Calendar, Users, Layers, IndianRupee } from 'lucide-react';

interface NFWhyPartnerSectionProps {
  onOpenApplication: (track?: string) => void;
  isDark?: boolean;
}

export const NFWhyPartnerSection: React.FC<NFWhyPartnerSectionProps> = ({
  onOpenApplication,
  isDark = true,
}) => {
  const [activeAccreditation, setActiveAccreditation] = useState<'ALL' | 'NAAC' | 'NBA' | 'IIC' | 'NIRF'>('ALL');

  const reasons = [
    {
      number: '01',
      title: 'BOOST INSTITUTIONAL RANKINGS',
      description:
        'Improve NIRF, NAAC, NBA, and IIC scores through recognized, audit-ready evidence portfolios for patents, student startups, and industry R&D.',
      icon: Trophy,
      avatarBg: 'from-amber-500/20 to-amber-600/10 border-amber-400/40 text-amber-500',
      tag: 'NIRF · NAAC · NBA ALIGNED',
      badgeText: 'Rankings Booster',
    },
    {
      number: '02',
      title: 'TURNKEY DAY-ZERO MANAGEMENT',
      description:
        'Provides end-to-end operational execution — from physical space design to mentor matching, Digital ERP tracking, and compliance dossiers with zero burden on faculty.',
      icon: Settings2,
      avatarBg: 'from-sky-500/20 to-sky-600/10 border-sky-400/40 text-sky-500',
      tag: 'ZERO OPERATIONAL BURDEN',
      badgeText: 'Turnkey Protocols',
    },
    {
      number: '03',
      title: 'INDUSTRY & CAPITAL CONNECT',
      description:
        'Bridges the gap between academic research and commercial markets with CXO operators, corporate pilots, angel syndicates, and government grant pipelines.',
      icon: GitPullRequest,
      avatarBg: 'from-indigo-500/20 to-indigo-600/10 border-indigo-400/40 text-indigo-500',
      tag: 'FROM LAB TO MARKET',
      badgeText: 'Market Validation',
    },
  ];

  const accreditationData = [
    {
      id: 'NAAC',
      body: 'NAAC',
      badge: 'Criterion 3',
      criteria: 'Criterion 3 – Research, Innovations & Extension (KI 3.1, 3.2, 3.3 — Innovation Ecosystem)',
      evidence: 'Ecosystem-activation dossiers, incubation operating handbooks, calendarised E-Cell activity logs, MoU registers, and AQAR-aligned quarterly data.',
      color: isDark ? 'border-sky-500/40 text-sky-300 bg-sky-950/40' : 'border-sky-300 text-[#0284c7] bg-sky-50',
    },
    {
      id: 'NBA',
      body: 'NBA (Tier-I & II SAR)',
      badge: 'SAR Evidence',
      criteria: 'SAR clauses 3.3 (industry interaction & internship), 4.5.4 (entrepreneurship), 5.5–5.8 (faculty IPR & funded R&D), 7.6 (innovative projects), 7.7.3 (E-Cell & incubation), 9.5 (continuous improvement)',
      evidence: 'Audit-ready evidence packs per SAR clause; internship matchmaking; hackathon & PoC grant records; patent filing registers; faculty-output dashboards.',
      color: isDark ? 'border-amber-500/40 text-amber-300 bg-amber-950/40' : 'border-amber-300 text-amber-800 bg-amber-50',
    },
    {
      id: 'IIC',
      body: 'IIC (MoE–MIC)',
      badge: 'Star Ratings',
      criteria: 'Mandated quarterly activity themes, innovation calendar execution, and annual Star Ratings',
      evidence: 'Calendarised execution packs, IPR clinics, mini-challenges, documented industry participation, and MIC portal reporting support.',
      color: isDark ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40' : 'border-emerald-300 text-emerald-800 bg-emerald-50',
    },
    {
      id: 'AICTE',
      body: 'AICTE / NISP',
      badge: 'Policy Adoption',
      criteria: 'National Innovation & Startup Policy (NISP) implementation & governance',
      evidence: 'Institutional startup-policy drafting, IP governance committees, board charters, and equity-sharing policy frameworks.',
      color: isDark ? 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40' : 'border-cyan-300 text-cyan-800 bg-cyan-50',
    },
    {
      id: 'NIRF',
      body: 'NIRF / ARIIA',
      badge: 'NIRF-Innovation',
      criteria: 'RP (Research & Professional Practice), GO (Graduation Outcomes), OI (Outreach & Inclusivity); Innovation Achievements (IA) parameters',
      evidence: 'Patents filed/granted, student & faculty startups, funded projects, publications and industry engagement records — objective metric calibration.',
      color: isDark ? 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40' : 'border-indigo-300 text-indigo-800 bg-indigo-50',
    },
  ];

  const filteredAccreditation = activeAccreditation === 'ALL'
    ? accreditationData
    : accreditationData.filter(item => item.id === activeAccreditation || (activeAccreditation === 'NIRF' && item.id === 'AICTE'));

  return (
    <section
      id="why-ncf"
      className={`py-16 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#060f1e] border-sky-500/20' : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section 1: Why Partner With NCF Top Header & Cards */}
        <div>
          <div className="flex justify-center mb-10">
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
                WHY PARTNER WITH NF VENTURE STUDIO?
              </h2>
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {reasons.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`group relative flex flex-col justify-between glass-card rounded-2xl border hover:border-amber-400 shadow-xl transition-all duration-300 overflow-hidden glass-card-hover ${
                    isDark ? 'border-sky-500/30' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="p-6 sm:p-7 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl border bg-gradient-to-br ${item.avatarBg} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      <div className="text-right font-mono">
                        <span
                          className={`text-2xl font-black transition-colors ${
                            isDark
                              ? 'text-slate-400 group-hover:text-amber-400'
                              : 'text-slate-300 group-hover:text-amber-600'
                          }`}
                        >
                          #{item.number}
                        </span>
                        <div className="mt-1">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                              isDark
                                ? 'text-amber-300 bg-amber-400/15 border-amber-400/30'
                                : 'text-amber-800 bg-amber-50 border-amber-200'
                            }`}
                          >
                            {item.badgeText}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3
                      className={`text-base sm:text-lg font-black tracking-tight uppercase leading-snug mb-2 transition-colors ${
                        isDark ? 'text-white group-hover:text-sky-300' : 'text-[#081c3b] group-hover:text-[#0284c7]'
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p className={`text-xs sm:text-sm font-medium leading-relaxed my-2 flex-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {item.description}
                    </p>

                    <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
                      isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                    }`}>
                      <span className={`font-mono text-[11px] font-bold ${isDark ? 'text-sky-400' : 'text-[#0284c7]'}`}>
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <div className={`p-4 border-t ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <button
                      onClick={() => onOpenApplication('institutional')}
                      className={`w-full py-2.5 px-3 text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer border ${
                        isDark
                          ? 'text-white bg-slate-900 hover:bg-sky-600/30 border-sky-500/30 hover:border-amber-400/50'
                          : 'text-[#081c3b] bg-white hover:bg-sky-50 border-slate-200 shadow-xs'
                      }`}
                    >
                      <span>Explore Institutional Model</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Accreditation & Ranking Evidence Matrix (From Proposal Page 2-3) */}
        <div
          className={`p-6 sm:p-8 rounded-3xl glass-card border shadow-2xl relative overflow-hidden ${
            isDark ? 'border-sky-500/30' : 'border-slate-200 bg-white'
          }`}
        >
          <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-mono font-bold mb-2 ${
                  isDark
                    ? 'bg-sky-500/10 border-sky-400/30 text-sky-300'
                    : 'bg-sky-50 border-sky-200 text-[#0284c7]'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5 text-amber-500" />
                <span>HOW YOUR ACCREDITATION JOURNEY BENEFITS</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${
                isDark ? 'text-white' : 'text-[#081c3b]'
              }`}>
                Accreditation & Audit-Ready Evidence Matrix
              </h3>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Concrete documentation and tangible outputs generated directly by NF Venture Studio for your institution.
              </p>
            </div>

            {/* Filter Pills */}
            <div className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              {(['ALL', 'NAAC', 'NBA', 'IIC', 'NIRF'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveAccreditation(filter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeAccreditation === filter
                      ? 'bg-gradient-to-r from-sky-500 to-amber-500 text-[#081c3b] shadow-md'
                      : isDark
                      ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                      : 'text-slate-600 hover:text-[#081c3b] hover:bg-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-6">
            {filteredAccreditation.map((row, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800 hover:border-sky-500/40'
                    : 'bg-slate-50/80 border-slate-200 hover:border-sky-400 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`font-mono font-black text-sm tracking-wide ${
                      isDark ? 'text-white' : 'text-[#081c3b]'
                    }`}>
                      {row.body}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${row.color}`}>
                      {row.badge}
                    </span>
                  </div>

                  <div className="mb-3">
                    <span className={`text-[11px] font-mono uppercase font-bold block mb-1 ${
                      isDark ? 'text-amber-400' : 'text-amber-800'
                    }`}>
                      Criteria / Indicators Addressed:
                    </span>
                    <p className={`text-xs font-medium leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      {row.criteria}
                    </p>
                  </div>
                </div>

                <div className={`pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
                  <span className={`text-[11px] font-mono uppercase font-bold block mb-1 ${
                    isDark ? 'text-sky-400' : 'text-[#0284c7]'
                  }`}>
                    Evidence NF Venture Studio Supplies:
                  </span>
                  <p className={`text-xs leading-relaxed font-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {row.evidence}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Indicative Annual & Year-2 Milestones (From Proposal Page 3 & Brochure Section E) */}
        <div
          className={`p-6 sm:p-8 rounded-3xl glass-card-gold border shadow-2xl relative overflow-hidden ${
            isDark ? 'border-amber-500/30' : 'border-amber-200 bg-amber-50/30'
          }`}
        >
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b ${
            isDark ? 'border-slate-800' : 'border-amber-200/80'
          }`}>
            <div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-mono font-bold mb-1.5 ${
                  isDark
                    ? 'bg-amber-400/10 border-amber-400/30 text-amber-300'
                    : 'bg-amber-100 border-amber-300 text-amber-800'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                <span>INDICATIVE OUTCOMES & REPORTABLE MILESTONES (YEARS 1–2)</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${
                isDark ? 'text-white' : 'text-[#081c3b]'
              }`}>
                Turnkey Campus Performance Benchmarks
              </h3>
            </div>
            <span
              className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border ${
                isDark
                  ? 'text-amber-300 bg-amber-400/15 border-amber-400/30'
                  : 'text-amber-800 bg-amber-100 border-amber-300'
              }`}
            >
              12 Months to Self-Sustaining
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6">
            <div className={`p-4 rounded-2xl border text-center ${
              isDark ? 'bg-slate-950/80 border-sky-500/30' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className={`text-2xl sm:text-3xl font-mono font-black ${isDark ? 'text-white' : 'text-[#081c3b]'}`}>
                250+
              </div>
              <div className={`text-xs font-bold mt-1 uppercase ${isDark ? 'text-sky-300' : 'text-[#0284c7]'}`}>
                Students Engaged
              </div>
              <div className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Via hackathons & bootcamps
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${
              isDark ? 'bg-slate-950/80 border-amber-500/30' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className={`text-2xl sm:text-3xl font-mono font-black ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                15–25
              </div>
              <div className={`text-xs font-bold mt-1 uppercase ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                Pre-Incubation Teams
              </div>
              <div className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Admitted to 3–6 mo cohorts
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${
              isDark ? 'bg-slate-950/80 border-emerald-500/30' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className={`text-2xl sm:text-3xl font-mono font-black ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                5–10
              </div>
              <div className={`text-xs font-bold mt-1 uppercase ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                Startups Incorporated
              </div>
              <div className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Pvt Ltd / LLP / MSME
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${
              isDark ? 'bg-slate-950/80 border-cyan-500/30' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className={`text-2xl sm:text-3xl font-mono font-black ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                10–20+
              </div>
              <div className={`text-xs font-bold mt-1 uppercase ${isDark ? 'text-cyan-300' : 'text-cyan-800'}`}>
                IP Filings / Year
              </div>
              <div className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Patent / Design / Trademark
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${
              isDark ? 'bg-slate-950/80 border-indigo-500/30' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className={`text-2xl sm:text-3xl font-mono font-black ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                16+
              </div>
              <div className={`text-xs font-bold mt-1 uppercase ${isDark ? 'text-indigo-300' : 'text-indigo-800'}`}>
                Calendarised Events
              </div>
              <div className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                IIC mandated sessions
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${
              isDark ? 'bg-slate-950/80 border-amber-500/30' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className={`text-2xl sm:text-3xl font-mono font-black ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                ₹3Cr+
              </div>
              <div className={`text-xs font-bold mt-1 uppercase ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                Grant Access Lines
              </div>
              <div className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                NIDHI, BIRAC, MSME, MeitY
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${
              isDark ? 'bg-slate-950/80 border-sky-500/30' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className={`text-2xl sm:text-3xl font-mono font-black ${isDark ? 'text-sky-400' : 'text-[#0284c7]'}`}>
                100+
              </div>
              <div className={`text-xs font-bold mt-1 uppercase ${isDark ? 'text-sky-300' : 'text-[#0284c7]'}`}>
                Founder Graduates
              </div>
              <div className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                By Year-2 maturation
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${
              isDark ? 'bg-slate-950/80 border-emerald-500/30' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className={`text-2xl sm:text-3xl font-mono font-black ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                12 Mo
              </div>
              <div className={`text-xs font-bold mt-1 uppercase ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                Self-Sustaining
              </div>
              <div className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Complete operational handover
              </div>
            </div>
          </div>

          {/* Proposal Call to Action Strip: "Our Ask" */}
          <div className="mt-6 p-4 rounded-2xl bg-[#081c3b] border border-amber-400/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="text-center md:text-left">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
                Schedule a 30-Minute Leadership Briefing
              </div>
              <div className="text-xs sm:text-sm text-slate-200 mt-0.5">
                We would be delighted to present this framework to your Director, Principal, Dean (R&D) & IIC Coordinator and conduct a free on-campus readiness assessment.
              </div>
            </div>
            <button
              onClick={() => onOpenApplication('institutional')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase font-mono tracking-wider text-[#081c3b] bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 shadow-lg whitespace-nowrap flex-shrink-0 cursor-pointer"
            >
              Schedule 30-Min Discovery Call
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
