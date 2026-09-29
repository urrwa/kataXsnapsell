import { AnimatedButton } from './AnimatedButton';
import { t, useLanguage } from '../i18n';
import React, { useState, useEffect } from 'react';
import { UploadCloud, DollarSign, Link2, CreditCard, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

const STEPS = [
  {
    step: 1,
    title: "Content hochladen",
    desc: "Lade deine freigegebenen Inhalte hoch und erstelle ein digitales Produkt.",
    icon: UploadCloud,
    badge: "Medienbibliothek",
    previewTitle: "Digitale Inhalte hochladen",
    mockupUI: () => (
      <div className="space-y-2.5 text-xs text-white/80">
        <div className="border-2 border-dashed border-[#20C997]/40 rounded-xl p-4 text-center bg-[#20C997]/5">
          <UploadCloud className="w-8 h-8 mx-auto text-[#20C997] mb-1.5" />
          <div className="font-semibold text-white">{t("Deine Inhalte auswählen")}</div>
          <div className="text-[10px] text-white/50">{t("Illustrative Vorschau · kein echter Upload")}</div>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
          <span className="truncate">{t("mediterranean_lookbook_4k.zip")}</span>
          <span className="text-[#D7BE8A] text-[10px] font-mono">{t("Beispieldatei")}</span>
        </div>
      </div>
    )
  },
  {
    step: 2,
    title: "Preis festlegen",
    desc: "Lege Inhalt, Umfang und Preis deines Angebots fest.",
    icon: DollarSign,
    badge: "Dein Angebot",
    previewTitle: "Produkt und Preis",
    mockupUI: () => (
      <div className="space-y-3 text-xs text-white/80">
        <div>
          <label className="text-[10px] uppercase text-white/40 font-semibold block mb-1">{t("Name des Angebots")}</label>
          <div className="p-2 rounded-lg bg-black/60 border border-white/10 text-white font-medium">{t(" Digitales Lookbook · Demo ")}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] uppercase text-white/40 font-semibold block mb-1">{t("Beispielpreis")}</label>
            <div className="p-2 rounded-lg bg-[#20C997]/10 border border-[#20C997]/40 text-[#20C997] font-bold font-mono">{t(" 49,00 € · Demo ")}</div>
          </div>
          <div>
            <label className="text-[10px] uppercase text-white/40 font-semibold block mb-1">{t("Zahlung")}</label>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-emerald-400 font-bold font-mono">{t(" Über Payment-Link ")}</div>
          </div>
        </div>
      </div>
    )
  },
  {
    step: 3,
    title: "Payment-Link teilen",
    desc: "Teile den passenden SnapSell-Link mit interessierten Käufern.",
    icon: Link2,
    badge: "Direkt teilen",
    previewTitle: "Dein SnapSell-Link",
    mockupUI: () => (
      <div className="space-y-3 text-xs text-white/80">
        <div className="p-3 rounded-xl bg-black/70 border border-white/10">
          <div className="text-[10px] text-white/40 mb-1">{t("Payment-Link · Platzhalter")}</div>
          <div className="flex items-center justify-between text-xs text-[#20C997] font-mono font-medium">
            <span className="truncate">{t("Beispiel-Link / dein-angebot")}</span>
            <span className="bg-[#20C997]/20 px-2 py-0.5 rounded text-[10px]">{t("Vorschau")}</span>
          </div>
        </div>
        <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-white/70">{t(" Teile deinen Link in deiner Kommunikation und in passenden Angeboten. ")}</div>
      </div>
    )
  },
  {
    step: 4,
    title: "Zahlung erhalten",
    desc: "Dein Käufer öffnet den Payment-Link und bezahlt das Angebot.",
    icon: CreditCard,
    badge: "Klarer Ablauf",
    previewTitle: "Zahlungsübersicht",
    mockupUI: () => (
      <div className="space-y-2.5 text-xs text-white/80">
        <div className="p-3 rounded-xl bg-[#18161A] border border-white/10 space-y-2">
          <div className="flex justify-between font-bold text-white">
            <span>{t("Digitales Lookbook")}</span>
            <span className="font-mono text-[#20C997]">{t("Beispielpreis")}</span>
          </div>
          <AnimatedButton onClick={() => window.dispatchEvent(new Event('snapsell-demo-next'))} className="w-full py-2 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-1.5 shadow">
            <span>{t("Zahlung")}</span> <span className="font-black text-sm">{t("Demo")}</span>
          </AnimatedButton>
          <div className="text-center text-[10px] text-white/40">{t("Keine echte Zahlung in dieser Vorschau")}</div>
        </div>
      </div>
    )
  },
  {
    step: 5,
    title: "Inhalt ausliefern",
    desc: "Nach erfolgreicher Zahlung wird der gekaufte Inhalt bereitgestellt.",
    icon: CheckCircle2,
    badge: "Auslieferung",
    previewTitle: "Inhalt bereitstellen",
    mockupUI: () => (
      <div className="space-y-2.5 text-xs text-white/80 text-center py-2">
        <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="font-bold text-white text-sm">{t("Zahlung bestätigt · Beispiel")}</div>
        <div className="text-[11px] text-white/60">{t("Der Käufer erhält Zugriff auf den freigegebenen Inhalt. Dies ist eine illustrative Vorschau.")}</div>
      </div>
    )
  }
];

export const SnapSellFlowMockup: React.FC = () => {
  useLanguage();

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  useEffect(() => { const next = () => setActiveStepIndex(4); window.addEventListener('snapsell-demo-next', next); return () => window.removeEventListener('snapsell-demo-next',next); }, []);
  const current = STEPS[activeStepIndex];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* 5 Step Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full mb-6">
        {t(STEPS.map((item, idx) => {
          const isActive = activeStepIndex === idx;
          const Icon = item.icon;
          return (
            <AnimatedButton
              key={item.step}
              aria-pressed={isActive}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-xl text-left transition-all border ${
                isActive
                  ? 'bg-[#1C1A1E] border-[#20C997] shadow-lg shadow-[#20C997]/20 ring-1 ring-[#20C997]'
                  : 'bg-[#121113]/80 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-[#20C997]' : 'text-white/40'}`}>{t(" 0")}{t(item.step)}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#20C997]' : 'text-white/40'}`} />
              </div>
              <div className="font-semibold text-xs text-white">{t(item.title)}</div>
            </AnimatedButton>
          );
        }))}
      </div>

      {/* Dominant Screen Preview Card */}
      <div className="w-full bg-[#141416] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col md:flex-row items-center gap-6 text-left">
        {/* Left Side: Mockup Screen */}
        <div className="w-full md:w-1/2 bg-[#0B0A0C] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-inner">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#20C997]" />
              <span className="text-xs font-bold text-white font-mono">{t(current.previewTitle)}</span>
            </div>
            <span className="text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded font-mono">{t(" SnapSell-Demo ")}</span>
          </div>

          {t(current.mockupUI())}
        </div>

        {/* Right Side: Step Details & Advantage */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#20C997] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("Schritt ")}{t(current.step)}{t(" von 5 · ")}{t(current.badge)}</span>
          </div>
          <h4 className="text-2xl font-bold font-display text-white">{t(current.title)}</h4>
          <p className="text-sm text-white/70 leading-relaxed">
            {t(current.desc)}
          </p>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-1">
            <div className="font-semibold text-white">{t("Direkt verkaufen:")}</div>
            <div className="text-white/60">{t("Content hochladen, Produkt erstellen, Preis festlegen, Payment-Link teilen, Zahlung erhalten und Inhalt ausliefern.")}</div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <AnimatedButton animateArrow
              onClick={() => setActiveStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0))}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#20C997] hover:text-white transition-colors"
            >
              <span>{t(activeStepIndex < STEPS.length - 1 ? "Nächster Schritt" : "Vorschau neu starten")}</span>
              
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
};
