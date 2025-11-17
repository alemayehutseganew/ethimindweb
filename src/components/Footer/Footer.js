import React from 'react';
import './Footer.css';

const footerSections = [
  {
    title: 'Vision',
    links: ['Project EthiMinD Overview', 'Human-Centric AI', 'Cultural Preservation', 'Sovereign Innovation', 'Sustainable Progress'],
  },
  {
    title: 'Solutions',
    links: ['iGrow Agriculture', 'HealthAI', 'LearnAI', 'Robotics & Automation', 'Privacy-First AI'],
  },
  {
    title: 'Partnerships',
    links: ['Government', 'Academia', 'Industry Alliances', 'International Covenants', 'Research Collaborations'],
  },
  {
    title: 'Get Involved',
    links: ['Investment Opportunities', 'Talent & Careers', 'Policy & Ethics', 'Manufacturing Partners', 'Community Outreach'],
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          {footerSections.map((section) => (
            <div key={section.title} className="footer-section">
              <h4 className="footer-title">{section.title}</h4>
              <ul className="footer-links">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div className="footer-brand">
            <span className="EthiMind-logo">
              EthiMinD <span className="logo-sparkle">✨</span>
            </span>
            <p>Building Ethiopia's Intelligent Civilization</p>
            <p className="footer-contact">partners@ethimind.et · +251 11 123 4567</p>
          </div>
          <div className="footer-legal">
            <div className="legal-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Accessibility</a>
            </div>
            <div className="social-links">
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="YouTube">YT</a>
              <a href="#" aria-label="X">X</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;