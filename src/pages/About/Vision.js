import React from 'react';
import './Vision.css';

const stats = [
  { value: '120+', label: 'Government & institutional partners' },
  { value: '63', label: 'Live Ethimind pilots' },
  { value: '40', label: 'Local language & civic research labs' },
];

const initiatives = [
  {
    title: 'Policy & Co-governance',
    detail:
      'Multi-stakeholder councils ensure every deployment aligns with national policy, ethical review, and community feedback.',
  },
  {
    title: 'Education & Talent',
    detail:
      'Bootcamps, academies, and apprenticeships pair learners with mentors from carrier, government, and university labs.',
  },
  {
    title: 'Investors & Impact',
    detail:
      'Expert investors fund long-term research sprints, measurement frameworks, and accountability dashboards across sectors.',
  },
];

const pillars = [
  'Innovation · Reimagining African challenges with world-class engineering and inclusive design.',
  'Inclusivity · Designing education, governance, and technology pathways that invite every community to participate.',
  'Impact · Delivering measurable outcomes across agriculture, health, education, infrastructure, and industry.',
  'Resilience · Federated intelligence that keeps sovereignty, integrity, and reliability at the core.',
];

const Vision = () => {
  return (
    <section className="vision-page">
      <div className="vision-hero">
        <p className="eyebrow">Ethimind · Vision for Africa’s Intelligence</p>
        <h1>
          We partner with governments, universities, investors, and operators to co-create inclusive, resilient cities of
          knowledge that uplift agriculture, health, infrastructure, and education.
        </h1>
        <p>
          Ethimind unifies public policy, civic leadership, and multi-sector expertise to steward technology that respects
          sovereignty, amplifies local talent, and delivers measurable change.
        </p>
        <div className="hero-actions">
          <button className="btn primary">Share a policy challenge</button>
          <button className="btn ghost">Explore impact stories</button>
        </div>
        <div className="hero-stats">
          {stats.map((stat) => (
            <article key={stat.label}>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="vision-initiatives">
        {initiatives.map((initiative) => (
          <article key={initiative.title}>
            <h2>{initiative.title}</h2>
            <p>{initiative.detail}</p>
          </article>
        ))}
      </div>

      <div className="vision-pillars">
        {pillars.map((text) => (
          <div key={text} className="pillar-card">
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Vision;
