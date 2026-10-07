import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { NFApplicationForm } from './NFApplicationForm';

interface NFApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrack?: string;
  isDark?: boolean;
}

export const NFApplicationModal: React.FC<NFApplicationModalProps> = ({
  isOpen,
  onClose,
  initialTrack = 'student',
  isDark = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border overflow-hidden max-h-[94vh] flex flex-col transition-colors ${
          isDark ? 'bg-[#091528] text-white border-sky-500/40' : 'bg-white text-[#081c3b] border-slate-200'
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-6 pr-14 sm:pr-16 relative border-b transition-colors ${
            isDark
              ? 'bg-gradient-to-r from-[#060f1e] via-[#0b1e3c] to-[#060f1e] border-slate-800'
              : 'bg-gradient-to-r from-slate-50 via-sky-50/70 to-slate-50 border-slate-200'
          }`}
        >
          <button
            onClick={onClose}
            className={`absolute top-4 sm:top-5 right-4 sm:right-5 p-1.5 sm:p-2 rounded-full transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700'
                : 'text-slate-500 hover:text-slate-800 bg-slate-200/80 hover:bg-slate-300'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div
            className={`inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2 border ${
              isDark
                ? 'bg-amber-400/15 text-amber-300 border-amber-400/30'
                : 'bg-amber-100 text-amber-800 border-amber-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            INCUBATION PROGRAM APPLICATION
          </div>
          <h2 className={`text-xl sm:text-2xl font-black tracking-tight font-sans text-balance ${isDark ? 'text-white' : 'text-[#081c3b]'}`}>
            Join NF Venture Studio
          </h2>
          <p className={`text-xs sm:text-sm mt-0.5 ${isDark ? 'text-sky-300' : 'text-[#0284c7]'}`}>
            Empowering Ideas. Building Startups. Creating Impact.
          </p>
        </div>

        {/* Modal Body with Reusable Form */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <NFApplicationForm
            initialTrack={initialTrack}
            isDark={isDark}
            isModal={true}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};
