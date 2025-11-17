

import React from 'react';
import { useLanguage } from '../LanguageConverter/LanguageContext';
import './GamingSection.css';

const GamingSection = () => {
  const { t } = useLanguage();

  const gamingFeatures = [
    {
      icon: "🎮",
      title: t('fourKGaming'),
      description: t('fourKGamingFeature')
    },
    {
      icon: "🌟",
      title: t('rayTracing'),
      description: t('rayTracingFeature')
    },
    {
      icon: "🤖",
      title: t('dlss3'),
      description: t('dlssFeature')
    },
    {
      icon: "⚡",
      title: t('reflexTechnology'),
      description: t('reflexTechnology')
    }
  ];

  return (
    <section className="gaming-section">
      <div className="container">
        <div className="gaming-content">
          <div className="gaming-text">
            <h2 className="gaming-title">
              {t('ultimateGaming')}
            </h2>
            <p className="gaming-description">
              {t('gamingDescription')}
            </p>
            
            <div className="gaming-features">
              {gamingFeatures.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-desc">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="gaming-actions">
              <button className="btn">{t('exploreGaming')}</button>
              <button className="btn btn-outline">{t('watchTrailer')}</button>
            </div>
          </div>
          
          <div className="gaming-visual">
            <div className="visual-card">
              <div className="visual-placeholder">
                {t('EthiMind AI Ecosystem')}
              </div>
              <div className="visual-stats">
                <div className="stat">
                  <div className="stat-value">Technology</div>
                  <div className="stat-label">{t('resolution')}</div>
                </div>
                <div className="stat">
                  <div className="stat-value">Ethics</div>
                  <div className="stat-label">Environment</div>
                </div>
                <div className="stat">
                  <div className="stat-value">Environment</div>
                  <div className="stat-label">{t('on')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamingSection;