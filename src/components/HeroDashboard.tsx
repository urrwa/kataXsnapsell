import { AnimatedButton } from './AnimatedButton';
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, Check, ChevronDown, LayoutDashboard, MessageCircle, MoreHorizontal, Plus, ShoppingBag, Sparkles, Users, Zap } from 'lucide-react';
import { t, useLanguage } from '../i18n';

const navigation = [
  { label: 'Übersicht', icon: LayoutDashboard },
  { label: 'Dein Content', icon: Sparkles },
  { label: 'Gespräche', icon: MessageCircle },
  { label: 'Deine Käufer', icon: Users },
  { label: 'Deine Produkte', icon: ShoppingBag },
];
const chartPaths = {
  week: 'M0 126 L22 121 L43 128 L63 105 L84 110 L105 89 L126 100 L147 83 L168 90 L189 66 L210 72 L231 45 L252 55 L273 28 L294 42 L315 24 L336 31 L360 10',
  month: 'M0 130 L22 133 L43 117 L63 122 L84 100 L105 116 L126 96 L147 76 L168 82 L189 52 L210 60 L231 39 L252 51 L273 19 L294 33 L315 14 L336 23 L360 6',
};

export function HeroDashboard({ paused }: { paused: boolean }) {
  useLanguage();
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 75, damping: 22 });
  const rotateY = useSpring(mouseX, { stiffness: 75, damping: 22 });
  const followPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (paused || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 5);
    mouseY.set(-((event.clientY - rect.top) / rect.height - 0.5) * 4);
  };

  return (
    <div className="dashboard-presentation"><div className="dashboard-stage" onPointerMove={followPointer} onPointerLeave={() => { mouseX.set(0); mouseY.set(0); }}>
      <div className="dashboard-floor" aria-hidden="true" />
      <motion.div className="dashboard-parallax" style={{ rotateX: paused ? 0 : rotateX, rotateY: paused ? 0 : rotateY }}>
        <div className="dashboard-laptop">
          <div className="dashboard-screen">
            <div className="dashboard-camera" aria-hidden="true" />
            <div className="dashboard-app">
              <aside className="dashboard-sidebar" aria-hidden="true">
                <div className="dashboard-wordmark"><span className="snapsell-mark"><Zap size={15} fill="currentColor" /></span>SnapSell</div>
                <div className="dashboard-workspace"><span>K</span> {t('Dein Workspace')} <ChevronDown size={9} /></div>
                {navigation.map(({ label, icon: Icon }, index) => <div key={label} className={`dashboard-nav-item ${index === 0 ? 'is-active' : ''}`}><Icon size={12} />{t(label)}</div>)}
                <div className="dashboard-sidebar-bottom"><span className="dashboard-profile">K</span><div>Katharina<small>{t('Creator Workspace')}</small></div></div>
              </aside>
              <div className="dashboard-main">
                <div className="dashboard-toolbar"><div><span className="dashboard-breadcrumb">{t('Dein Workspace')} /</span><h2>{t('Dein Business im Flow.')}</h2></div><span className="dashboard-demo">{t('Demo-Workspace')}</span></div>
                <div className="dashboard-chart-panel">
                  <div className="dashboard-chart-heading"><div><span>{t('Dein Content-Plan')}</span><strong>{period === 'week' ? '12' : '48'} <small>{t('geplante Inhalte')}</small></strong></div><div className="dashboard-period" role="group" aria-label={t('Vorschauzeitraum')}>
                    <AnimatedButton animationVariant="compact" type="button" aria-pressed={period === 'week'} onClick={() => setPeriod('week')}>{t('Woche')}</AnimatedButton>
                    <AnimatedButton animationVariant="compact" type="button" aria-pressed={period === 'month'} onClick={() => setPeriod('month')}>{t('Monat')}</AnimatedButton>
                  </div></div>
                  <div className="dashboard-chart" aria-hidden="true">
                    <div className="chart-grid"><span /><span /><span /></div>
                    <svg viewBox="0 0 360 155" preserveAspectRatio="none"><defs><linearGradient id="hero-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#20C997" stopOpacity=".27" /><stop offset="100%" stopColor="#20C997" stopOpacity="0" /></linearGradient></defs><path d={`${chartPaths[period]} L360 155 L0 155 Z`} fill="url(#hero-chart-fill)" /><path key={period} className="dashboard-chart-line" d={chartPaths[period]} fill="none" stroke="#5ee2b9" strokeWidth="2" pathLength="1" /></svg>
                  </div>
                  <div className="dashboard-chart-axis"><span>{t('Planen')}</span><span>{t('Erstellen')}</span><span>{t('Freigeben')}</span><span>{t('Veröffentlichen')}</span></div>
                </div>
                <div className="dashboard-lower-grid">
                  <div className="dashboard-mini-panel"><div className="dashboard-panel-heading">{t('Dein Content')}<MoreHorizontal size={12} /></div><div className="dashboard-content-row"><span className="dashboard-file-icon"><Sparkles size={14} /></span><div>{t('Dein digitales Lookbook')}<small>01 / {t('Entwurf')}</small></div><span className="dashboard-status-dot" /></div><div className="dashboard-content-row"><span className="dashboard-file-icon muted"><ShoppingBag size={14} /></span><div>{t('Digitales Workbook')}<small>02 / {t('In Planung')}</small></div><span className="dashboard-status-dot muted" /></div></div>
                  <div className="dashboard-mini-panel"><div className="dashboard-panel-heading">{t('Dein System')}<Plus size={12} /></div>{['AI Content Creation', 'AI Chat Support', 'Creator CRM'].map(label => <div key={label} className="dashboard-system-row"><span><Check size={10} /></span>{t(label)}<i /></div>)}</div>
                </div>
                <div className="dashboard-app-footer"><span><i />{t('Alles an einem Ort.')}</span><span>{t('Illustrative Vorschau')}</span></div>
              </div>
            </div>
          </div>
          <div className="dashboard-keyboard" aria-hidden="true"><div /></div>
        </div>
        <div className="dashboard-floating dashboard-notifications">
          <div className="floating-card-heading">{t('Weniger Routine. Mehr Freiraum.')}<Sparkles size={13} /></div>
          <div className="notification-item"><span><MessageCircle size={17} /></span><div><strong>{t('Dein AI Chat unterstützt dich.')}</strong><p>{t('Antworten in deinem Stil vorbereitet.')}</p></div></div>
          <div className="notification-item"><span><ShoppingBag size={17} /></span><div><strong>{t('Dein Angebot ist bereit.')}</strong><p>{t('Ein Link. Direkt zu deinen Käufern.')}</p></div></div>
          <div className="notification-item"><span><Check size={17} /></span><div><strong>{t('Du behältst die Kontrolle.')}</strong><p>{t('Dein Content. Deine finale Freigabe.')}</p></div></div>
        </div>
        <div className="dashboard-floating dashboard-connected">
          <div className="floating-card-heading">{t('Dein verbundenes System')}<ArrowUpRight size={14} /></div>
          {[{ icon: Sparkles, label: 'AI Content', description: 'Deine Kreativität' }, { icon: MessageCircle, label: 'AI Chat', description: 'Deine Gespräche' }, { icon: Users, label: 'SnapSell CRM', description: 'Deine Beziehungen' }].map(({ icon: Icon, label, description }) => <div className="connected-item" key={label}><span><Icon size={15} /></span><div><strong>{t(label)}</strong><small>{t(description)}</small></div><Check size={12} /></div>)}
        </div>
      </motion.div>
    </div>
    <div className="dashboard-mobile-controls" role="group" aria-label={t('Vorschauzeitraum')}>
      <span>{t('Illustrative Vorschau')}</span>
      <AnimatedButton animationVariant="compact" type="button" aria-pressed={period === 'week'} onClick={() => setPeriod('week')}>{t('Woche')}</AnimatedButton>
      <AnimatedButton animationVariant="compact" type="button" aria-pressed={period === 'month'} onClick={() => setPeriod('month')}>{t('Monat')}</AnimatedButton>
    </div></div>
  );
}
