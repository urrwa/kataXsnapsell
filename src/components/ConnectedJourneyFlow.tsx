import { AnimatedButton } from './AnimatedButton';
import { t, useLanguage } from '../i18n';
import React, { useState } from 'react';
import { Users, Camera, MessageSquare, ShoppingBag, Repeat, ArrowRight, ArrowDown, Check } from 'lucide-react';

const JOURNEY_STEPS = [
{id:1,phase:'Schritt 01',title:'Aufmerksamkeit',shortRole:'Content macht sichtbar',detail:'AI Content macht deine Marke sichtbar.',icon:Camera,previewBadge:'Deine Marke',metric:'Content freigeben'},
{id:2,phase:'Schritt 02',title:'Gespräch',shortRole:'Interesse verstehen',detail:'AI Chat reagiert auf Interesse und beantwortet Fragen.',icon:MessageSquare,previewBadge:'AI Chat Support',metric:'Fragen beantworten'},
{id:3,phase:'Schritt 03',title:'Organisation',shortRole:'Kontakte im Blick',detail:'Das CRM speichert Kontakte, Interessen und Gespräche.',icon:Users,previewBadge:'Creator CRM',metric:'Kontakt organisieren'},
{id:4,phase:'Schritt 04',title:'Verkauf',shortRole:'Das passende Angebot',detail:'Der passende Payment-Link wird direkt verschickt.',icon:ShoppingBag,previewBadge:'SnapSell-Technologie',metric:'Angebot → Zahlung'},
{id:5,phase:'Schritt 05',title:'Wachstum',shortRole:'Verbindungen erhalten',detail:'Follow-ups fördern weitere Käufe.',icon:Repeat,previewBadge:'Käuferbindung',metric:'Persönlich nachfassen'}
];

export const ConnectedJourneyFlow: React.FC = () => {
  useLanguage();

  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <p className="text-xs text-white/60 mb-6">{t("Content → Chat → CRM → Angebot → Zahlung → Follow-up")}</p>
      {/* Desktop Horizontal Journey Timeline */}
      <div className="hidden md:grid grid-cols-5 gap-3 w-full relative mb-8">
        {/* Connector Line behind steps */}
        <div className="absolute top-1/2 left-10 right-10 -translate-y-1/2 h-[2px] bg-white/10 z-0" />
        <div 
          className="absolute top-1/2 left-10 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#20C997] to-[#169B74] z-0 transition-all duration-500"
          style={{ width: `${((activeStep - 1) / 4) * 85}%` }}
        />

        {t(JOURNEY_STEPS.map((step) => {
          const isActive = step.id === activeStep;
          const isPassed = step.id < activeStep;
          const Icon = step.icon;

          return (
            <AnimatedButton
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`relative z-10 p-4 rounded-2xl text-left transition-all duration-300 border ${
                isActive
                  ? 'bg-[#1C1A1E] border-[#20C997] shadow-xl shadow-[#20C997]/20 scale-105'
                  : isPassed
                  ? 'bg-[#141416] border-white/20 hover:border-white/40'
                  : 'bg-[#100F12] border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive ? 'bg-[#20C997] text-white' : isPassed ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'
                }`}>
                  {t(isPassed ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />)}
                </div>
                <span className="text-[10px] font-mono text-white/50">{t(step.phase)}</span>
              </div>
              <div className="text-sm font-bold text-white font-display">{t(step.title)}</div>
              <div className="text-xs text-[#20C997] font-medium mt-0.5">{t(step.shortRole)}</div>
            </AnimatedButton>
          );
        }))}
      </div>

      {/* Mobile Vertical Sequence */}
      <div className="md:hidden flex flex-col space-y-2.5 w-full mb-6">
        {t(JOURNEY_STEPS.map((step) => {
          const isActive = step.id === activeStep;
          const Icon = step.icon;

          return (
            <AnimatedButton
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`p-3.5 rounded-xl text-left border flex items-center justify-between transition-all ${
                isActive
                  ? 'bg-[#1C1A1E] border-[#20C997] shadow-lg shadow-[#20C997]/20'
                  : 'bg-[#121113] border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-[#20C997] text-white' : 'bg-white/5 text-white/50'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-white/40">{t(step.phase)}</span>
                    <span className="text-sm font-bold text-white">{t(step.title)}</span>
                  </div>
                  <div className="text-xs text-[#20C997]">{t(step.shortRole)}</div>
                </div>
              </div>
              <ArrowDown className={`w-4 h-4 ${isActive ? 'text-[#20C997]' : 'text-white/20'}`} />
            </AnimatedButton>
          );
        }))}
      </div>

      {/* Dynamic Detail Card for the active step */}
      {t((() => {
        const active = JOURNEY_STEPS.find((s) => s.id === activeStep) || JOURNEY_STEPS[0];
        return (
          <div className="w-full bg-[#141416] border border-white/10 rounded-2xl p-6 sm:p-8 text-left shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="bg-[#20C997]/20 text-[#20C997] text-xs font-mono font-bold px-2.5 py-0.5 rounded-full">
                  {t(active.phase)}{t(" im Überblick ")}</span>
                <span className="text-xs text-[#D7BE8A] font-medium">{t(active.previewBadge)}</span>
              </div>
              <h4 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                <span>{t(active.title)}</span>
                <span className="text-white/40 text-lg font-normal">{t("— “")}{t(active.shortRole)}{t("”")}</span>
              </h4>
              <p className="text-sm text-white/70 leading-relaxed">
                {t(active.detail)}
              </p>
            </div>

            <div className="bg-[#0B0A0C] border border-white/10 p-5 rounded-2xl text-center min-w-[200px] w-full md:w-auto">
              <div className="text-[11px] uppercase tracking-wider text-white/40 font-semibold mb-1">{t(" DEIN NÄCHSTER SCHRITT ")}</div>
              <div className="text-xl font-bold text-white font-mono">{t(active.metric)}</div>
              <div className="text-[10px] text-emerald-400 mt-1 font-medium">{t("Illustrativer Ablauf")}</div>
            </div>
          </div>
        );
      })())}
    </div>
  );
};
