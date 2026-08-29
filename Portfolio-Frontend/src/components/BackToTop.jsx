import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import './BackToTop.css';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      id="back-to-top"
      className={`back-to-top ${visible ? 'back-to-top--visible' : ''}`}
      onClick={scrollTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
