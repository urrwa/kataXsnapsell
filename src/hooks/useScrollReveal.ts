import { useEffect, type RefObject } from 'react';

/** Reveal content blocks without transforming section or sticky ancestors. */
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current as HTMLElement | null;
    if (!container) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets: HTMLElement[] = [];
    container.querySelectorAll(':scope > section, :scope > footer').forEach(section => {
      // The hero and pillar panels already own their entrance animations.
      if (section.id === 'section-1') return;
      const selector = section.id === 'section-4'
        ? '.pillars-heading'
        : section.id === 'section-2'
          ? '.sf-heading, .sf-card, .sf-footer'
          : ':scope > div:not(.absolute) > *';
      section.querySelectorAll<HTMLElement>(selector).forEach(block => {
        // Long copy columns reveal their individual paragraphs and controls.
        if (block.classList.contains('space-y-6')) {
          targets.push(...Array.from(block.children) as HTMLElement[]);
        } else {
          targets.push(block);
        }
      });
    });

    const animations = new Set<Animation>();
    const reveal = (element: HTMLElement, delay = 0) => {
      if (element.dataset.scrollReveal !== 'pending') return;
      element.dataset.scrollReveal = 'revealed';
      observer.unobserve(element);
      if (motionPreference.matches || element.matches(':focus-within')) return;
      const animation = element.animate([
        { opacity: 0, translate: '0 32px' },
        { opacity: 1, translate: '0 0' },
      ], { duration: 800, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };

    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          || a.boundingClientRect.left - b.boundingClientRect.left);
      let rowTop = -Infinity;
      let rowIndex = 0;
      visible.forEach(entry => {
        if (Math.abs(entry.boundingClientRect.top - rowTop) > 48) {
          rowTop = entry.boundingClientRect.top;
          rowIndex = 0;
        }
        reveal(entry.target as HTMLElement, Math.min(rowIndex++ * 120, 240));
      });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

    const showAll = () => {
      if (!motionPreference.matches) return;
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      targets.forEach(target => { target.dataset.scrollReveal = 'revealed'; });
    };
    // Keyboard navigation must never land on an invisible control.
    const handleFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const block = event.target.closest<HTMLElement>('[data-scroll-reveal="pending"]');
      if (block) reveal(block);
    };
    targets.forEach(target => {
      target.dataset.scrollReveal = motionPreference.matches ? 'revealed' : 'pending';
      if (!motionPreference.matches) observer.observe(target);
    });
    container.addEventListener('focusin', handleFocus);
    motionPreference.addEventListener('change', showAll);

    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      targets.forEach(target => { delete target.dataset.scrollReveal; });
      container.removeEventListener('focusin', handleFocus);
      motionPreference.removeEventListener('change', showAll);
    };
  }, [containerRef]);
}
