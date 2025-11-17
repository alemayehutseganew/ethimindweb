import React from 'react';
import './Careers.css';

const culturePillars = [
  {
    title: 'Public interest intelligence',
    detail: 'Design policies, benchmarks, and safeguards that keep AI deployments accountable to communities and governments.',
  },
  {
    title: 'Research-to-impact',
    detail: 'Partner with labs and universities to translate fieldfindings into product pilots for LearnAI, iGrow, and HealthAI.',
  },
  {
    title: 'Carrier-ready execution',
    detail: 'Own resilient infrastructure, logistics coordination, and service reliability across multiple African markets.',
  },
  {
    title: 'Inclusive investing',
    detail: 'Advocate for long-term capital that values ethical oversight, equitable access, and measurable societal returns.',
  },
];

const featuredRoles = [
  { title: 'Policy & Government Relations Lead', focus: 'Co-create data governance, public-private programs, and civic deployments.' },
  { title: 'AI Product Strategist', focus: 'Design LearnAI programs with localized curricula and community feedback loops.' },
  { title: 'Carrier Operations Manager', focus: 'Oversee edge infrastructure, uptime SLAs, and carrier collaboration roadmaps.' },
  { title: 'Impact Research Fellow', focus: 'Shape measurement frameworks and evidence for every deployment.' },
];

const Careers = () => {
  return (
    <div className="careers-page">
      <section className="careers-hero">
        <p className="eyebrow">Careers at EthiMind</p>
        <h1>Join the partner-led ecosystem building intelligent futures across Africa.</h1>
        <p>
          We seek strategists, technologists, carriers, and storytellers who can help governments, institutions, and
          investors unlock the full promise of Ethimind intelligence—fairly, transparently, and at scale.
        </p>
        <div className="hero-actions">
          <button className="btn primary">Explore open roles</button>
          <button className="btn ghost">Meet current collaborators</button>
        </div>
      </section>

      <section className="values-grid">
        {culturePillars.map((pillar) => (
          <article key={pillar.title} className="value-card">
            <h3>{pillar.title}</h3>
            <p>{pillar.detail}</p>
          </article>
        ))}
      </section>

      <section className="roles-section">
        <div className="roles-intro">
          <p className="eyebrow">Featured openings</p>
          <h2>Lead the next wave of collaboration</h2>
          <p>
            Whether you are orchestrating carrier logistics, guiding policy, or shepherding research, EthiMind provides
            a runway for experimentation, impact, and shared governance.
          </p>
        </div>
        <div className="roles-grid">
          {featuredRoles.map((role) => (
            <article key={role.title} className="role-card">
              <h4>{role.title}</h4>
              <p>{role.focus}</p>
              <button className="btn-link">Start a conversation</button>
            </article>
          ))}
        </div>
      </section>

      <section className="careers-cta">
        <div>
          <h3>Bring your expertise to Ethimind</h3>
          <p>
            Share a capsule about your domain, past collaborations, and how you would like to support governments,
            carriers, or institutions. We will invite you to a partnership lab sprint.
          </p>
        </div>
        <button className="btn primary">Submit interest</button>
      </section>
    </div>
  );
};

export default Careers;
