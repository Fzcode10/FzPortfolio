import React, { useEffect, useRef } from 'react';
import portfolioData from '../data/portfolioData';
import ProjectCard from './ProjectCard';
import './Projects.css';

export default function Projects() {
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
    <section id="projects" className="section" ref={ref}>
      <div className="section-container">
        <div className="section-header">
          <div className="section-label reveal">My Work</div>
          <h2 className="section-title reveal reveal-delay-1">Featured Projects</h2>
          <p className="section-subtitle reveal reveal-delay-2">
            Selected full-stack projects built with modern web technologies.
          </p>
        </div>

        <div className="projects__grid">
          {portfolioData.projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              className={`reveal reveal-delay-${i + 2}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
