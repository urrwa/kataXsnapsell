import React, { useEffect, useRef, useState } from 'react';
import { t, useLanguage } from '../i18n';
import { LayoutDashboard, Users, MessageCircle, GitBranch, Image, UserCheck } from 'lucide-react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Users, label: 'Creatorinnen' },
  { icon: MessageCircle, label: 'Nachrichten' },
  { icon: GitBranch, label: 'Pipeline' },
  { icon: Image, label: 'Inhalte' },
  { icon: UserCheck, label: 'Team' },
];

const CREATORS = [
  { name: 'Sophie M.', pct: 84, revenue: '€ 4.200' },
  { name: 'Lena K.', pct: 62, revenue: '€ 2.890' },
  { name: 'Mia R.', pct: 38, revenue: '€ 1.540' },
];

const MESSAGES = [
  { name: 'Anna B.', msg: 'Wann kommt das nächste Paket?', time: '09:14' },
  { name: 'Julia W.', msg: 'Super, danke für die Info!', time: '08:52' },
  { name: 'Sarah K.', msg: 'Ich hätte Interesse 😊', time: '08:30' },
];

const PIPELINE = [
  { label: 'Neu', count: 12, color: '#3a3a4a' },
  { label: 'Kontaktiert', count: 7, color: '#20C997' },
  { label: 'Aktiv', count: 4, color: '#169B74' },
  { label: 'Kunde', count: 2, color: '#0e7a5a' },
];

const CHART_POINTS = [18, 32, 24, 48, 38, 62, 55, 74, 66, 82, 70, 88];

function MiniChart({ animated }: { animated: boolean }) {
  const W = 200, H = 54;
  const max = Math.max(...CHART_POINTS);
  const pts = CHART_POINTS.map((v, i) => [
    (i / (CHART_POINTS.length - 1)) * W,
    H - (v / max) * (H - 6) - 3,
  ]);
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const fill = `${d} L${W},${H} L0,${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: H, display: 'block' }}>
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#20C997" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#20C997" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#cg)" />
      <path d={d} fill="none" stroke="#20C997" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        style={animated ? { strokeDasharray: 600, strokeDashoffset: 0, transition: 'stroke-dashoffset 1.2s ease' } : { strokeDasharray: 600, strokeDashoffset: 600 }} />
    </svg>
  );
}

export const SnapSellDashboardMockup: React.FC = () => {
  useLanguage();
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="ssd-browser" ref={ref}>
      {/* Browser chrome */}
      <div className="ssd-chrome">
        <span className="ssd-dot" style={{ background: '#FF5F57' }} />
        <span className="ssd-dot" style={{ background: '#FFBD2E' }} />
        <span className="ssd-dot" style={{ background: '#28C840' }} />
        <div className="ssd-url">app.snapsell.io / agentur</div>
      </div>

      <div className="ssd-body">
        {/* Sidebar */}
        <div className="ssd-sidebar">
          <div className="ssd-logo">SnapSell</div>
          {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
            <button key={label} className={`ssd-nav-item${active ? ' ssd-nav-item--active' : ''}`}>
              <Icon className="ssd-nav-icon" />
              <span>{t(label)}</span>
            </button>
          ))}
        </div>

        {/* Main grid */}
        <div className="ssd-main">
          {/* Row 1: Performance + Creators */}
          <div className="ssd-row-grid">
            {/* Performance */}
            <div className="ssd-panel ssd-panel--perf">
              <div className="ssd-panel-head">
                <span className="ssd-panel-title">{t('Umsatz')}</span>
                <span className="ssd-panel-badge">+18%</span>
              </div>
              <div className="ssd-big-num">€ 8.630</div>
              <MiniChart animated={animated} />
            </div>

            {/* Creators */}
            <div className="ssd-panel">
              <div className="ssd-panel-head">
                <span className="ssd-panel-title">{t('Creatorinnen')}</span>
                <span className="ssd-panel-count">3 aktiv</span>
              </div>
              <div className="ssd-creator-list">
                {CREATORS.map((c, i) => (
                  <div className="ssd-creator-row" key={c.name}>
                    <div className="ssd-avatar">{c.name[0]}</div>
                    <div className="ssd-creator-info">
                      <div className="ssd-creator-name">{c.name}</div>
                      <div className="ssd-bar-wrap">
                        <div className="ssd-bar" style={{
                          width: animated ? `${c.pct}%` : '0%',
                          transition: animated ? `width 0.9s cubic-bezier(.22,1,.36,1) ${0.2 + i * 0.12}s` : 'none',
                        }} />
                      </div>
                    </div>
                    <div className="ssd-creator-rev">{c.revenue}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Messages + Pipeline */}
          <div className="ssd-row-grid ssd-row-grid--43">
            {/* Telegram inbox */}
            <div className="ssd-panel">
              <div className="ssd-panel-head">
                <span className="ssd-panel-title">{t('Nachrichten')}</span>
                <span className="ssd-panel-badge ssd-panel-badge--new">3 neu</span>
              </div>
              <div className="ssd-msg-list">
                {MESSAGES.map(m => (
                  <div className="ssd-msg-row" key={m.name}>
                    <div className="ssd-avatar ssd-avatar--sm">{m.name[0]}</div>
                    <div className="ssd-msg-body">
                      <div className="ssd-msg-name">{m.name}</div>
                      <div className="ssd-msg-text">{m.msg}</div>
                    </div>
                    <div className="ssd-msg-time">{m.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline */}
            <div className="ssd-panel">
              <div className="ssd-panel-head">
                <span className="ssd-panel-title">{t('Pipeline')}</span>
              </div>
              <div className="ssd-pipeline">
                {PIPELINE.map(p => (
                  <div className="ssd-pipe-col" key={p.label}>
                    <div className="ssd-pipe-dot" style={{ background: p.color }} />
                    <div className="ssd-pipe-count" style={{ color: p.color }}>{p.count}</div>
                    <div className="ssd-pipe-label">{t(p.label)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ssd-notice">{t('Illustrative Vorschau · keine echten Daten')}</div>
    </div>
  );
};
