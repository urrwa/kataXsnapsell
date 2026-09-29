import { AnimatedButton } from './AnimatedButton';
import { t, useLanguage } from '../i18n';
import React, { useState, useEffect } from 'react';
import { Send, CheckCheck, UserCheck, ShoppingBag, Sparkles, RefreshCw } from 'lucide-react';

export const InteractiveChatMockup: React.FC = () => {
  useLanguage();

  const [step, setStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [handedOver,setHandedOver] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full max-w-[360px] mx-auto rounded-[36px] p-3.5 bg-gradient-to-b from-[#262626] to-[#121113] border-4 border-[#333] shadow-2xl shadow-black/80 text-left">
      {/* Phone speaker notch */}
      <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
        <div className="w-10 h-1 bg-white/20 rounded-full" />
      </div>

      {/* Screen Container */}
      <div className="bg-[#0D0D0E] rounded-[28px] overflow-hidden border border-white/5 flex flex-col h-[510px]">
        {/* Chat Header */}
        <div className="px-4 py-3 bg-[#171618] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop"
                alt={t("Creator avatar")}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#20C997]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#171618]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{t("Creatorin · AI-Demo")}</span>
                <span className="bg-[#20C997]/20 text-[#20C997] text-[9px] px-1.5 py-0.2 rounded font-semibold uppercase">{t(" BEISPIEL ")}</span>
              </div>
              <div className="text-[10px] text-white/50">{t("Fiktives Gespräch · keine echten Daten")}</div>
            </div>
          </div>
          <AnimatedButton animationVariant="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={t(isPlaying ? "Demo pausieren" : "Demo fortsetzen")}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </AnimatedButton>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 p-3.5 space-y-3 overflow-y-auto text-xs">
          {/* Buyer Message 1 */}
          <div className="flex justify-end">
            <div className="bg-[#20C997] text-white rounded-2xl rounded-tr-none px-3.5 py-2 max-w-[80%] shadow">
              <p>{t("Hey! Dein letzter Content gefällt mir. Gibt es ein Lookbook mit deinen Styling-Ideen?")}</p>
              <span className="text-[9px] text-white/70 block text-right mt-0.5">{t("23:42")}</span>
            </div>
          </div>

          {/* AI Reply 1 */}
          {t(step >= 1 && (
            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-[#1C1B1E] text-white/90 rounded-2xl rounded-tl-none px-3.5 py-2.5 max-w-[85%] border border-white/5">
                <div className="flex items-center gap-1 text-[10px] text-[#20C997] font-medium mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{t("AI Assistenz")}</span>
                </div>
                <p>{t("Hey! Ja, gern. Suchst du das komplette Lookbook oder ein kleines Paket mit Styling-Ideen?")}</p>
              </div>
            </div>
          ))}

          {/* Interactive Options / Interest selection */}
          {t(step >= 2 && (
            <div className="space-y-1.5 pl-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">{t(" Was interessiert dich? ")}</div>
              <div className="flex flex-wrap gap-1.5">
                <AnimatedButton
                  onClick={() => {setIsPlaying(false);setStep(3);}}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                    step >= 3
                      ? 'bg-[#20C997] text-white border-[#20C997]'
                      : 'bg-white/5 text-white/80 border-white/10 hover:border-[#20C997]'
                  }`}
                >{t(" ✨ Das komplette Lookbook ")}</AnimatedButton>
                <AnimatedButton
                  onClick={() => setStep(3)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-white/70 border border-white/10 hover:border-white/30"
                >{t(" 🌿 Das kleine Styling-Paket ")}</AnimatedButton>
              </div>
            </div>
          ))}

          {/* SnapSell Purchase Card */}
          {t(step >= 3 && (
            <div className="bg-[#1A181C] border border-[#20C997]/40 rounded-xl p-3 shadow-lg animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between text-[11px] text-[#20C997] font-semibold mb-1">
                <span className="flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t("SnapSell-Angebot · Demo")}</span>
                </span>
                <span className="text-white font-mono font-bold">{t("Beispielpreis")}</span>
              </div>
              <div className="text-white text-xs font-semibold">{t("Dein digitales Lookbook")}</div>
              <div className="text-[10px] text-white/60 mt-0.5">{t("Bilder und persönliche Styling-Ideen")}</div>
              <AnimatedButton
                onClick={() => {setIsPlaying(false);setStep(4);}}
                className="w-full mt-2.5 py-1.5 rounded-lg bg-[#20C997] hover:bg-[#169B74] text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
              >
                <span>{t("SnapSell-Link in der Demo öffnen")}</span>
              </AnimatedButton>
            </div>
          ))}

          {/* Human Handover Status */}
          {t(step >= 4 && (
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 flex items-center justify-between animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] text-white/80">{t("Persönliche Frage? Übergabe ans Team:")}</span>
              </div>
              <AnimatedButton onClick={() => {setIsPlaying(false);setHandedOver(true);}} className="text-[10px] bg-white/10 hover:bg-white/20 text-white font-medium px-2 py-1 rounded">
                {t(handedOver ? 'Vorgemerkt · Demo' : 'Übergabe')}
              </AnimatedButton>
            </div>
          ))}
        </div>

        {/* Bottom input simulation */}
        <div className="p-2.5 bg-[#141416] border-t border-white/10 flex items-center gap-2">
          <div className="flex-1 bg-black/50 text-white/40 text-[11px] px-3 py-2 rounded-full border border-white/5">{t(" Demo: nächsten Schritt ansehen … ")}</div>
          <AnimatedButton animationVariant="icon" aria-label={t("Nächsten Demo-Schritt anzeigen")} onClick={() => {setIsPlaying(false);setStep(s => s >= 4 ? 1 : s + 1);}} className="w-8 h-8 rounded-full bg-[#20C997] text-white flex items-center justify-center hover:bg-[#169B74] transition-colors">
            <Send className="w-3.5 h-3.5" />
          </AnimatedButton>
        </div>
      </div>

      {/* Step progress lines */}
      <div className="flex justify-center gap-1.5 mt-2.5">
        {t([1, 2, 3, 4].map((s) => (
          <AnimatedButton
            key={s}
            onClick={() => setStep(s)}
            aria-pressed={step === s}
            className="group flex h-6 w-8 items-center justify-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#20C997]"
            aria-label={t(`Chat-Schritt anzeigen ${s}`)}
          >
            <span aria-hidden="true" className={`h-1 w-full rounded-full transition-colors ${
              step === s ? 'bg-[#20C997]' : 'bg-white/20 group-hover:bg-white/40'
            }`} />
          </AnimatedButton>
        )))}
      </div>
    </div>
  );
};
