import { SlideButton } from './SlideButton';
import React, { useState } from 'react';
import { UploadCloud, DollarSign, Link2, CreditCard, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

const STEPS = [
  {
    step: 1,
    title: "Upload",
    desc: "Drag in exclusive photo galleries, videos, or lifestyle packs.",
    icon: UploadCloud,
    badge: "Instant Storage",
    previewTitle: "Upload Digital Media",
    mockupUI: (
      <div className="space-y-2.5 text-xs text-white/80">
        <div className="border-2 border-dashed border-[#63DCA8]/40 rounded-xl p-4 text-center bg-[#63DCA8]/5">
          <UploadCloud className="w-8 h-8 mx-auto text-[#63DCA8] mb-1.5" />
          <div className="font-semibold text-white">Drop creator files here</div>
          <div className="text-[10px] text-white/50">PNG, MP4, PDF, ZIP up to 5GB</div>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
          <span className="truncate">mediterranean_lookbook_4k.zip</span>
          <span className="text-[#AFD9BF] text-[10px] font-mono">1.2 GB • 100%</span>
        </div>
      </div>
    )
  },
  {
    step: 2,
    title: "Set Your Price",
    desc: "Define single purchases, tiered bundles, or VIP subscriber rates.",
    icon: DollarSign,
    badge: "Zero Hidden Fees",
    previewTitle: "Product & Pricing Setup",
    mockupUI: (
      <div className="space-y-3 text-xs text-white/80">
        <div>
          <label className="text-[10px] uppercase text-white/40 font-semibold block mb-1">Offer Title</label>
          <div className="p-2 rounded-lg bg-black/60 border border-white/10 text-white font-medium">
            VIP Editorial Vault 2026
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] uppercase text-white/40 font-semibold block mb-1">Direct Price</label>
            <div className="p-2 rounded-lg bg-[#63DCA8]/10 border border-[#63DCA8]/40 text-[#63DCA8] font-bold font-mono">
              $49.00 USD
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase text-white/40 font-semibold block mb-1">Instant Payout</label>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-emerald-400 font-bold font-mono">
              Stripe Direct
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    step: 3,
    title: "Share the Link",
    desc: "Place your unique SnapSell URL on your bio, DMs, or AI chat assistant.",
    icon: Link2,
    badge: "1-Click Direct",
    previewTitle: "Universal SnapSell Link",
    mockupUI: (
      <div className="space-y-3 text-xs text-white/80">
        <div className="p-3 rounded-xl bg-black/70 border border-white/10">
          <div className="text-[10px] text-white/40 mb-1">Your Direct Payment Link</div>
          <div className="flex items-center justify-between text-xs text-[#63DCA8] font-mono font-medium">
            <span className="truncate">snapsell.me/kata/vip-vault</span>
            <span className="bg-[#63DCA8]/20 px-2 py-0.5 rounded text-[10px]">Copied!</span>
          </div>
        </div>
        <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-white/70">
          ✓ Works automatically in Instagram DMs, TikTok Bio, Telegram, and AI Chat sequences.
        </div>
      </div>
    )
  },
  {
    step: 4,
    title: "Get Paid",
    desc: "Buyer checks out with Apple Pay, Google Pay, or Credit Card in 10 seconds.",
    icon: CreditCard,
    badge: "Encrypted & Fast",
    previewTitle: "Frictionless Checkout",
    mockupUI: (
      <div className="space-y-2.5 text-xs text-white/80">
        <div className="p-3 rounded-xl bg-[#15231A] border border-white/10 space-y-2">
          <div className="flex justify-between font-bold text-white">
            <span>VIP Editorial Vault</span>
            <span className="font-mono text-[#63DCA8]">$49.00</span>
          </div>
          <button className="w-full py-2 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-1.5 shadow">
            <span>Pay with</span> <span className="font-black text-sm">Apple Pay</span>
          </button>
          <div className="text-center text-[10px] text-white/40">256-bit bank-grade encryption</div>
        </div>
      </div>
    )
  },
  {
    step: 5,
    title: "Deliver",
    desc: "Buyer receives encrypted high-res access immediately. You keep the earnings.",
    icon: CheckCircle2,
    badge: "Automated Fulfillment",
    previewTitle: "Vault Unlocked Instantly",
    mockupUI: (
      <div className="space-y-2.5 text-xs text-white/80 text-center py-2">
        <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="font-bold text-white text-sm">Payment Confirmed!</div>
        <div className="text-[11px] text-white/60">High-resolution assets and media files unlocked for buyer. Direct payout initiated to creator balance.</div>
      </div>
    )
  }
];

export const SnapSellFlowMockup: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const current = STEPS[activeStepIndex];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* 5 Step Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full mb-6">
        {STEPS.map((item, idx) => {
          const isActive = activeStepIndex === idx;
          const Icon = item.icon;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-xl text-left transition-all border ${
                isActive
                  ? 'bg-[#172A1E] border-[#63DCA8] shadow-lg shadow-[#63DCA8]/20 ring-1 ring-[#63DCA8]'
                  : 'bg-[#0D1711]/80 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-[#63DCA8]' : 'text-white/40'}`}>
                  0{item.step}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#63DCA8]' : 'text-white/40'}`} />
              </div>
              <div className="font-semibold text-xs text-white">{item.title}</div>
            </button>
          );
        })}
      </div>

      {/* Dominant Screen Preview Card */}
      <div className="w-full bg-[#101C14] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col md:flex-row items-center gap-6 text-left">
        {/* Left Side: Mockup Screen */}
        <div className="w-full md:w-1/2 bg-[#09110C] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-inner">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#63DCA8]" />
              <span className="text-xs font-bold text-white font-mono">{current.previewTitle}</span>
            </div>
            <span className="text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded font-mono">
              SnapSell Core
            </span>
          </div>

          {current.mockupUI}
        </div>

        {/* Right Side: Step Details & Advantage */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#63DCA8] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step {current.step} of 5 • {current.badge}</span>
          </div>
          <h4 className="text-2xl font-bold font-display text-white">{current.title}</h4>
          <p className="text-sm text-white/70 leading-relaxed">
            {current.desc}
          </p>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-1">
            <div className="font-semibold text-white">Why Creators Love SnapSell:</div>
            <div className="text-white/60">No complicated web builders, no confusing checkout funnels. Just one link where your buyers can complete the transaction cleanly.</div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <SlideButton
              onClick={() => setActiveStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0))}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#63DCA8] hover:text-white transition-colors"
            >
              <span>{activeStepIndex < STEPS.length - 1 ? 'Next Step' : 'Restart Overview'}</span>
              <ChevronRight className="w-4 h-4" />
            </SlideButton>
          </div>
        </div>
      </div>
    </div>
  );
};
