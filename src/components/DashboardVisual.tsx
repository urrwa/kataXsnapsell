import React from 'react';
import { TrendingUp, Sparkles, MessageSquare, ShoppingBag, Users, AlertCircle } from 'lucide-react';

export const DashboardVisual: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Premium Dashboard Shell */}
      <div className="w-full bg-[#111012] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Subtle Pink ambient glow inside card */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#63DCA8]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Dashboard Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#63DCA8] to-[#20B777] flex items-center justify-center text-white font-bold shadow-md">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-display flex items-center gap-2">
                <span>Creator Operations Hub</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded-full font-semibold">
                  Systems Active
                </span>
              </div>
              <div className="text-xs text-white/50">Simulated monthly trajectory model</div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs text-white/50 uppercase tracking-widest font-mono">Aspirational Goal</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              <span className="text-[#63DCA8]">$20,000</span>
              <span className="text-white/40 text-sm font-normal"> / month target</span>
            </div>
          </div>
        </div>

        {/* 4 Core Velocity Streams */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-[#142219] border border-white/5 rounded-2xl p-3.5 sm:p-4 text-left">
            <div className="flex items-center justify-between text-white/50 mb-2">
              <span className="text-[11px] font-medium">Content Output</span>
              <Sparkles className="w-3.5 h-3.5 text-[#63DCA8]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">60+ assets</div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
              <span>↑ 4.2x capacity</span>
              <span className="text-white/40">via AI workflow</span>
            </div>
          </div>

          <div className="bg-[#142219] border border-white/5 rounded-2xl p-3.5 sm:p-4 text-left">
            <div className="flex items-center justify-between text-white/50 mb-2">
              <span className="text-[11px] font-medium">Automated Chats</span>
              <MessageSquare className="w-3.5 h-3.5 text-[#AFD9BF]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">24/7 active</div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
              <span>100% reply rate</span>
              <span className="text-white/40">&lt; 30s</span>
            </div>
          </div>

          <div className="bg-[#142219] border border-white/5 rounded-2xl p-3.5 sm:p-4 text-left">
            <div className="flex items-center justify-between text-white/50 mb-2">
              <span className="text-[11px] font-medium">SnapSell Orders</span>
              <ShoppingBag className="w-3.5 h-3.5 text-[#63DCA8]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">Direct Checkout</div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
              <span>1-Click access</span>
              <span className="text-white/40">zero friction</span>
            </div>
          </div>

          <div className="bg-[#142219] border border-white/5 rounded-2xl p-3.5 sm:p-4 text-left">
            <div className="flex items-center justify-between text-white/50 mb-2">
              <span className="text-[11px] font-medium">Returning Buyers</span>
              <Users className="w-3.5 h-3.5 text-[#AFD9BF]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">Repeat LTV</div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
              <span>Nurtured leads</span>
              <span className="text-white/40">recurring drops</span>
            </div>
          </div>
        </div>

        {/* Visual Growth Waveform Graphic */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/5 mb-4 text-left">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-white/70 font-semibold">Creator Leverage Over Time</span>
            <span className="text-[#63DCA8] text-[11px] font-mono">Decoupling Revenue From Working Hours</span>
          </div>
          <div className="h-20 w-full flex items-end gap-1.5 pt-2">
            {[20, 28, 35, 42, 50, 58, 64, 75, 82, 92, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t transition-all duration-700 bg-gradient-to-t from-white/10 to-[#63DCA8]"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-white/40 mt-2 font-mono">
            <span>Month 1: System Onboarding</span>
            <span>Month 3: Automated Scaling</span>
            <span>Target: High-LTV Autonomy</span>
          </div>
        </div>

        {/* MANDATORY PROMINENT DISCLAIMER */}
        <div
          id="income-target-disclaimer"
          className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-[#AFD9BF] shrink-0 mt-0.5" />
          <div className="text-xs text-[#F8F6F7]/90 leading-relaxed">
            <strong className="text-[#AFD9BF] font-semibold">Mandatory Transparency Notice:</strong> $20,000 per month is an ambitious target, not guaranteed income. Results depend on your audience, offer, pricing, consistency and execution.
          </div>
        </div>
      </div>
    </div>
  );
};
