import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import SocialLinks from './SocialLinks';
import './Contact.css';

const INITIAL = { name: '', email: '', subject: '', message: '' };
const ERRORS_INITIAL = { name: '', email: '', message: '' };

// WhatsApp icon (not in lucide-react)
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function Contact() {
  const ref = useRef(null);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState(ERRORS_INITIAL);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('');

  // Scroll reveal
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

  // Auto-clear input validation errors after 15 seconds
  useEffect(() => {
    const hasErrors = Object.values(errors).some((err) => Boolean(err));
    if (!hasErrors) return;

    const timer = setTimeout(() => {
      setErrors(ERRORS_INITIAL);
    }, 15000);

    return () => clearTimeout(timer);
  }, [errors]);

  // Auto-clear submission error status after 25 seconds
  useEffect(() => {
    if (status !== 'error') return;

    const timer = setTimeout(() => {
      setStatus('idle');
      setErrorMessage('');
    }, 25000);

    return () => clearTimeout(timer);
  }, [status]);

  // Form validation
  const validate = () => {
    const newErrors = { name: '', email: '', message: '' };
    let valid = true;
    if (!form.name.trim()) {
      newErrors.name = 'Name is required.';
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (!form.message.trim()) {
      newErrors.message = 'Message is required.';
      valid = false;
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Nodemailer Backend submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return; // prevent duplicate submissions
    if (!validate()) return;

    setStatus('sending');
    setErrorMessage('');

    const apiUrl =
      import.meta.env.VITE_API_URL ||
      import.meta.env.API_URL ||
      'http://localhost:5000/api/contact';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject ? form.subject.trim() : '',
          message: form.message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to send message right now.');
      }

      setStatus('sent');
      setForm(INITIAL);
    } catch (err) {
      console.error('Contact form error:', err);
      setErrorMessage(
        err.message && err.message !== 'Failed to fetch'
          ? err.message
          : 'Unable to connect to the email server. Please try again later or contact me directly via email or WhatsApp.'
      );
      setStatus('error');
    }
  };

  const { personal, contact } = portfolioData;

  // Build WhatsApp URL from centralized config
  const whatsappUrl = `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(
    contact.whatsapp.message
  )}`;

  return (
    <section id="contact" className="section contact" ref={ref}>
      {/* Background accent */}
      <div className="contact__bg-glow" aria-hidden="true" />

      <div className="section-container">
        <div className="section-header">
          <div className="section-label reveal">Get In Touch</div>
          <h2 className="section-title reveal reveal-delay-1">{contact.heading}</h2>
          <p className="section-subtitle reveal reveal-delay-2">{contact.description}</p>
        </div>

        <div className="contact__grid">
          {/* Contact Info */}
          <div className="contact__info reveal reveal-delay-2">
            <div className="contact-info-card">
              {/* Email */}
              <a
                href={`mailto:${personal.email}`}
                className="contact-item"
                aria-label={`Send email to ${personal.email}`}
              >
                <div className="contact-item__icon">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="contact-item__label">Email</div>
                  <div className="contact-item__value">{personal.email}</div>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:+91${personal.phone}`}
                className="contact-item"
                aria-label={`Call ${personal.phoneDisplay}`}
              >
                <div className="contact-item__icon">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="contact-item__label">Phone</div>
                  <div className="contact-item__value">{personal.phoneDisplay}</div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item contact-item--whatsapp"
                aria-label="Chat on WhatsApp"
              >
                <div className="contact-item__icon contact-item__icon--whatsapp">
                  <WhatsAppIcon />
                </div>
                <div>
                  <div className="contact-item__label">WhatsApp</div>
                  <div className="contact-item__value">Let's Chat</div>
                </div>
              </a>

              {/* Location */}
              <div className="contact-item contact-item--plain">
                <div className="contact-item__icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="contact-item__label">Location</div>
                  <div className="contact-item__value">{personal.location}</div>
                </div>
              </div>
            </div>

            <div className="contact__social-wrap">
              <p className="contact__social-label">Connect with me</p>
              <SocialLinks size="lg" showLabel={false} />
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact__form-wrap reveal reveal-delay-3">
            {status === 'sent' ? (
              <div className="contact__success">
                <div className="contact__success-icon">
                  <Check size={28} />
                </div>
                <h3>Message Sent!</h3>
                <p>
                  Thank you for reaching out! Your message has been sent successfully. I'll get back to you soon.
                </p>
                <button
                  className="btn btn-outline-purple btn-sm"
                  onClick={() => setStatus('idle')}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                className="contact__form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                {/* Error banner */}
                {status === 'error' && (
                  <div className="contact__error-banner" role="alert">
                    <AlertCircle size={16} />
                    <span>
                      {errorMessage ||
                        'Unable to send your message. Please try again or contact me directly by email or WhatsApp.'}
                    </span>
                  </div>
                )}

                <div className="form-row">
                  <div className={`form-group ${errors.name ? 'form-group--error' : ''}`}>
                    <label htmlFor="contact-name" className="form-label">
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your name"
                      autoComplete="name"
                      disabled={status === 'sending'}
                    />
                    {errors.name && (
                      <span className="form-error" role="alert">
                        <AlertCircle size={13} /> {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={`form-group ${errors.email ? 'form-group--error' : ''}`}>
                    <label htmlFor="contact-email" className="form-label">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="your@email.com"
                      autoComplete="email"
                      disabled={status === 'sending'}
                    />
                    {errors.email && (
                      <span className="form-error" role="alert">
                        <AlertCircle size={13} /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="What's this about?"
                    disabled={status === 'sending'}
                  />
                </div>

                <div className={`form-group ${errors.message ? 'form-group--error' : ''}`}>
                  <label htmlFor="contact-message" className="form-label">
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="form-input form-textarea"
                    placeholder="Tell me about your project, opportunity or question..."
                    rows={5}
                    disabled={status === 'sending'}
                  />
                  {errors.message && (
                    <span className="form-error" role="alert">
                      <AlertCircle size={13} /> {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  id="contact-submit"
                  className={`btn btn-primary btn-lg contact__submit ${status === 'sending' ? 'contact__submit--sending' : ''}`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <div className="spinner" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
