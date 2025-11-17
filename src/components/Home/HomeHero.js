import React from 'react';
import './HomeHero.css';

const stats = [
  { label: 'Technology Prototypes', value: '9+' },
  { label: 'Jobs Catalyzed by 2030', value: '110,000+' },
  { label: 'Pan-African Reach', value: '54 Countries' },
];

const HomeHero = () => {
  return (
    <section className="home-hero">
      <p className="eyebrow">Project EthiMinD · Beyond Intelligence, With Your Future</p>
      <h1>Building Ethiopia's Intelligent Future</h1>
      <p className="lead">
        Ethimind is Africa’s future hub for inclusive innovation, combining digital infrastructure, engineering excellence,
        and transformative services so individuals, governments, and businesses thrive across the continent.
      </p>
      <div className="hero-actions">
        <a className="btn primary" href="/vision">Explore the Vision</a>
        <a className="btn ghost" href="/partners">Partner With Us</a>
      </div>
      <div className="hero-stats">
        {stats.map((item) => (
          <div key={item.label} className="hero-stat">
            <span className="stat-value">{item.value}</span>
            <span className="stat-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeHero;
