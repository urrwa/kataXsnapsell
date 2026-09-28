import React, { useState, useEffect } from 'react';
import { Send, CheckCheck, UserCheck, ShoppingBag, Sparkles, RefreshCw } from 'lucide-react';

export const InteractiveChatMockup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full max-w-[360px] mx-auto rounded-[36px] p-3.5 bg-gradient-to-b from-[#262626] to-[#0D1711] border-4 border-[#333] shadow-2xl shadow-black/80 text-left">
      {/* Phone speaker notch */}
      <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
        <div className="w-10 h-1 bg-white/20 rounded-full" />
      </div>

      {/* Screen Container */}
      <div className="bg-[#0D0D0E] rounded-[28px] overflow-hidden border border-white/5 flex flex-col h-[510px]">
        {/* Chat Header */}
        <div className="px-4 py-3 bg-[#142219] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <span className="w-9 h-9 rounded-full bg-[#204832] flex items-center justify-center ring-2 ring-[#63DCA8]" aria-hidden="true"><Sparkles className="w-4 h-4 text-[#63DCA8]" /></span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#142219]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Kata • Official AI</span>
                <span className="bg-[#63DCA8]/20 text-[#63DCA8] text-[9px] px-1.5 py-0.2 rounded font-semibold uppercase">
                  Verified
                </span>
              </div>
              <div className="text-[10px] text-white/50">Active now • Instant reply</div>
            </div>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause auto-flow" : "Resume auto-flow"}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 p-3.5 space-y-3 overflow-y-auto text-xs">
          {/* Buyer Message 1 */}
          <div className="flex justify-end">
            <div className="bg-[#63DCA8] text-white rounded-2xl rounded-tr-none px-3.5 py-2 max-w-[80%] shadow">
              <p>Hey! Love your latest styling drops. Do you have the exclusive photo & recipe guides available?</p>
              <span className="text-[9px] text-white/70 block text-right mt-0.5">11:42 PM</span>
            </div>
          </div>

          {/* AI Reply 1 */}
          {step >= 1 && (
            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-[#192A20] text-white/90 rounded-2xl rounded-tl-none px-3.5 py-2.5 max-w-[85%] border border-white/5">
                <div className="flex items-center gap-1 text-[10px] text-[#63DCA8] font-medium mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Kata Assistant</span>
                </div>
                <p>Hey there! Yes, absolutely. I packaged the full Mediterranean styling collection + bonus presets this morning!</p>
              </div>
            </div>
          )}

          {/* Interactive Options / Interest selection */}
          {step >= 2 && (
            <div className="space-y-1.5 pl-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">
                Select your preferred package:
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setStep(3)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                    step >= 3
                      ? 'bg-[#63DCA8] text-white border-[#63DCA8]'
                      : 'bg-white/5 text-white/80 border-white/10 hover:border-[#63DCA8]'
                  }`}
                >
                  ✨ Full VIP Lookbook ($49)
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-white/70 border border-white/10 hover:border-white/30"
                >
                  🌿 Mini Presets Bundle ($19)
                </button>
              </div>
            </div>
          )}

          {/* SnapSell Purchase Card */}
          {step >= 3 && (
            <div className="bg-[#1A181C] border border-[#63DCA8]/40 rounded-xl p-3 shadow-lg animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between text-[11px] text-[#63DCA8] font-semibold mb-1">
                <span className="flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>SnapSell Instant Checkout</span>
                </span>
                <span className="text-white font-mono font-bold">$49.00</span>
              </div>
              <div className="text-white text-xs font-semibold">Mediterranean Editorial Bundle</div>
              <div className="text-[10px] text-white/60 mt-0.5">High-res gallery + exclusive style notes</div>
              <button
                onClick={() => setStep(4)}
                className="w-full mt-2.5 py-1.5 rounded-lg bg-[#63DCA8] hover:bg-[#20B777] text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
              >
                <span>Unlock Now with SnapSell</span>
              </button>
            </div>
          )}

          {/* Human Handover Status */}
          {step >= 4 && (
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 flex items-center justify-between animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] text-white/80">Need custom VIP advice? Transfer to Kata:</span>
              </div>
              <button className="text-[10px] bg-white/10 hover:bg-white/20 text-white font-medium px-2 py-1 rounded">
                Handover
              </button>
            </div>
          )}
        </div>

        {/* Bottom input simulation */}
        <div className="p-2.5 bg-[#101C14] border-t border-white/10 flex items-center gap-2">
          <div className="flex-1 bg-black/50 text-white/40 text-[11px] px-3 py-2 rounded-full border border-white/5">
            Type message or question...
          </div>
          <button className="w-8 h-8 rounded-full bg-[#63DCA8] text-white flex items-center justify-center hover:bg-[#20B777] transition-colors">
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step dots */}
      <div className="flex justify-center gap-1.5 mt-2.5">
        {[1, 2, 3, 4].map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={`w-2 h-2 rounded-full transition-all ${
              step === s ? 'w-5 bg-[#63DCA8]' : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Show chat step ${s}`}
          />
        ))}
      </div>
    </div>
  );
};
