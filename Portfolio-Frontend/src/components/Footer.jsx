import React from 'react';
import { Code2 } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import SocialLinks from './SocialLinks';
import './Footer.css';

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

export default function Footer() {
  const handleNav = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const { footer, personal } = portfolioData;

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__top">
        <div className="section-container footer__inner">
          {/* Brand */}
          <div className="footer__brand">
            <a
              href="#home"
              className="footer__logo"
              onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
              aria-label="Back to top"
            >
              <Code2 size={18} />
              <span className="footer__logo-first">Faij </span>
              <span className="footer__logo-last">Ahamad</span>
            </a>
            <p className="footer__tagline">{footer.tagline}</p>
            <SocialLinks />
          </div>

          {/* Navigation */}
          <nav className="footer__nav" aria-label="Footer navigation">
            <h4 className="footer__nav-heading">Navigation</h4>
            <ul className="footer__nav-list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer__nav-link"
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="footer__contact">
            <h4 className="footer__nav-heading">Contact</h4>
            <a href={`mailto:${personal.email}`} className="footer__contact-link">
              {personal.email}
            </a>
            <a href={`tel:+91${personal.phone}`} className="footer__contact-link">
              {personal.phoneDisplay}
            </a>
            <p className="footer__contact-location">{personal.location}</p>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="section-container footer__bottom-inner">
          <p className="footer__copyright">{footer.copyright}</p>
          <p className="footer__made-with">
            Built with React.js + Vite
          </p>
        </div>
      </div>
    </footer>
  );
}
