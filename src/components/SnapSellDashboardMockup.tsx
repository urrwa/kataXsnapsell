import React, { useEffect, useRef, useState } from 'react';
import { t, useLanguage } from '../i18n';
import { TrendingUp, Users, ShoppingBag, ArrowUpRight } from 'lucide-react';

const CREATORS = [
  { name: 'Sophie M.', revenue: '€ 4.200', status: 'aktiv', pct: 84 },
  { name: 'Lena K.', revenue: '€ 2.890', status: 'aktiv', pct: 62 },
  { name: 'Mia R.', revenue: '€ 1.540', status: 'pause', pct: 38 },
];

const PIPELINE = [
  { label: 'Interesse', count: 12, color: '#3a3a4a' },
  { label: 'Angebot', count: 7, color: '#20C997' },
  { label: 'Kauf', count: 4, color: '#169B74' },
];

export const SnapSellDashboardMockup: React.FC = () => {
  useLanguage();
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.3 }
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
        <div className="ssd-url">snapsell.io / dashboard</div>
      </div>

      {/* Dashboard body */}
      <div className="ssd-body">
        {/* Sidebar */}
        <div className="ssd-sidebar">
          <div className="ssd-logo">SnapSell</div>
          {[
            { icon: TrendingUp, label: 'Analytics' },
            { icon: Users, label: 'Kontakte' },
            { icon: ShoppingBag, label: 'Produkte' },
          ].map(({ icon: Icon, label }) => (
            <button key={label} className="ssd-nav-item">
              <Icon className="ssd-nav-icon" />
              <span>{t(label)}</span>
            </button>
          ))}
        </div>

        {/* Main */}
        <div className="ssd-main">
          {/* Stat tiles */}
          <div className="ssd-stats">
            {[
              { label: 'Umsatz', value: '€ 8.630', up: '+18%' },
              { label: 'Käufer', value: '124', up: '+9%' },
              { label: 'Produkte', value: '6', up: 'aktiv' },
            ].map(s => (
              <div className="ssd-stat" key={s.label}>
                <div className="ssd-stat-label">{t(s.label)}</div>
                <div className="ssd-stat-value">{s.value}</div>
                <div className="ssd-stat-up">
                  <ArrowUpRight className="ssd-stat-arrow" />
                  {s.up}
                </div>
              </div>
            ))}
          </div>

          {/* Creators table */}
          <div className="ssd-table-label">{t('Creator-Übersicht')}</div>
          <div className="ssd-table">
            {CREATORS.map(c => (
              <div className="ssd-row" key={c.name}>
                <div className="ssd-avatar">{c.name[0]}</div>
                <div className="ssd-name">{c.name}</div>
                <div className="ssd-bar-wrap">
                  <div
                    className="ssd-bar"
                    style={{
                      width: animated ? `${c.pct}%` : '0%',
                      transition: animated ? `width 0.9s cubic-bezier(.22,1,.36,1) ${0.2 + CREATORS.indexOf(c) * 0.12}s` : 'none',
                    }}
                  />
                </div>
                <div className="ssd-revenue">{c.revenue}</div>
                <div className={`ssd-status ssd-status--${c.status}`}>{t(c.status)}</div>
              </div>
            ))}
          </div>

          {/* Pipeline */}
          <div className="ssd-table-label">{t('Sales-Pipeline')}</div>
          <div className="ssd-pipeline">
            {PIPELINE.map(p => (
              <div className="ssd-pipe-col" key={p.label}>
                <div className="ssd-pipe-header" style={{ borderColor: p.color }}>{t(p.label)}</div>
                <div className="ssd-pipe-count" style={{ color: p.color }}>{p.count}</div>
                <div className="ssd-pipe-sub">{t('Kontakte')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ssd-notice">{t('Illustrative Vorschau · keine echten Daten')}</div>
    </div>
  );
};
