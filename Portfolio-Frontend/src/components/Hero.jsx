import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import SocialLinks from './SocialLinks';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Background decorative elements */}
      <div className="hero__bg-glow hero__bg-glow--1" aria-hidden="true" />
      <div className="hero__bg-glow hero__bg-glow--2" aria-hidden="true" />
      <div className="hero__bg-dots" aria-hidden="true" />

      <div className="section-container hero__container">
        {/* LEFT: Text Content */}
        <div className="hero__content">
          {/* Badge */}
          <div className="hero__badge fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="hero__badge-wave">👋</span>
            <span>{portfolioData.hero.greeting}</span>
          </div>

          {/* Name */}
          <h1 className="hero__name fade-up" style={{ animationDelay: '0.2s' }}>
            <span className="hero__name-first">Faij </span>
            <span className="hero__name-last gradient-text">Ahamad</span>
          </h1>

          {/* Title */}
          <div className="hero__title-wrap fade-up" style={{ animationDelay: '0.3s' }}>
            <span className="hero__title">{portfolioData.personal.title}</span>
          </div>

          {/* Description */}
          <p className="hero__description fade-up" style={{ animationDelay: '0.4s' }}>
            {portfolioData.hero.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="hero__stack fade-up" style={{ animationDelay: '0.45s' }}>
            {portfolioData.hero.techStack.map((tech) => (
              <span key={tech} className="hero__stack-chip">{tech}</span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero__ctas fade-up" style={{ animationDelay: '0.5s' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => scrollTo('projects')}
            >
              View Projects
              <ArrowRight size={16} />
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => scrollTo('contact')}
            >
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div className="hero__social fade-up" style={{ animationDelay: '0.6s' }}>
            <span className="hero__social-label">Follow me on</span>
            <SocialLinks />
          </div>
        </div>

        {/* RIGHT: Profile Image */}
        <div className="hero__visual fade-up" style={{ animationDelay: '0.3s' }}>
          {/* Purple circle glow background */}
          <div className="hero__profile-bg" aria-hidden="true">
            <div className="hero__profile-ring hero__profile-ring--1" />
            <div className="hero__profile-ring hero__profile-ring--2" />
            <div className="hero__profile-ring hero__profile-ring--3" />
          </div>

          {/* Dotted Grid */}
          <div className="hero__dots-grid" aria-hidden="true" />

          {/* Profile Image */}
          <div className="hero__profile-frame">
            <img
              src={portfolioData.hero.profileImage}
              alt="Faij Ahamad"
              className="hero__profile-img"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="hero__profile-placeholder" aria-hidden="true">
              <span className="hero__profile-initials"></span>
            </div>
          </div>

          {/* Decorative particles */}
          <div className="hero__particle hero__particle--1" aria-hidden="true" />
          <div className="hero__particle hero__particle--2" aria-hidden="true" />
          <div className="hero__particle hero__particle--3" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
