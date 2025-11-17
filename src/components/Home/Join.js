import React from 'react';
import './Join.css';

const opportunities = [
  'Invest in software, AI, cloud, and robotics innovation that scales across Africa',
  'Partner on research, manufacturing, and creative media to shape the continent’s narrative',
  'Access elite talent through hiring, training, and outsourcing programs',
  'Collaborate on policy, governance, and ethical frameworks for digital transformation',
];

const Join = () => {
  return (
    <section className="join">
      <div>
        <h2>Join Ethiopia's AI Revolution</h2>
        <p>
          EthiMinD is seeking partners, investors, and talent who share our commitment to Ethiopian-led innovation.
          Together we will deliver the AI ecosystem Africa deserves.
        </p>
      </div>
      <ul>
        {opportunities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="join-actions">
        <a className="btn primary" href="mailto:partners@ethimind.et">Contact Leadership</a>
        <a className="btn ghost" href="/careers">Explore Talent Programs</a>
      </div>
    </section>
  );
};

export default Join;
