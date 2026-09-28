import React, { useState } from 'react';
import { ApplicationFormData, FormErrors, CreatorStage, MainGoal } from '../types';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, ShieldCheck } from 'lucide-react';

interface ApplicationFormProps {
  onOpenModal: (type: 'privacy' | 'terms' | 'legal') => void;
  onSuccessReturn: () => void;
}

const CREATOR_STAGES: CreatorStage[] = [
  'Planning to Start',
  'New Creator',
  'Active Creator',
  'Established Creator',
  'Creator Agency'
];

const MAIN_GOALS: MainGoal[] = [
  'Create More Content',
  'Automate Conversations',
  'Increase Direct Sales',
  'Get Professional Support',
  'Access International Opportunities'
];

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onOpenModal,
  onSuccessReturn
}) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: '',
    email: '',
    socialHandle: '',
    creatorStage: '',
    mainGoal: '',
    confirmedAge: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const applicationEndpoint = import.meta.env.VITE_APPLICATION_ENDPOINT?.trim();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.socialHandle.trim()) {
      newErrors.socialHandle = 'Social handle is required (e.g. @username).';
    }

    if (!formData.creatorStage) {
      newErrors.creatorStage = 'Please select your current creator stage.';
    }

    if (!formData.mainGoal) {
      newErrors.mainGoal = 'Please select your primary monetization goal.';
    }

    if (!formData.confirmedAge) {
      newErrors.confirmedAge = 'You must confirm that you are at least 18 years old.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      setPreviewReady(false);
      return;
    }

    if (!applicationEndpoint) {
      setPreviewReady(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(applicationEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error('Application request failed');
      setIsSubmitted(true);
    } catch {
      setErrors({ general: 'Failed to submit application. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      email: '',
      socialHandle: '',
      creatorStage: '',
      mainGoal: '',
      confirmedAge: false
    });
    setErrors({});
    setIsSubmitted(false);
    onSuccessReturn();
  };

  if (isSubmitted) {
    return (
      <div
        id="application-success-panel"
        className="w-full max-w-lg mx-auto p-8 rounded-3xl bg-[#0D1711] border border-[#63DCA8]/40 shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-300"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center ring-4 ring-emerald-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-display text-white">
            Your Application Has Been Received
          </h3>
          <p className="text-sm text-white/70 leading-relaxed max-w-md mx-auto">
            Thank you for applying, {formData.firstName}. Your application has been submitted for review.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 text-left space-y-1">
          <div className="flex items-center gap-1.5 text-white font-medium">
            <ShieldCheck className="w-4 h-4 text-[#63DCA8]" />
            <span>Next Steps</span>
          </div>
          <div>Keep an eye on <strong className="text-white">{formData.email}</strong> for any follow-up from the academy team.</div>
        </div>

        <button
          onClick={handleReset}
          className="w-full py-3.5 px-6 rounded-full bg-[#63DCA8] hover:bg-[#20B777] text-white font-semibold text-sm transition-all shadow-lg shadow-[#63DCA8]/30 active:scale-98"
        >
          Return to the Academy
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-[#0D1711]/95 border border-white/15 p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-left">
      <div className="mb-5">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#63DCA8] font-semibold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exclusive Access</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
          Apply for Academy Access
        </h3>
        <p className="text-xs sm:text-sm text-white/60 mt-1">
          Take the first step toward automating your personal brand with Kata and SnapSell.
        </p>
      </div>

      {errors.general && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.general}</span>
        </div>
      )}

      {!applicationEndpoint && <p className="mb-4 text-xs leading-relaxed text-[#A6BCAD]" role="note">Application preview — submissions are not sent yet.</p>}
      {previewReady && <p className="mb-4 p-3 rounded-xl border border-[#63DCA8]/30 text-xs text-[#63DCA8]" role="status">Your details pass validation. This preview has not sent or saved your application.</p>}
      <form onSubmit={handleSubmit} onChange={() => setPreviewReady(false)} noValidate className="space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="first-name-input" className="block text-xs font-semibold text-white/80 mb-1.5">
            First Name <span className="text-[#63DCA8]">*</span>
          </label>
          <input
            id="first-name-input"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'first-name-error' : undefined}
            type="text"
            value={formData.firstName}
            onChange={(e) => {
              setFormData({ ...formData, firstName: e.target.value });
              if (errors.firstName) setErrors({ ...errors, firstName: undefined });
            }}
            placeholder="e.g. Sofia"
            className={`w-full px-4 py-2.5 rounded-xl bg-black/60 text-white placeholder-white/30 border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#63DCA8] ${
              errors.firstName ? 'border-red-500' : 'border-white/10 hover:border-white/20'
            }`}
          />
          {errors.firstName && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span id="first-name-error" role="alert">{errors.firstName}</span>
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email-input" className="block text-xs font-semibold text-white/80 mb-1.5">
            Email Address <span className="text-[#63DCA8]">*</span>
          </label>
          <input
            id="email-input"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            placeholder="creator@example.com"
            className={`w-full px-4 py-2.5 rounded-xl bg-black/60 text-white placeholder-white/30 border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#63DCA8] ${
              errors.email ? 'border-red-500' : 'border-white/10 hover:border-white/20'
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span id="email-error" role="alert">{errors.email}</span>
            </p>
          )}
        </div>

        {/* Social-Media Handle */}
        <div>
          <label htmlFor="social-handle-input" className="block text-xs font-semibold text-white/80 mb-1.5">
            Social-Media Handle <span className="text-[#63DCA8]">*</span>
          </label>
          <input
            id="social-handle-input"
            autoComplete="off"
            aria-invalid={!!errors.socialHandle}
            aria-describedby={errors.socialHandle ? 'social-error' : undefined}
            type="text"
            value={formData.socialHandle}
            onChange={(e) => {
              setFormData({ ...formData, socialHandle: e.target.value });
              if (errors.socialHandle) setErrors({ ...errors, socialHandle: undefined });
            }}
            placeholder="@yourbrand"
            className={`w-full px-4 py-2.5 rounded-xl bg-black/60 text-white placeholder-white/30 border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#63DCA8] ${
              errors.socialHandle ? 'border-red-500' : 'border-white/10 hover:border-white/20'
            }`}
          />
          {errors.socialHandle && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span id="social-error" role="alert">{errors.socialHandle}</span>
            </p>
          )}
        </div>

        {/* Current Creator Stage Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="creator-stage-select" className="block text-xs font-semibold text-white/80 mb-1.5">
              Creator Stage <span className="text-[#63DCA8]">*</span>
            </label>
            <select
              id="creator-stage-select"
              aria-invalid={!!errors.creatorStage}
              aria-describedby={errors.creatorStage ? 'stage-error' : undefined}
              value={formData.creatorStage}
              onChange={(e) => {
                setFormData({ ...formData, creatorStage: e.target.value as CreatorStage });
                if (errors.creatorStage) setErrors({ ...errors, creatorStage: undefined });
              }}
              className={`w-full px-3 py-2.5 rounded-xl bg-black/60 text-white border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#63DCA8] ${
                errors.creatorStage ? 'border-red-500' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <option value="" disabled className="bg-[#101C14] text-white/40">Select Stage</option>
              {CREATOR_STAGES.map((s) => (
                <option key={s} value={s} className="bg-[#101C14] text-white">{s}</option>
              ))}
            </select>
            {errors.creatorStage && (
              <p id="stage-error" role="alert" className="text-[11px] text-red-400 mt-1">{errors.creatorStage}</p>
            )}
          </div>

          {/* Main Goal Dropdown */}
          <div>
            <label htmlFor="main-goal-select" className="block text-xs font-semibold text-white/80 mb-1.5">
              Primary Goal <span className="text-[#63DCA8]">*</span>
            </label>
            <select
              id="main-goal-select"
              aria-invalid={!!errors.mainGoal}
              aria-describedby={errors.mainGoal ? 'goal-error' : undefined}
              value={formData.mainGoal}
              onChange={(e) => {
                setFormData({ ...formData, mainGoal: e.target.value as MainGoal });
                if (errors.mainGoal) setErrors({ ...errors, mainGoal: undefined });
              }}
              className={`w-full px-3 py-2.5 rounded-xl bg-black/60 text-white border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#63DCA8] ${
                errors.mainGoal ? 'border-red-500' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <option value="" disabled className="bg-[#101C14] text-white/40">Select Goal</option>
              {MAIN_GOALS.map((g) => (
                <option key={g} value={g} className="bg-[#101C14] text-white">{g}</option>
              ))}
            </select>
            {errors.mainGoal && (
              <p id="goal-error" role="alert" className="text-[11px] text-red-400 mt-1">{errors.mainGoal}</p>
            )}
          </div>
        </div>

        {/* 18+ Age Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              id="age-confirmation-checkbox"
              aria-invalid={!!errors.confirmedAge}
              aria-describedby={errors.confirmedAge ? 'age-error' : undefined}
              type="checkbox"
              checked={formData.confirmedAge}
              onChange={(e) => {
                setFormData({ ...formData, confirmedAge: e.target.checked });
                if (errors.confirmedAge) setErrors({ ...errors, confirmedAge: undefined });
              }}
              className="mt-1 w-4 h-4 rounded text-[#63DCA8] focus:ring-[#63DCA8] bg-black/60 border-white/20"
            />
            <span className="text-xs text-white/80">
              I confirm that I am at least 18 years old. <span className="text-[#63DCA8]">*</span>
            </span>
          </label>
          {errors.confirmedAge && (
            <p id="age-error" role="alert" className="text-[11px] text-red-400 mt-1 pl-6">{errors.confirmedAge}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            id="submit-application-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#63DCA8] to-[#20B777] hover:from-[#83E9BB] hover:to-[#2FC088] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#63DCA8]/30 active:scale-98 transition-all disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Your Application...</span>
              </>
            ) : (
              <>
                <span>{applicationEndpoint ? 'Apply for academy access' : 'Preview application'}</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Supporting Disclaimer Text */}
        <p className="text-[11px] text-white/50 leading-relaxed text-center pt-1">
          Applications are reviewed individually. Program access and additional opportunities depend on eligibility, availability and the selected service level.
        </p>

        {/* Consent and Legal Links */}
        <div className="text-[10px] text-white/40 text-center pt-2 border-t border-white/5 flex flex-wrap justify-center gap-x-3 gap-y-1">
          <span>By submitting, you agree to our</span>
          <button
            type="button"
            onClick={() => onOpenModal('privacy')}
            className="underline hover:text-white transition-colors"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenModal('terms')}
            className="underline hover:text-white transition-colors"
          >
            Terms of Service
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenModal('legal')}
            className="underline hover:text-white transition-colors"
          >
            Legal Notice
          </button>
        </div>
      </form>
    </div>
  );
};
