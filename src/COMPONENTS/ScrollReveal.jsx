import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function ScrollReveal({ as: Element = 'div', className = '', delay = 0, children }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Element
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Element>
  );
}
