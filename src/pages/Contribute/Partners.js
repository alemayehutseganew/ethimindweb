import React from 'react';
import './Partners.css';

const strategists = [
  {
    role: 'Government & Civic Leaders',
    detail:
      'Co-design policies, data standards, and infrastructure roadmaps that align Ethimind intelligence with national priorities.',
  },
  {
    role: 'Research & University Labs',
    detail:
      'Translate scholarly insight into pilots, incubate LearnAI, HealthAI, and iGrow experiments, and mentor talent.',
  },
  {
    role: 'Industry & Carriers',
    detail:
      'Provide networks, logistics, and production-grade scale while advancing carrier-grade AI responsible deployments.',
  },
  {
    role: 'Expert Investors',
    detail:
      'Fuel long-term growth, ensure ethical oversight, and share governance for public interest technology.',
  },
];

const carriers = [
  {
    title: 'Connectivity Partners',
    summary: 'Equip rural and urban communities with resilient, encrypted networks for remote learning and health diagnostics.',
  },
  {
    title: 'Logistics & Infrastructure',
    summary: 'Co-build digital twins and supply chains that move equipment, medicines, and harvests more efficiently.',
  },
  {
    title: 'Financial & Impact Investors',
    summary: 'Align capital flows to measurable outcomes and ensure every deployment delivers accountable ROI.',
  },
];

const Partners = () => {
  return (
    <div className="partners-page">
      <section className="partners-hero">
        <p className="eyebrow">Partner & Carrier Ecosystem</p>
        <h1>
          We collaborate with governments, institutions, carriers, universities, industries, and investors to steward
          Ethimind intelligence across the continent.
        </h1>
        <p>
          Together we align public policy, research expertise, and private-sector infrastructure so iGrow, HealthAI,
          and LearnAI become locally governed, universally accessible platforms.
        </p>
        <div className="hero-actions">
          <button className="btn primary">Invite the Ethimind Partnership team</button>
          <button className="btn ghost">Review ecosystem capabilities</button>
        </div>
      </section>

      <section className="strategy-grid">
        {strategists.map((strategist) => (
          <article key={strategist.role} className="strategy-card">
            <h3>{strategist.role}</h3>
            <p>{strategist.detail}</p>
          </article>
        ))}
      </section>

      <section className="carrier-section">
        <div className="carrier-intro">
          <p className="eyebrow">Carrier collaboration</p>
          <h2>Carrier-grade reliability with ethical intelligence</h2>
          <p>
            Partners within telecom, logistics, and infrastructure networks host our services with latency-aware routing,
            data sovereignty, and 24/7 operational command centers.
          </p>
        </div>
        <div className="carrier-grid">
          {carriers.map((carrier) => (
            <article key={carrier.title} className="carrier-card">
              <h4>{carrier.title}</h4>
              <p>{carrier.summary}</p>
              <button className="btn-link">Request carrier playbook</button>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-panel">
        <div>
          <h3>Ready to co-govern intelligence?</h3>
          <p>
            Submit a partnership brief outlining your civic initiative, academic lab focus, corporate capability, or investment
            thesis and we will propose a joint sprint backed by Ethimind methodology.
          </p>
        </div>
        <button className="btn primary">Submit partnership brief</button>
      </section>
    </div>
  );
};

export default Partners;
