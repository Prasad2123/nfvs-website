import React, { useState, useEffect } from 'react';
import { CheckCircle, Send, Building2, GraduationCap, Microscope, Rocket, Loader2, AlertCircle } from 'lucide-react';

export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzf_pc_bme4a9INi5pPRtT8Ao9qKkYQfbz50_f37LGfmdg6O14bPkk3pMQ35iAt_zdbgA/exec';

export interface NFApplicationFormProps {
  initialTrack?: string;
  isDark?: boolean;
  isModal?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const NFApplicationForm: React.FC<NFApplicationFormProps> = ({
  initialTrack = 'student',
  isDark = true,
  isModal = false,
  onCancel,
  onSuccess,
}) => {
  const [selectedTrack, setSelectedTrack] = useState(initialTrack);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    projectTitle: '',
    domain: '',
    description: '',
    stage: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTrack(initialTrack);
  }, [initialTrack]);

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      institution: '',
      projectTitle: '',
      domain: '',
      description: '',
      stage: '',
    });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const trackName = tracks.find((t) => t.id === selectedTrack)?.name || selectedTrack;

    const payload = {
      track: trackName,
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      organization: formData.institution.trim(),
      technology: formData.domain,
      stage: formData.stage,
      idea: formData.description.trim(),
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned error status: ${response.status}`);
      }

      const data = await response.json().catch(() => null);
      if (data && data.success === false) {
        throw new Error(data.message || 'Failed to submit application. Please try again.');
      }

      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('Error submitting application to Google Apps Script:', err);
      setErrorMessage(
        err.message || 'Unable to submit your application. Please check your network and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
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
          <p><span className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Track:</span> {tracks.find((t) => t.id === selectedTrack)?.name}</p>
          <p><span className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Helpline:</span> +91 8379879846</p>
        </div>
        <div>
          {isModal ? (
            <button
              onClick={() => {
                handleReset();
                if (onCancel) onCancel();
              }}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Submit Another Application
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      {/* Error Alert */}
      {errorMessage && (
        <div
          className={`p-3 sm:p-3.5 rounded-xl border flex items-start gap-2.5 text-xs animate-fadeIn ${
            isDark
              ? 'bg-rose-950/50 border-rose-800/80 text-rose-300'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">Submission Failed</p>
            <p className="opacity-90 mt-0.5">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className={`p-1 rounded-md transition-colors ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
            }`}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      {/* Track Selection */}
      <div>
        <label
          className={`block text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
            isDark ? 'text-sky-300' : 'text-[#0284c7]'
          }`}
        >
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
                disabled={isSubmitting}
                onClick={() => setSelectedTrack(t.id)}
                className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer min-w-0 ${
                  isSelected
                    ? `${t.color} ring-2 ring-sky-400 shadow-md font-bold`
                    : isDark
                    ? 'border-slate-700 hover:border-slate-500 text-slate-300 bg-slate-900/60'
                    : 'border-slate-200 hover:border-slate-400 text-slate-700 bg-slate-50'
                } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected
                      ? isDark
                        ? 'bg-slate-800'
                        : 'bg-white shadow-xs'
                      : isDark
                      ? 'bg-slate-800/60'
                      : 'bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium safe-wrap">{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Full Name *
          </label>
          <input
            type="text"
            required
            disabled={isSubmitting}
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Dr. / Prof. / Mr. / Ms. Name"
            className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 ${
              isDark
                ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
            } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
          />
        </div>

        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Email Address *
          </label>
          <input
            type="email"
            required
            disabled={isSubmitting}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="innovator@example.com"
            className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 ${
              isDark
                ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
            } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
          />
        </div>

        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Contact Phone / WhatsApp *
          </label>
          <input
            type="tel"
            required
            disabled={isSubmitting}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 9876543210"
            className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 ${
              isDark
                ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
            } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
          />
        </div>

        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            University / College / Organization *
          </label>
          <input
            type="text"
            required
            disabled={isSubmitting}
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            placeholder="e.g. Pune University / Startup Name"
            className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 ${
              isDark
                ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
            } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Focus Technology Domain *
          </label>
          <select
            required
            disabled={isSubmitting}
            value={formData.domain}
            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
            className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 ${
              isDark
                ? 'bg-slate-900/90 border-slate-700 text-white'
                : 'bg-slate-50 border-slate-300 text-slate-900'
            } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <option value="">Select Technology Domain</option>
            <option value="AI">AI (Artificial Intelligence / ML)</option>
            <option value="IoT">IoT (Internet of Things & Embedded)</option>
            <option value="Robotics">Robotics & Automation</option>
            <option value="Electronics">Electronics & Hardware Tech</option>
            <option value="DeepTech">Deep-Tech Patent Commercialization</option>
            <option value="CampusHub">Campus Innovation Hub / Institutional</option>
          </select>
        </div>

        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Current Stage *
          </label>
          <select
            required
            disabled={isSubmitting}
            value={formData.stage}
            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
            className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 ${
              isDark
                ? 'bg-slate-900/90 border-slate-700 text-white'
                : 'bg-slate-50 border-slate-300 text-slate-900'
            } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <option value="">Select Current Stage</option>
            <option value="Ideation">Ideation / Concept</option>
            <option value="Prototype">Working Prototype / Lab Demo</option>
            <option value="Patented">Patented / Research Paper</option>
            <option value="MVP">MVP Ready (Ready for Validation)</option>
            <option value="Scaling">Scaling / Market Commercialization</option>
          </select>
        </div>
      </div>

      <div>
        <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
          Brief Idea / Project Overview
        </label>
        <textarea
          rows={3}
          disabled={isSubmitting}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Summarize your innovation, core problem solved, and expected studio support..."
          className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:ring-2 focus:ring-sky-400 resize-none ${
            isDark
              ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500'
              : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
          } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
        />
      </div>

      {/* Submit footer */}
      <div
        className={`pt-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <div className={`text-xs font-mono text-center sm:text-left ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Direct Helpline: <span className="font-bold text-amber-500">8379879846</span>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {isModal && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                isDark
                  ? 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700'
                  : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-wide text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 rounded-lg shadow-md transition-all cursor-pointer text-center ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
