import React, { useState } from 'react';
import { X, CheckCircle, Send, Sparkles, Building2, GraduationCap, Microscope, Rocket } from 'lucide-react';

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
  const [selectedTrack, setSelectedTrack] = useState(initialTrack);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    projectTitle: '',
    domain: 'AI',
    description: '',
    stage: 'Ideation',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const tracks = [
    {
      id: 'student',
      name: 'Student Startup Track',
      icon: GraduationCap,
      color: isDark ? 'border-sky-500 text-sky-400 bg-sky-950/40' : 'border-sky-400 text-[#0284c7] bg-sky-50',
    },
    {
      id: 'faculty',
      name: 'Faculty Startup Track',
      icon: Microscope,
      color: isDark ? 'border-amber-500 text-amber-400 bg-amber-950/40' : 'border-amber-400 text-amber-800 bg-amber-50',
    },
    {
      id: 'external',
      name: 'External / Solo Founder',
      icon: Rocket,
      color: isDark ? 'border-indigo-500 text-indigo-400 bg-indigo-950/40' : 'border-indigo-400 text-indigo-800 bg-indigo-50',
    },
    {
      id: 'institutional',
      name: 'Campus / Institutional Partner',
      icon: Building2,
      color: isDark ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40' : 'border-emerald-400 text-emerald-800 bg-emerald-50',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border overflow-hidden max-h-[92vh] flex flex-col transition-colors ${
          isDark ? 'bg-[#091528] text-white border-sky-500/40' : 'bg-white text-[#081c3b] border-slate-200'
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-6 relative border-b transition-colors ${
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
          <h2 className={`text-xl sm:text-2xl font-black tracking-tight font-sans ${isDark ? 'text-white' : 'text-[#081c3b]'}`}>
            Join NF Venture Studio
          </h2>
          <p className={`text-xs sm:text-sm mt-0.5 ${isDark ? 'text-sky-300' : 'text-[#0284c7]'}`}>
            Empowering Ideas. Building Startups. Creating Impact.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {isSubmitted ? (
            <div className="text-center py-8 sm:py-10 space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-[#081c3b]'}`}>
                Application Submitted Successfully!
              </h3>
              <p className={`max-w-md mx-auto text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Thank you for applying to NF Venture Studio (Naree Care Foundation). Our incubation committee will review your proposal and get in touch with you shortly.
              </p>
              <div
                className={`p-3.5 rounded-xl border max-w-sm mx-auto text-left text-xs space-y-1 font-mono ${
                  isDark ? 'bg-slate-900/90 border-slate-700/80' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <p><span className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Applicant:</span> {formData.fullName || 'Innovator'}</p>
                <p><span className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Track:</span> {tracks.find(t => t.id === selectedTrack)?.name}</p>
                <p><span className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Helpline:</span> +91 8379879846</p>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Track Selection */}
              <div>
                <label className={`block text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
                  isDark ? 'text-sky-300' : 'text-[#0284c7]'
                }`}>
                  Select Your Track / Profile *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tracks.map((t) => {
                    const Icon = t.icon;
                    const isSelected = selectedTrack === t.id;
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setSelectedTrack(t.id)}
                        className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? `${t.color} ring-2 ring-sky-400 shadow-md font-bold`
                            : isDark
                            ? 'border-slate-700 hover:border-slate-500 text-slate-300 bg-slate-900/60'
                            : 'border-slate-200 hover:border-slate-400 text-slate-700 bg-slate-50'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${
                          isSelected
                            ? isDark ? 'bg-slate-800' : 'bg-white shadow-xs'
                            : isDark ? 'bg-slate-800/60' : 'bg-slate-200/60'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium">{t.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Kumar / Ananya Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. innovator@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Contact Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    University / College / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. National Institute of Tech"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Focus Technology Domain *
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="AI">AI (Artificial Intelligence / ML)</option>
                    <option value="IoT">IoT (Internet of Things & Embedded)</option>
                    <option value="Robotics">Robotics & Automation</option>
                    <option value="Electronics">Electronics & Hardware Tech</option>
                    <option value="DeepTech">Deep-Tech Patent Commercialization</option>
                    <option value="CampusHub">Campus Innovation Hub / Institutional</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Current Stage *
                  </label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="Ideation">Ideation / Concept</option>
                    <option value="Prototype">Working Prototype / Lab Demo</option>
                    <option value="Patented">Patented / Research Paper</option>
                    <option value="MVP">MVP Ready (Ready for Validation)</option>
                    <option value="Scaling">Scaling / Market Commercialization</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Brief Idea / Project Overview
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us briefly about your venture idea, research patent, or campus requirements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 resize-none ${
                    isDark
                      ? 'bg-slate-900/90 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Submit footer */}
              <div className={`pt-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div className={`text-xs font-mono text-center sm:text-left ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Helpline: <span className="font-bold text-amber-500">8379879846</span>
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      isDark
                        ? 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700'
                        : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 rounded-lg shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Application
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
