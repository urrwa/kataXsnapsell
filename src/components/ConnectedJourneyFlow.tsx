import React, { useState } from 'react';
import { Camera, MessageSquare, ShoppingBag, Repeat, ArrowRight, ArrowDown, Check } from 'lucide-react';

const JOURNEY_STEPS = [
  {
    id: 1,
    phase: "Step 01",
    title: "AI Content",
    shortRole: "Creates attention",
    detail: "Consistent high-fashion lifestyle imagery and clips published across platforms bring qualified eyeballs to your profile.",
    icon: Camera,
    previewBadge: "Audience Attraction",
    metric: "300% Greater Reach"
  },
  {
    id: 2,
    phase: "Step 02",
    title: "AI Chat",
    shortRole: "Builds the relationship",
    detail: "Warm, instant conversation answers buyer questions, verifies interest, and matches them to the exact right offer.",
    icon: MessageSquare,
    previewBadge: "Instant Nurturing",
    metric: "< 5s Response Time"
  },
  {
    id: 3,
    phase: "Step 03",
    title: "SnapSell",
    shortRole: "Completes the purchase",
    detail: "Frictionless checkout link lets the buyer complete payments directly in seconds via Apple Pay or Card.",
    icon: ShoppingBag,
    previewBadge: "Frictionless Checkout",
    metric: "88% Completion Rate"
  },
  {
    id: 4,
    phase: "Step 04",
    title: "Follow-Up",
    shortRole: "Creates repeat opportunities",
    detail: "Autonomous check-ins and exclusive bundle drops turn a one-time buyer into a loyal, recurring collector.",
    icon: Repeat,
    previewBadge: "LTV Optimization",
    metric: "Higher Lifetime Value"
  }
];

export const ConnectedJourneyFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* Desktop Horizontal Journey Timeline */}
      <div className="hidden md:grid grid-cols-4 gap-3 w-full relative mb-8">
        {/* Connector Line behind steps */}
        <div className="absolute top-1/2 left-10 right-10 -translate-y-1/2 h-[2px] bg-white/10 z-0" />
        <div
          className="absolute top-1/2 left-10 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#63DCA8] to-[#20B777] z-0 transition-all duration-500"
          style={{ width: `${((activeStep - 1) / 3) * 85}%` }}
        />

        {JOURNEY_STEPS.map((step) => {
          const isActive = step.id === activeStep;
          const isPassed = step.id < activeStep;
          const Icon = step.icon;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`relative z-10 p-4 rounded-2xl text-left transition-all duration-300 border ${
                isActive
                  ? 'bg-[#172A1E] border-[#63DCA8] shadow-xl shadow-[#63DCA8]/20 scale-105'
                  : isPassed
                  ? 'bg-[#101C14] border-white/20 hover:border-white/40'
                  : 'bg-[#0A140E] border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive ? 'bg-[#63DCA8] text-white' : isPassed ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'
                }`}>
                  {isPassed ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className="text-[10px] font-mono text-white/50">{step.phase}</span>
              </div>
              <div className="text-sm font-bold text-white font-display">{step.title}</div>
              <div className="text-xs text-[#63DCA8] font-medium mt-0.5">{step.shortRole}</div>
            </button>
          );
        })}
      </div>

      {/* Mobile Vertical Sequence */}
      <div className="md:hidden flex flex-col space-y-2.5 w-full mb-6">
        {JOURNEY_STEPS.map((step) => {
          const isActive = step.id === activeStep;
          const Icon = step.icon;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`p-3.5 rounded-xl text-left border flex items-center justify-between transition-all ${
                isActive
                  ? 'bg-[#172A1E] border-[#63DCA8] shadow-lg shadow-[#63DCA8]/20'
                  : 'bg-[#0D1711] border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-[#63DCA8] text-white' : 'bg-white/5 text-white/50'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-white/40">{step.phase}</span>
                    <span className="text-sm font-bold text-white">{step.title}</span>
                  </div>
                  <div className="text-xs text-[#63DCA8]">{step.shortRole}</div>
                </div>
              </div>
              <ArrowDown className={`w-4 h-4 ${isActive ? 'text-[#63DCA8]' : 'text-white/20'}`} />
            </button>
          );
        })}
      </div>

      {/* Dynamic Detail Card for the active step */}
      {(() => {
        const active = JOURNEY_STEPS.find((s) => s.id === activeStep) || JOURNEY_STEPS[0];
        return (
          <div className="w-full bg-[#101C14] border border-white/10 rounded-2xl p-6 sm:p-8 text-left shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="bg-[#63DCA8]/20 text-[#63DCA8] text-xs font-mono font-bold px-2.5 py-0.5 rounded-full">
                  {active.phase} in Action
                </span>
                <span className="text-xs text-[#AFD9BF] font-medium">{active.previewBadge}</span>
              </div>
              <h4 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                <span>{active.title}</span>
                <span className="text-white/40 text-lg font-normal">— “{active.shortRole}”</span>
              </h4>
              <p className="text-sm text-white/70 leading-relaxed">
                {active.detail}
              </p>
            </div>

            <div className="bg-[#09110C] border border-white/10 p-5 rounded-2xl text-center min-w-[200px] w-full md:w-auto">
              <div className="text-[11px] uppercase tracking-wider text-white/40 font-semibold mb-1">
                System Outcome
              </div>
              <div className="text-xl font-bold text-white font-mono">{active.metric}</div>
              <div className="text-[10px] text-emerald-400 mt-1 font-medium">Verified System Advantage</div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
