import React from 'react';
import { Rocket, Trophy, FlaskConical, Sparkles, Shield, Zap, GraduationCap, Target, Award } from 'lucide-react';

interface NFMarqueeProps {
  isDark?: boolean;
}

const marqueeItems = [
  { icon: Rocket, label: 'Student Startups', color: 'text-sky-400' },
  { icon: Trophy, label: 'NIRF · NAAC · NBA Aligned', color: 'text-amber-400' },
  { icon: FlaskConical, label: 'AI / IoT / Robotics Labs', color: 'text-sky-300' },
  { icon: Sparkles, label: 'From Lab to Market', color: 'text-amber-300' },
  { icon: Shield, label: 'AICTE-NISP Compliant', color: 'text-emerald-400' },
  { icon: Zap, label: '₹3Cr+ Grant Pipeline', color: 'text-amber-400' },
  { icon: GraduationCap, label: '250+ Students Engaged', color: 'text-sky-400' },
  { icon: Target, label: '12-Month Turnkey Rollout', color: 'text-indigo-400' },
  { icon: Award, label: 'IIC Star Ratings Support', color: 'text-sky-300' },
  { icon: Rocket, label: 'Investor Demo Days', color: 'text-amber-400' },
  { icon: FlaskConical, label: 'Patent Drafting & Filing', color: 'text-emerald-300' },
  { icon: Sparkles, label: 'Pre-Incubation Cohorts', color: 'text-sky-400' },
  // duplicate for seamless loop
  { icon: Rocket, label: 'Student Startups', color: 'text-sky-400' },
  { icon: Trophy, label: 'NIRF · NAAC · NBA Aligned', color: 'text-amber-400' },
  { icon: FlaskConical, label: 'AI / IoT / Robotics Labs', color: 'text-sky-300' },
  { icon: Sparkles, label: 'From Lab to Market', color: 'text-amber-300' },
  { icon: Shield, label: 'AICTE-NISP Compliant', color: 'text-emerald-400' },
  { icon: Zap, label: '₹3Cr+ Grant Pipeline', color: 'text-amber-400' },
  { icon: GraduationCap, label: '250+ Students Engaged', color: 'text-sky-400' },
  { icon: Target, label: '12-Month Turnkey Rollout', color: 'text-indigo-400' },
  { icon: Award, label: 'IIC Star Ratings Support', color: 'text-sky-300' },
  { icon: Rocket, label: 'Investor Demo Days', color: 'text-amber-400' },
  { icon: FlaskConical, label: 'Patent Drafting & Filing', color: 'text-emerald-300' },
  { icon: Sparkles, label: 'Pre-Incubation Cohorts', color: 'text-sky-400' },
];

export const NFMarquee: React.FC<NFMarqueeProps> = ({ isDark = true }) => {
  return (
    <div
      className={`relative py-2.5 border-y overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#05091a] border-sky-500/20'
          : 'bg-slate-100 border-slate-200'
      }`}
    >
      {/* Left & Right edge fade */}
      <div className={`absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none ${
        isDark
          ? 'bg-gradient-to-r from-[#05091a] to-transparent'
          : 'bg-gradient-to-r from-slate-100 to-transparent'
      }`} />
      <div className={`absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none ${
        isDark
          ? 'bg-gradient-to-l from-[#05091a] to-transparent'
          : 'bg-gradient-to-l from-slate-100 to-transparent'
      }`} />

      <div className="flex animate-marquee whitespace-nowrap gap-0">
        {marqueeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <span
              key={idx}
              className={`inline-flex items-center gap-2 px-5 py-1 text-xs font-mono font-bold uppercase tracking-widest flex-shrink-0 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${item.color}`} />
              {item.label}
              <span className={`mx-2 ${isDark ? 'text-sky-500/40' : 'text-slate-300'}`}>·</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
