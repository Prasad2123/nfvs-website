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
        'Build audit-ready evidence for patents, student startups, industry R&D, and ranking submissions.',
      icon: Trophy,
      avatarBg: 'from-amber-500/20 to-amber-600/10 border-amber-400/40 text-amber-500',
      tag: 'NIRF · NAAC · NBA ALIGNED',
      badgeText: 'Rankings Booster',
    },
    {
      number: '02',
      title: 'TURNKEY DAY-ZERO MANAGEMENT',
      description:
        'Handles space planning, mentor matching, ERP tracking, and compliance dossiers with low faculty burden.',
      icon: Settings2,
      avatarBg: 'from-sky-500/20 to-sky-600/10 border-sky-400/40 text-sky-500',
      tag: 'ZERO OPERATIONAL BURDEN',
      badgeText: 'Turnkey Protocols',
    },
    {
      number: '03',
      title: 'INDUSTRY & CAPITAL CONNECT',
      description:
        'Connects research with CXO operators, corporate pilots, angel syndicates, and grant pipelines.',
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
      criteria: 'Criterion 3: Research, Innovations & Extension ecosystem.',
      evidence: 'AQAR dossiers, incubation handbooks, and E-Cell logs.',
      color: isDark ? 'border-sky-500/40 text-sky-300 bg-sky-950/40' : 'border-sky-300 text-[#0284c7] bg-sky-50',
    },
    {
      id: 'NBA',
      body: 'NBA (Tier-I & II SAR)',
      badge: 'SAR Evidence',
      criteria: 'Tier-I/II SAR: Industry interaction, IPR & funded R&D.',
      evidence: 'SAR evidence packs, PoC grant registers & patent logs.',
      color: isDark ? 'border-amber-500/40 text-amber-300 bg-amber-950/40' : 'border-amber-300 text-amber-800 bg-amber-50',
    },
    {
      id: 'IIC',
      body: 'IIC (MoE–MIC)',
      badge: 'Star Ratings',
      criteria: 'MoE–MIC quarterly innovation calendar & Star Ratings.',
      evidence: 'Execution packs, IPR clinics & MIC reporting data.',
      color: isDark ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40' : 'border-emerald-300 text-emerald-800 bg-emerald-50',
    },
    {
      id: 'AICTE',
      body: 'AICTE / NISP',
      badge: 'Policy Adoption',
      criteria: 'National Innovation & Startup Policy (NISP) governance.',
      evidence: 'Startup policy drafts, IP charters & equity frameworks.',
      color: isDark ? 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40' : 'border-cyan-300 text-cyan-800 bg-cyan-50',
    },
    {
      id: 'NIRF',
      body: 'NIRF / ARIIA',
      badge: 'NIRF-Innovation',
      criteria: 'Research, innovation achievement & graduation outcomes.',
      evidence: 'Patent, startup, publication & industry engagement data.',
      color: isDark ? 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40' : 'border-indigo-300 text-indigo-800 bg-indigo-50',
    },
  ];

  const filteredAccreditation = activeAccreditation === 'ALL'
    ? accreditationData
    : accreditationData.filter(item => item.id === activeAccreditation || (activeAccreditation === 'NIRF' && item.id === 'AICTE'));

  return (
    <section
      id="why-ncf"
      className={`py-12 sm:py-16 relative border-b transition-colors duration-300 ${
        isDark ? 'bg-[#060f1e] border-sky-500/20' : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="section-shell space-y-10 sm:space-y-14">
        
        {/* Section 1: Why Partner With NCF Top Header & Cards */}
        <div>
          <div className="flex justify-center mb-8 sm:mb-10 reveal">
            <div
              className={`section-title-pill ${
                isDark
                  ? 'bg-[#0b1e3c] text-white border-sky-400/40'
                  : 'bg-white text-[#081c3b] border-slate-300 shadow-md'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <h2
                  className={`section-title-text ${
                  isDark
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-amber-300 animate-gradient-text'
                    : 'text-[#081c3b]'
                }`}
              >
                WHY PARTNER WITH NF VENTURE STUDIO?
              </h2>
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch reveal-stagger">
            {reasons.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`group relative flex flex-col justify-between glass-card nf-card hover:border-amber-400 transition-all duration-300 glass-card-hover ${
                    isDark ? 'border-sky-500/30' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
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
                            className={`text-[10px] font-bold px-2 py-0.5 rounded border inline-block max-w-full safe-wrap ${
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
                      className={`text-base sm:text-lg font-black tracking-tight uppercase leading-snug mb-2 text-balance transition-colors ${
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
                      <span className={`font-mono text-[11px] font-bold safe-wrap ${isDark ? 'text-sky-400' : 'text-[#0284c7]'}`}>
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
          className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-card border shadow-2xl relative overflow-hidden ${
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
              <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight text-balance ${
                isDark ? 'text-white' : 'text-[#081c3b]'
              }`}>
                Accreditation & Audit-Ready Evidence Matrix
              </h3>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Concrete documentation and tangible outputs generated directly by NF Venture Studio for your institution.
              </p>
            </div>

            {/* Filter Pills */}
            <div className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border w-full lg:w-auto ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              {(['ALL', 'NAAC', 'NBA', 'IIC', 'NIRF'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveAccreditation(filter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex-1 sm:flex-none ${
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
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between min-w-0 ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800 hover:border-sky-500/40'
                    : 'bg-slate-50/80 border-slate-200 hover:border-sky-400 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className={`font-mono font-black text-sm tracking-wide safe-wrap ${
                      isDark ? 'text-white' : 'text-[#081c3b]'
                    }`}>
                      {row.body}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border safe-wrap ${row.color}`}>
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
      </div>
    </section>
  );
};
