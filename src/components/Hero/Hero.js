

import React from 'react';
import { useLanguage } from '../LanguageConverter/LanguageContext';
import './Hero.css';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">{t('ETHIOPIA • AI • FUTURE')}</div>
              <h1 className="hero-title">
                Beyond Intelligence, With Your Future
              </h1>
              <h2 className="hero-subtitle">
                {t('Making AI accessible')}
              </h2>
              <p className="hero-description">
                {t('EthiMinD is building an end‑to‑end AI ecosystem from Ethiopia: devices, infrastructure, education, and research—rooted in culture, powered by innovation.')}
              </p>
              <div className="hero-buttons">
                <button className="btn">{t('learnMore')}</button>
                <button className="btn btn-outline">{t('Meet The Founder')}</button>
              </div>
              <div className="hero-features">
                <div className="feature">
                  <span className="feature-icon">⚡</span>
                  <span>{t('Privacy‑first AI')}</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🌟</span>
                  <span>{t('Green compute')}</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🚀</span>
                  <span>{t('Local language training data and tools.')}</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="gpu-card">
                <div className="gpu-image">
                  <div className="placeholder-image">ETHIOPIA • AI • FUTURE</div>
                </div>
                <div className="gpu-info">
                  <h3>Designing with ethics, culture, and impact.</h3>
                  <p>{t('The future of African technology starts in Ethiopia. We are not just building products — we are building an intelligent civilization.')}</p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;