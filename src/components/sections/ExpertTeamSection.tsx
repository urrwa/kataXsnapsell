import React from 'react';
import { ASSET_SLOTS } from '../../data/content';
import { Users, CheckCircle2, Sparkles } from 'lucide-react';

export const ExpertTeamSection: React.FC = () => {
  const TEAM_ROLES = [
    { title: "Content Creation", desc: "Studio curation & visual prompt mastering" },
    { title: "Channel Management", desc: "Multi-platform scheduling & asset publishing" },
    { title: "AI Chat Setup", desc: "Tone calibration, objection handling & intent routing" },
    { title: "SnapSell Products", desc: "Offer packaging, pricing tier design & checkout setup" },
    { title: "Growth Strategy", desc: "Audience acquisition & funnel metrics analysis" },
    { title: "Partnerships", desc: "Brand alignment & exclusive sponsor collaborations" }
  ];

  return (
    <section
      id="section-9"
      className="landing-section bg-[#050907] px-4 sm:px-6 lg:px-8"
      aria-label="Expert Team"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Visual Production Team Setting with Floating Role Labels */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black">
            <img loading="lazy" decoding="async"
              src={ASSET_SLOTS.teamLineup.src}
              alt={ASSET_SLOTS.teamLineup.alt}
              referrerPolicy="no-referrer"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Floating Role Label 1: AI Specialist */}
            <div className="absolute top-6 left-4 p-2.5 rounded-xl bg-[#101C14]/90 backdrop-blur-md border border-[#63DCA8]/40 shadow-lg text-left">
              <span className="text-[10px] text-[#63DCA8] font-mono font-bold block">SPECIALIST</span>
              <span className="text-xs font-bold text-white">AI Workflow Engineering</span>
            </div>

            {/* Floating Role Label 2: Photographer & Director */}
            <div className="absolute top-20 right-4 p-2.5 rounded-xl bg-[#101C14]/90 backdrop-blur-md border border-[#AFD9BF]/40 shadow-lg text-left">
              <span className="text-[10px] text-[#AFD9BF] font-mono font-bold block">CREATIVE</span>
              <span className="text-xs font-bold text-white">Director of Photography</span>
            </div>

            {/* Floating Role Label 3: Growth Strategist */}
            <div className="absolute bottom-20 left-4 p-2.5 rounded-xl bg-[#101C14]/90 backdrop-blur-md border border-white/20 shadow-lg text-left">
              <span className="text-[10px] text-emerald-400 font-mono font-bold block">GROWTH</span>
              <span className="text-xs font-bold text-white">Commerce Operations</span>
            </div>

            {/* Bottom Overlay Pill */}
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-center">
              <span className="text-xs text-white/90 font-medium">
                Dedicated infrastructure specialists supporting your creator tier.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Copy & Role Labels */}
        <div className="lg:col-span-6 text-left space-y-6">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-white/40 font-semibold">
            <span className="h-px w-8 bg-[#63DCA8]/40" />
            <span className="text-[#63DCA8]">You’re Not Alone</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1 overflow-visible">
            You Stay the Face. <br />
            <span className="text-[#63DCA8] inline-block">We Support the Business.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
            Depending on your program, our team can help with the work behind your creator brand.
          </p>

          {/* 6 Visual Team Roles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {TEAM_ROLES.map((role, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#101C14] border border-white/5 hover:border-[#63DCA8]/30 transition-all text-left"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#63DCA8] shrink-0" />
                  <span>{role.title}</span>
                </div>
                <div className="text-[11px] text-white/50 pl-6 leading-normal">
                  {role.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Main Benefit Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#142219] to-[#1F1822] border-l-4 border-[#63DCA8] border-y border-r border-white/10 text-left">
            <div className="text-[11px] uppercase tracking-wider text-[#63DCA8] font-bold">Operational Clarity</div>
            <div className="text-base sm:text-lg font-bold font-display text-white mt-0.5">
              “You focus on your brand. The team supports the system.”
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
