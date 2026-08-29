import React, { useEffect, useRef } from 'react';
import { GraduationCap, MapPin, Calendar, BookOpen, Award } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import './Education.css';

export default function Education() {
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
    <section id="education" className="section" ref={ref}>
      <div className="section-container">
        <div className="section-header">
          <div className="section-label reveal">Academic Background</div>
          <h2 className="section-title reveal reveal-delay-1">Education</h2>
          <p className="section-subtitle reveal reveal-delay-2">
            My academic journey from school to university.
          </p>
        </div>

        <div className="edu__timeline">
          {portfolioData.education.map((edu, i) => (
            <div key={i} className={`edu-card reveal reveal-delay-${i + 2}`}>
              {/* Timeline dot */}
              <div className="edu-card__dot" aria-hidden="true">
                <div className="edu-card__dot-inner" />
              </div>

              <div className="edu-card__body">
                <div className="edu-card__header">
                  <div className="edu-card__icon-wrap">
                    <GraduationCap size={20} />
                  </div>
                  <div className="edu-card__title-area">
                    {edu.current && (
                      <span className="edu-card__badge">Current</span>
                    )}
                    <h3 className="edu-card__institution">{edu.institution}</h3>
                    <p className="edu-card__degree">{edu.degree}</p>
                  </div>
                  <div className="edu-card__result">
                    <Award size={14} />
                    {edu.result}
                  </div>
                </div>

                <div className="edu-card__info">
                  <span className="edu-card__info-item">
                    <Calendar size={13} />
                    {edu.duration}
                  </span>
                  <span className="edu-card__info-item">
                    <MapPin size={13} />
                    {edu.location}
                  </span>
                </div>

                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="edu-card__coursework">
                    <span className="edu-card__coursework-label">
                      <BookOpen size={13} />
                      Relevant Coursework:
                    </span>
                    <div className="edu-card__coursework-tags">
                      {edu.coursework.map((course) => (
                        <span key={course} className="tech-tag">{course}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
