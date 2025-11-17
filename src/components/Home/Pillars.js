import React from 'react';
import './Pillars.css';

const philosophy = [
  {
    title: 'Innovation',
    description: 'rethinking and redesigning possibilities across Africa',
    background: 'linear-gradient(140deg, #0e1b40, #1d4ed8)',
  },
  {
    title: 'Excellence',
    description: 'engineering world-class solutions with global rigor',
    background: 'linear-gradient(140deg, #07192c, #3b82f6)',
  },
  {
    title: 'Integrity',
    description: 'transparent, accountable, respectful collaboration',
    background: 'linear-gradient(140deg, #011627, #0891b2)',
  },
  {
    title: 'Community',
    description: 'lifting African talent, businesses, and institutions',
    background: 'linear-gradient(140deg, #061b13, #16a34a)',
  },
  {
    title: 'Impact',
    description: 'building technology that changes lives, not just systems',
    background: 'linear-gradient(140deg, #0c0c1c, #facc15)',
  },
];

const layers = [
  'Digital Infrastructure · Building Africa’s center of technological excellence',
  'Automation & AI · Empowering businesses through modern tools',
  'Education & Training · Digital literacy for youth and professionals',
  'Research & Innovation · Robotics, electronics & sustainable engineering',
  'Partner Ecosystem · Government, academia, and enterprise alliances',
];

const Pillars = () => {
  return (
    <section className="pillars">
      <div className="pillars-heading">
        <h2>The EthiMinD Vision: More Than Technology</h2>
        <p>
          Our philosophy is a promise to center humanity, culture, sovereignty, and sustainability at the core of every
          innovation. Together these principles unlock the complete EthiMinD ecosystem.
        </p>
      </div>
      <div className="philosophy-grid">
        {philosophy.map((item) => (
          <article key={item.title} className="pillar-card" style={{ background: item.background }}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      <div className="layers">
        {layers.map((item) => (
          <div key={item} className="layer-item">
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pillars;
