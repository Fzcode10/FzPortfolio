import React, { useEffect, useRef } from 'react';
import { ExternalLink, Award } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import './Certifications.css';

export default function Certifications() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const issuerColors = {
    HackerRank: '#00EA64',
    Scaler: '#FF6B35',
  };

  return (
    <section id="certifications" className="section" ref={ref}>
      <div className="section-container">
        <div className="section-header">
          <div className="section-label reveal">Credentials</div>
          <h2 className="section-title reveal reveal-delay-1">Certifications</h2>
        </div>

        <div className="cert__grid">
          {portfolioData.certifications.map((cert, i) => {
            const color = issuerColors[cert.issuer] || '#7C5CFF';
            return (
              <div key={i} className={`cert-card reveal reveal-delay-${i + 2}`}>
                <div className="cert-card__icon" style={{ color, background: `${color}15`, border: `1px solid ${color}25` }}>
                  <Award size={24} />
                </div>
                <div className="cert-card__info">
                  <h3 className="cert-card__title">{cert.title}</h3>
                  <p className="cert-card__issuer" style={{ color }}>{cert.issuer}</p>
                </div>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-purple btn-sm cert-card__btn"
                  aria-label={`View ${cert.title} certificate`}
                >
                  <ExternalLink size={13} />
                  View Certificate
                </a>
              </div>
            );
          })}
        </div>

        {/* Languages */}
        <div className="languages reveal reveal-delay-4">
          <h3 className="languages__heading">Languages</h3>
          <div className="languages__list">
            {portfolioData.languages.map((lang) => (
              <div key={lang} className="language-badge">
                <span className="language-badge__dot" />
                {lang}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
