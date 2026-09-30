import { AnimatedLink, AnimatedButton } from './AnimatedButton';
import { t, useLanguage } from '../i18n';
import React, { useEffect, useRef, useState, useId } from 'react';
import { ArrowUpRight, Check, ChevronDown, Users, MessageSquare, ShoppingBag } from 'lucide-react';
import '../faq.css';
export const incomeNotice = '$20.000 pro Monat sind ein ambitioniertes Ziel und kein garantiertes Einkommen. Ergebnisse hängen unter anderem von Reichweite, Zielgruppe, Angebot, Preisen, Conversion, Konsistenz, Marktbedingungen und persönlicher Umsetzung ab.';
export function ApplyButton({children='Jetzt für die Academy bewerben'}:{children?:React.ReactNode}) {
  useLanguage();
 return <AnimatedLink animateArrow href="#section-13" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#20C997] hover:bg-[#169B74] text-[#080808] px-6 py-3 text-sm font-bold transition-colors">{t(children)}</AnimatedLink>; }
export function SectionProgress(){
  useLanguage();
const [active,setActive]=useState(1);useEffect(()=>{const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActive(Number(entry.target.id.split('-')[1]));}),{rootMargin:'-20% 0px -65% 0px'});document.querySelectorAll('main > section').forEach(el=>observer.observe(el));return()=>observer.disconnect();},[]);return <div className="hidden xl:block fixed right-4 bottom-6 z-40 rounded-full border border-white/15 bg-black/70 px-3 py-2 text-xs font-mono text-white/70" aria-label={t(`Sektion ${active} von 13`)}>{t(String(active).padStart(2,'0'))}{t(" / 13")}</div>;}
export const academyModules=[['Deine Marke','Finde deine Positionierung und entwickle deinen persönlichen Stil.','Notiere, für wen du Content machst und was deine Marke besonders macht.'],['Dein Content-System','Plane und erstelle Content, der zu dir und deiner Zielgruppe passt.','Lege deine Themen, Formate und einen realistischen Wochenplan fest.'],['Deine AI-Unterstützung','Nutze KI für Content, Gespräche und wiederkehrende Aufgaben.','Bestimme deine Sprache, deine Grenzen und deine Freigaben.'],['Deine Produkte','Verwandle deine Inhalte in attraktive digitale Angebote.','Beschreibe den Nutzen und den Umfang deines ersten digitalen Angebots.'],['Dein CRM-System','Organisiere Käufer, Angebote, Gespräche und Follow-ups.','Ordne Kontakte, dokumentiere Interessen und plane den nächsten Schritt.'],['Dein Wachstum','Verbessere Social Media, Verkäufe und Käuferbindung.','Prüfe regelmäßig, welche Inhalte und Angebote zu deiner Zielgruppe passen.']];
export function AcademySection(){
  useLanguage();
  return (
    <section id="section-9" className="landing-section bg-[#0A0A0C] px-4 sm:px-6 lg:px-8" aria-label={t("The Katharina Method")}>
      <div className="max-w-7xl mx-auto w-full space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-widest font-bold text-[#20C997]">{t("THE KATHARINA METHOD")}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white">
            {t("Deine Marke. Dein Business.")}<br/>
            <span className="text-[#20C997]">{t("Deine Zukunft.")}</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70">{t("In der Katharina Academy lernst du das komplette System Schritt für Schritt.")}</p>
        </div>

        {/* Two-column: cards + glow panel */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* Cards grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {academyModules.map(([title, text], i) => (
              <div
                key={title}
                className="rounded-2xl border border-white/8 bg-[#111013] p-6 text-left hover:border-[#20C997]/30 hover:bg-[#141116] transition-colors"
              >
                <p className="text-[10px] font-mono font-bold tracking-widest text-[#20C997]/70 mb-4">{t("MODUL 0")}{i + 1}</p>
                <h3 className="text-base font-bold text-white leading-snug">{t(title)}</h3>
                <p className="text-xs text-white/55 mt-2 leading-relaxed">{t(text)}</p>
              </div>
            ))}
          </div>

          {/* Right glow panel */}
          <div className="lg:w-72 xl:w-80 rounded-2xl overflow-hidden relative flex-shrink-0 min-h-[280px] lg:min-h-0" style={{ background: '#0d0d10' }}>
            {/* Animated glow columns */}
            <div className="absolute inset-0" aria-hidden="true" style={{
              background: 'linear-gradient(180deg, #0d0d10 0%, #0d1a18 40%, #0d0d10 100%)',
            }}>
              {/* vertical light streaks */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 18px, rgba(32,201,151,0.03) 18px, rgba(32,201,151,0.03) 19px)`,
              }}/>
              {/* central glow */}
              <div style={{
                position: 'absolute',
                top: '20%', left: '50%',
                transform: 'translateX(-50%)',
                width: '180px', height: '340px',
                background: 'radial-gradient(ellipse 80px 200px at 50% 40%, rgba(32,201,151,0.55) 0%, rgba(32,201,151,0.12) 50%, transparent 80%)',
                animation: 'glowPulse 4s ease-in-out infinite',
              }}/>
              {/* second softer glow below */}
              <div style={{
                position: 'absolute',
                top: '55%', left: '50%',
                transform: 'translateX(-50%)',
                width: '140px', height: '200px',
                background: 'radial-gradient(ellipse 60px 120px at 50% 50%, rgba(32,201,151,0.3) 0%, transparent 70%)',
                animation: 'glowPulse 4s ease-in-out 1.5s infinite',
              }}/>
            </div>
            {/* Bottom text */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white text-xl font-bold leading-snug">{t("Dein ganzes System.")}<br/>{t("Eine Plattform.")}</p>
              <ApplyButton>{t("Jetzt starten")}</ApplyButton>
            </div>
            <style>{`@keyframes glowPulse{0%,100%{opacity:.8;transform:translateX(-50%) scaleY(1)}50%{opacity:1;transform:translateX(-50%) scaleY(1.06)}}`}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
export function CRMDetails(){
  useLanguage();
const [active,setActive]=useState(0);const tabs=['Käuferprofil','Gespräch','Sales-Pipeline','Angebot'];const features=['Käuferprofile','Kontakte und Notizen','Gesprächsverläufe','Tags und Zielgruppen','einfache Sales-Pipeline','Aufgaben und Follow-ups','Medienbibliothek','Produkte und Angebote','Verkäufe und Analysen','Teamzugänge'];return <div className="w-full max-w-4xl space-y-5 text-left"><div className="grid sm:grid-cols-2 gap-5"><div className="rounded-2xl bg-[#141416] border border-white/10 p-5"><h3 className="text-white font-bold mb-3">{t("Direkt verkaufen")}</h3><p className="text-sm text-white/70 leading-relaxed">{t("Content hochladen → Produkt erstellen → Preis festlegen → Payment-Link teilen → Zahlung erhalten → Inhalt ausliefern")}</p></div><div className="rounded-2xl bg-[#141416] border border-white/10 p-5"><h3 className="text-white font-bold mb-3">{t("Business verwalten")}</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{t(features.map(item=><span key={item} className="text-xs text-white/70 flex gap-2"><Check className="w-3 h-3 text-[#20C997] shrink-0"/>{t(item)}</span>))}</div></div></div><div className="rounded-2xl bg-[#141416] border border-white/10 p-5"><div className="flex flex-wrap gap-2 mb-5" aria-label={t("CRM-Vorschau")}>{t(tabs.map((name,i)=><AnimatedButton key={name} aria-pressed={active===i} onClick={()=>setActive(i)} className={`rounded-full px-3 py-2 text-xs border ${active===i?'border-[#20C997] text-[#20C997]':'border-white/10 text-white/70'}`}>{t(name)}</AnimatedButton>))}</div><div aria-live="polite" className="grid sm:grid-cols-3 gap-4 min-h-28">{t((active===0?['Demo-Kontakt A','Interesse: Content-Planung','Notiz: Rückfrage zum Workbook']:active===1?['Neue Nachricht: Ich suche Content-Ideen.','Antwort: Welches Format interessiert dich?','Nächster Schritt: persönlich nachfassen']:active===2?['Interesse erkannt','Angebot geteilt','Follow-up geplant']:['Digitales Workbook · Beispiel','Payment-Link → Zahlung','Inhalt ausliefern']).map((line,i)=><div key={line} className="p-4 rounded-xl bg-black/40 border border-white/10"><span className="text-xs text-[#20C997]">{t("0")}{t(i+1)}</span><p className="text-sm text-white/80 mt-2">{t(line)}</p></div>))}</div><p className="text-xs text-white/50 mt-4">{t("Illustrative CRM-Vorschau · keine echten Kundendaten oder Zahlungen.")}</p></div></div>;}
const MEXICO_ITEMS = [
  'Fotoshootings',
  'Videoproduktion',
  'Networking',
  'Coaching',
  'AI Training',
  'SnapSell Setup',
  'Social Media',
  'Preisstrategie',
];

export function MexicoExperience(){
  useLanguage();
  return (
    <div id="mexico-experience" className="w-full rounded-3xl border border-white/10 bg-[#141416] overflow-hidden text-left">
      {/* Photo banner */}
      <div className="relative w-full h-52 sm:h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=85&w=1200&auto=format&fit=crop"
          alt="Mexico Creator Villa"
          className="w-full h-full object-cover object-center"
          style={{ animation: 'mexicoZoom 14s ease-in-out infinite alternate' }}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.5) 55%,rgba(20,20,22,0.98) 100%)' }} />
        <div className="absolute bottom-0 left-0 p-6 sm:p-8 space-y-1">
          <p className="text-[10px] text-[#20C997] uppercase tracking-widest font-bold">{t("KATHARINA CREATOR EXPERIENCE")}</p>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">{t("Masterclass in Mexiko.")}</h3>
          <p className="text-xs text-[#D7BE8A] flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {t("Katharina Creator Villa – Mexico")}
          </p>
        </div>
      </div>

      {/* Pills grid */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap gap-2">
          {MEXICO_ITEMS.map((label, i) => (
            <div
              key={label}
              className="px-3.5 py-2 rounded-full border border-white/10 bg-white/3 text-white/80 text-xs font-semibold hover:border-[#20C997]/40 hover:bg-[#20C997]/8 transition-all"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {t(label)}
            </div>
          ))}
        </div>

        <ApplyButton>{t("Jetzt bewerben")}</ApplyButton>
      </div>

      <style>{`@keyframes mexicoZoom{from{transform:scale(1.03)}to{transform:scale(1.09) translateX(-1%)}}`}</style>
    </div>
  );
}
const FAQ_ITEMS: [string, string][] = [
  ['Muss ich bereits eine große Reichweite haben?', 'Nein. Die Academy ist für neue, aktive und etablierte Creatorinnen geeignet.'],
  ['Muss ich technisch erfahren sein?', 'Nein. Das System wird einfach und Schritt für Schritt erklärt.'],
  ['Ersetzt KI meine Persönlichkeit?', 'Nein. KI unterstützt deine Arbeit. Du bestimmst deine Identität, deinen Stil, deine Grenzen und deine Freigaben.'],
  ['Ist eine internationale Reise garantiert?', 'Nein. Events, Produktionen und Reisen sind zusätzliche Möglichkeiten für ausgewählte Mitglieder.'],
  ['Sind bestimmte Umsätze garantiert?', 'Nein. Die Academy stellt Systeme, Wissen und Unterstützung bereit. Ergebnisse hängen von deiner Ausgangssituation, deinem Angebot und deiner Umsetzung ab.'],
];

interface FaqItemProps {
  key?: React.Key;
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answer, index, isOpen, onToggle }: FaqItemProps) {
  const uid = useId();
  const btnId = `faq-btn-${uid}-${index}`;
  const panelId = `faq-panel-${uid}-${index}`;
  const contentRef = useRef<HTMLDivElement>(null);

  // Animate height
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + 'px';
      el.style.opacity = '1';
    } else {
      el.style.maxHeight = '0px';
      el.style.opacity = '0';
    }
  }, [isOpen]);

  return (
    <div className={`faq-row${isOpen ? ' faq-row--open' : ''}`}>
      <h3 className="faq-row-heading">
        <button
          id={btnId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="faq-row-btn"
          onClick={onToggle}
        >
          <span className="faq-row-q">{t(question)}</span>
          <ChevronDown className={`faq-chevron${isOpen ? ' faq-chevron--open' : ''}`} size={18} aria-hidden="true" />
        </button>
      </h3>
      <div
        ref={contentRef}
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className="faq-row-body"
        style={{ maxHeight: '0px', opacity: '0' }}
      >
        <p className="faq-row-answer">{t(answer)}</p>
      </div>
    </div>
  );
}

export function FAQAccordion() {
  useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <section className="faq-section" aria-label={t('Häufige Fragen')}>
      <div className="faq-inner">
        <h2 className="faq-heading">{t('FAQ')}</h2>
        <div className="faq-list" role="list">
          {FAQ_ITEMS.map(([q, a], i) => (
            <FaqItem
              key={q}
              question={q}
              answer={a}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export function useFocusTrap(open:boolean,close:()=>void){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{if(!open)return;const prior=document.activeElement as HTMLElement;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';const nodes=():HTMLElement[]=>Array.from(ref.current?.querySelectorAll('button,a[href],input,select,[tabindex="0"]')||[]) as HTMLElement[];nodes()[0]?.focus();const key=(e:KeyboardEvent)=>{if(e.key==='Escape')close();if(e.key==='Tab'){const list=nodes();if(e.shiftKey&&document.activeElement===list[0]){e.preventDefault();list.at(-1)?.focus();}else if(!e.shiftKey&&document.activeElement===list.at(-1)){e.preventDefault();list[0]?.focus();}}};document.addEventListener('keydown',key);return()=>{document.removeEventListener('keydown',key);document.body.style.overflow=overflow;prior?.focus();};},[open]);return ref;}

