import React, { useState, useEffect } from 'react';
import { Code2, Download, Menu, X } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e) => {
      if (!e.target.closest('.navbar')) setMenuOpen(false);
    };
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <a
          className="navbar__logo"
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
          aria-label="Faij Ahamad - Home"
        >
          <Code2 size={20} className="navbar__logo-icon" />
          <span className="navbar__logo-text">
            <span className="navbar__logo-first">Faij </span>
            <span className="navbar__logo-last">Ahamad</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                className={`navbar__link ${active === id ? 'navbar__link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              >
                {link.label}
                {active === id && <span className="navbar__link-dot" />}
              </a>
            );
          })}
        </nav>

        {/* Resume Button — opens in new tab, no forced download */}
        <a
          href={portfolioData.links.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__resume btn btn-outline-purple btn-sm"
          aria-label="View Resume"
        >
          <Download size={14} />
          View Resume
        </a>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                className={`navbar__mobile-link ${active === id ? 'navbar__mobile-link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              >
                {link.label}
              </a>
            );
          })}
          {/* Resume — opens in new tab, no forced download */}
          <a
            href={portfolioData.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-purple btn-sm navbar__mobile-resume"
            aria-label="View Resume"
          >
            <Download size={14} />
            View Resume
          </a>
        </nav>
      </div>

      {/* Overlay when mobile menu is open */}
      {menuOpen && (
        <div
          className="navbar__overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
