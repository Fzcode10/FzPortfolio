import React, { useEffect, useRef } from 'react';
import { Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import './Experience.css';

export default function Experience() {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="section-container">
        <div className="section-header">
          <div className="section-label reveal">Work History</div>
          <h2 className="section-title reveal reveal-delay-1">Experience</h2>
          <p className="section-subtitle reveal reveal-delay-2">
            My professional internship experience.
          </p>
        </div>

        <div className="experience__timeline">
          {portfolioData.experience.map((exp, i) => (
            <div key={i} className={`exp-card reveal reveal-delay-${i + 2}`}>
              <div className="exp-card__dot" aria-hidden="true">
                <div className="exp-card__dot-inner" />
              </div>

              <div className="exp-card__body">
                <div className="exp-card__header">
                  <div className="exp-card__icon-wrap">
                    <Briefcase size={20} />
                  </div>
                  <div className="exp-card__meta">
                    <div className="exp-card__badge">Internship</div>
                    <h3 className="exp-card__role">{exp.role}</h3>
                    <div className="exp-card__company">{exp.company}</div>
                  </div>
                </div>

                <div className="exp-card__info">
                  <span className="exp-card__info-item">
                    <Calendar size={14} />
                    {exp.duration}
                  </span>
                  <span className="exp-card__info-item">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                </div>

                <ul className="exp-card__responsibilities">
                  {exp.responsibilities.map((item, j) => (
                    <li key={j} className="exp-card__responsibility">
                      <span className="exp-card__bullet" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="exp-card__tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
