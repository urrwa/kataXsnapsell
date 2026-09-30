import { useLayoutEffect, useRef } from 'react';
import './project-scroll-rows.css';

export interface ProjectScrollItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

// Port of the supplied Framer ScrollExpand override, active MODE="climb".
// Keep MAX synchronized with the CSS frame height. The bitmap never scales.
const MAX = 560;
const START = 1;
const OPEN = 0.2;
const SMOOTH = 0.1;
const SPACER = 260;
const DESKTOP = '(min-width: 810px) and (pointer: fine)';

const ramp = (top: number, vh: number) =>
  Math.max(0, Math.min(1, (vh * START - top) / (vh * (START - OPEN))));

type Subscription = {
  element: HTMLElement;
  smooth: number;
  epsilon: number;
  current: number;
  target: number;
  lastApplied: number;
  compute: (top: number, vh: number) => number;
  apply: (element: HTMLElement, value: number) => void;
};

// One shared loop for ALL image frames and text blocks, not one loop per row.
const subscriptions = new Set<Subscription>();
let frameId = 0;
let previousTime = 0;

function animate(now: number) {
  frameId = requestAnimationFrame(animate);
  if (document.hidden) {
    previousTime = 0;
    return;
  }
  const dt = Math.min(64, previousTime ? now - previousTime : 16.7);
  previousTime = now;
  const viewportHeight = window.innerHeight;

  // READ: complete all geometry measurements before writing any styles.
  for (const sub of subscriptions) {
    sub.target = sub.compute(sub.element.getBoundingClientRect().top, viewportHeight);
  }

  // WRITE: elapsed-time easing matches the reference at different frame rates.
  for (const sub of subscriptions) {
    const distance = sub.target - sub.current;
    if (Math.abs(distance) < sub.epsilon) {
      if (sub.current === sub.target && now - sub.lastApplied < 500) continue;
      sub.current = sub.target;
    } else {
      const factor = 1 - Math.pow(1 - sub.smooth, dt / 16.7);
      sub.current += distance * factor;
      if (Math.abs(sub.target - sub.current) < sub.epsilon) sub.current = sub.target;
    }
    sub.apply(sub.element, sub.current);
    sub.lastApplied = now;
  }
}

function subscribe(sub: Subscription) {
  subscriptions.add(sub);
  sub.apply(sub.element, sub.current);
  if (!frameId) {
    previousTime = 0;
    frameId = requestAnimationFrame(animate);
  }
  return () => {
    subscriptions.delete(sub);
    if (!subscriptions.size) {
      cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = 0;
    }
  };
}

function revealImage(element: HTMLElement, value: number) {
  const visible = Math.round(value);
  const hidden = MAX - visible;
  element.style.clipPath = `inset(${hidden}px 0px 0px 0px)`;
  element.style.marginTop = `${-hidden}px`;
  element.style.marginBottom = `${SPACER * (1 - visible / MAX)}px`;
}

export function ProjectScrollRows({
  items,
  ariaLabel = 'Creator challenges',
}: {
  items: readonly ProjectScrollItem[];
  ariaLabel?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  // Text changes (e.g. changing language) do not restart the reveal.
  const itemIdentity = items.map(item => item.id).join('|');

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const desktop = matchMedia(DESKTOP);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const images = [...root.querySelectorAll<HTMLElement>('[data-project-image]')];
    const texts = [...root.querySelectorAll<HTMLElement>('[data-project-text]')];
    let unsubscribe: Array<() => void> = [];

    const reset = () => {
      unsubscribe.forEach(stop => stop());
      unsubscribe = [];
      for (const image of images) {
        image.style.removeProperty('clip-path');
        image.style.removeProperty('margin-top');
        image.style.removeProperty('margin-bottom');
      }
      for (const text of texts) text.style.removeProperty('opacity');
    };

    const configure = () => {
      reset();
      if (!desktop.matches || reduced.matches) return;
      unsubscribe = [
        ...images.map(element => subscribe({
          element, smooth: SMOOTH, epsilon: 0.5,
          current: 0, target: 0, lastApplied: 0,
          compute: (top, vh) => MAX * ramp(top, vh),
          apply: revealImage,
        })),
        ...texts.map(element => subscribe({
          element, smooth: SMOOTH * 1.8, epsilon: 0.005,
          current: 0, target: 0, lastApplied: 0,
          compute: (top, vh) => {
            const progress = ramp(top - MAX / 2, vh);
            return Math.min(1, progress * progress * 4);
          },
          apply: (node, opacity) => { node.style.opacity = opacity.toFixed(3); },
        })),
      ];
    };

    configure();
    desktop.addEventListener('change', configure);
    reduced.addEventListener('change', configure);
    return () => {
      desktop.removeEventListener('change', configure);
      reduced.removeEventListener('change', configure);
      reset();
    };
  }, [itemIdentity]);

  return (
    <div ref={rootRef} className="ka-project-rows" role="list" aria-label={ariaLabel}>
      {items.map(item => (
        <article key={item.id} className="ka-project-row" role="listitem">
          <h3 className="ka-project-title" data-project-text>{item.title}</h3>
          <div className="ka-project-image" data-project-image>
            <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
          </div>
          <div className="ka-project-detail" data-project-text>
            <span className="ka-project-number">{item.id}</span>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
