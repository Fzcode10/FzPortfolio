import React, { useState } from 'react';
import { ExternalLink, Check, ChevronDown, ChevronUp } from 'lucide-react';
import './ProjectCard.css';

export default function ProjectCard({ project, className = '' }) {
  const [expanded, setExpanded] = useState(false);

  // Project-specific gradient backgrounds for the placeholder thumbnails
  const gradients = {
    'fzad-event-manager': 'linear-gradient(135deg, #1a0d3d 0%, #0d1a40 50%, #0a2040 100%)',
    'eduvantaaz': 'linear-gradient(135deg, #0d2040 0%, #1a0d35 50%, #0a1a30 100%)',
  };

  const accentColors = {
    'fzad-event-manager': '#7C5CFF',
    'eduvantaaz': '#4F7CFF',
  };

  const thumbnailIcons = {
    'fzad-event-manager': (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="8" width="48" height="36" rx="4" stroke="#7C5CFF" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5"/>
        <rect x="16" y="16" width="32" height="20" rx="3" fill="rgba(124,92,255,0.15)" stroke="#7C5CFF" strokeWidth="1"/>
        <path d="M24 26 L32 20 L40 26" stroke="#9B8CFF" strokeWidth="1.5"/>
        <rect x="28" y="26" width="8" height="10" rx="1" fill="rgba(124,92,255,0.3)"/>
        <rect x="8" y="48" width="20" height="8" rx="2" fill="rgba(124,92,255,0.2)" stroke="#7C5CFF" strokeWidth="0.75"/>
        <rect x="36" y="48" width="20" height="8" rx="2" fill="rgba(79,124,255,0.2)" stroke="#4F7CFF" strokeWidth="0.75"/>
        <circle cx="18" cy="52" r="2" fill="#7C5CFF"/>
        <circle cx="46" cy="52" r="2" fill="#4F7CFF"/>
      </svg>
    ),
    'eduvantaaz': (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="14" width="48" height="36" rx="4" stroke="#4F7CFF" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5"/>
        <circle cx="24" cy="24" r="7" stroke="#4F7CFF" strokeWidth="1.5" fill="rgba(79,124,255,0.1)"/>
        <rect x="14" y="34" width="20" height="10" rx="2" fill="rgba(79,124,255,0.15)" stroke="#4F7CFF" strokeWidth="1"/>
        <rect x="38" y="20" width="16" height="4" rx="2" fill="rgba(124,92,255,0.3)"/>
        <rect x="38" y="28" width="12" height="3" rx="1.5" fill="rgba(124,92,255,0.2)"/>
        <rect x="38" y="34" width="14" height="3" rx="1.5" fill="rgba(124,92,255,0.2)"/>
        <rect x="38" y="40" width="10" height="3" rx="1.5" fill="rgba(124,92,255,0.15)"/>
      </svg>
    ),
  };

  const hasLiveDemo = project.liveDemo && !project.liveDemo.includes('example.com');
  const hasGithub = project.github && !project.github.includes('yourusername');

  return (
    <div className={`project-card ${className}`}>
      {/* Thumbnail */}
      <div
        className="project-card__thumb"
        style={{ background: gradients[project.id] || 'var(--bg-card)' }}
      >
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="project-card__img"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="project-card__thumb-placeholder">
          {thumbnailIcons[project.id]}
          <div className="project-card__thumb-dots" aria-hidden="true" />
        </div>
        <div
          className="project-card__thumb-accent"
          style={{ background: `radial-gradient(circle at 30% 50%, ${accentColors[project.id]}20 0%, transparent 70%)` }}
          aria-hidden="true"
        />
      </div>

      {/* Body */}
      <div className="project-card__body">
        <div className="project-card__header">
          <div>
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__subtitle">{project.subtitle}</p>
          </div>
        </div>

        <p className="project-card__desc">{project.description}</p>

        {/* Tech tags */}
        <div className="project-card__tech">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>

        {/* Features (expandable) */}
        <div className={`project-card__features ${expanded ? 'project-card__features--expanded' : ''}`}>
          <button
            className="project-card__features-toggle"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            <span>Key Features</span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {expanded && (
            <ul className="project-card__features-list">
              {project.features.map((feature) => (
                <li key={feature} className="project-card__feature">
                  <Check size={13} className="project-card__feature-icon" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buttons */}
        <div className="project-card__actions">
          {/* {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              aria-label={`Live demo of ${project.title}`}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )} */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              aria-label={`GitHub repository of ${project.title}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
