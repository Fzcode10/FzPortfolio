import React, { useEffect, useRef } from 'react';
import { Layers, Brain, Monitor, Server, Database, Globe, Shield, Code2 } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import './About.css';

const iconMap = { Layers, Brain, Monitor, Server, Database, Globe, Shield, Code2 };

function useReveal(ref) {
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
}

export default function About() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="about" className="section" ref={ref}>
      <div className="section-container">
        <div className="about__grid">
          {/* Left: Text */}
          <div className="about__text">
            <div className="section-label reveal">
              <span>Who I Am</span>
            </div>
            <h2 className="section-title about__heading reveal reveal-delay-1">
              {portfolioData.about.heading}
            </h2>
            {portfolioData.about.paragraphs.map((para, i) => (
              <p key={i} className={`about__para reveal reveal-delay-${i + 2}`}>
                {para}
              </p>
            ))}
            <button
              className="btn btn-primary reveal reveal-delay-4"
              onClick={() => {
                const el = document.getElementById('skills');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              More About Me
            </button>
          </div>

          {/* Right: Strengths */}
          <div className="about__strengths reveal reveal-delay-2">
            <h3 className="about__strengths-heading">My Strengths</h3>
            <div className="about__strengths-grid">
              {portfolioData.about.strengths.map((strength, i) => {
                const Icon = iconMap[strength.icon];
                return (
                  <div key={strength.label} className="strength-card">
                    <div className="strength-card__icon">
                      {Icon && <Icon size={18} />}
                    </div>
                    <span className="strength-card__label">{strength.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
