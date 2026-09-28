import React, { useLayoutEffect, useRef, useState } from 'react';
import SlideCommit from './SlideCommit';

type SlideButtonProps = {
  key?: string;
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  id?: string;
  'aria-label'?: string;
};

function textOf(node: React.ReactNode): string {
  return React.Children.toArray(node).map(child => {
    if (typeof child === 'string' || typeof child === 'number') return String(child);
    if (React.isValidElement<{ children?: React.ReactNode }>(child)) return textOf(child.props.children);
    return '';
  }).join('');
}

/** Keeps each existing CTA's footprint while sharing React Bits' slide interaction. */
export function SlideButton({ children, onClick, className = '', id, 'aria-label': ariaLabel }: SlideButtonProps) {
  const root = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 240, height: 48, radius: 9 });
  const label = textOf(children);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const measure = () => {
      const style = getComputedStyle(element);
      setSize({ width: element.clientWidth, height: element.clientHeight, radius: parseFloat(style.borderRadius) || 9 });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} id={id} className={`slide-button ${className}`} title="Drag the arrow to continue, or press Enter">
      <span className="slide-button__sizer" aria-hidden="true">{children}</span>
      <SlideCommit
        label={ariaLabel || label}
        doneLabel="Opening…"
        errorLabel="Try again"
        onConfirm={onClick}
        trackColor="#14261b"
        handleColor="#63dca8"
        successColor="#63dca8"
        holdMs={900}
        width={size.width}
        height={size.height}
        radius={size.radius}
      />
    </div>
  );
}
