import React, { forwardRef } from 'react';
import '../animated-button.css';

type Variant = 'default' | 'compact' | 'card' | 'icon' | 'brand';
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { animationVariant?: Variant; animateArrow?: boolean };
type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { animationVariant?: Variant; animateArrow?: boolean };

// Arrow exchange and expanding circle adapted from Uiverse.io by ryota1231.
function Arrow({ incoming = false }: { incoming?: boolean }) {
  return <svg className={`ab-arrow ${incoming ? 'arr-2' : 'arr-1'}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
  </svg>;
}

function Contents({ children }: { children: React.ReactNode }) {
  return <><Arrow incoming /><span className="ab-text">{children}</span><span className="ab-circle" aria-hidden="true" /><Arrow /></>;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, ButtonProps>(function AnimatedButton(
  { children, className = '', animationVariant = 'default', animateArrow = false, type = 'button', ...props }, ref,
) {
  return <button {...props} ref={ref} type={type} className={animateArrow ? `${className} animated-button ab-${animationVariant}` : className}>{animateArrow ? <Contents>{children}</Contents> : children}</button>;
});

export const AnimatedLink = forwardRef<HTMLAnchorElement, LinkProps>(function AnimatedLink(
  { children, className = '', animationVariant = 'default', animateArrow = false, ...props }, ref,
) {
  return <a {...props} ref={ref} className={animateArrow ? `${className} animated-button ab-${animationVariant}` : className}>{animateArrow ? <Contents>{children}</Contents> : children}</a>;
});
