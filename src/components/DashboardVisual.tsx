import { t, useLanguage } from '../i18n';
import React from 'react';

const CARDS = [
  { title: 'Content-Output', text: 'Inhalte planen und freigeben.' },
  { title: 'Aktive Gespräche', text: 'Interessen verstehen und antworten.' },
  { title: 'Angebote', text: 'Produkte und Payment-Links verwalten.' },
  { title: 'Verkäufe', text: 'Abgeschlossene Käufe auswerten.' },
  { title: 'Wiederkehrende Käufer', text: 'Kontakte pflegen und Follow-ups planen.' },
  { title: 'Automatisierung', text: 'KI übernimmt Routineaufgaben.' },
];

export const DashboardVisual: React.FC = () => {
  useLanguage();
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="w-full bg-[#111012] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl">
        <div className="border-b border-white/10 pb-4 mb-6">
          <h3 className="text-sm font-bold text-white font-display">{t("Dein Creator-Business im Überblick")}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CARDS.map(({ title, text }) => (
            <div key={title} className="rounded-2xl border border-white/5 bg-[#171618] p-4 text-left hover:border-[#20C997]/20 hover:bg-[#1c1b1e] transition-colors">
              <h4 className="text-sm font-bold text-white">{t(title)}</h4>
              <p className="text-xs text-white/60 leading-relaxed mt-2">{t(text)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
