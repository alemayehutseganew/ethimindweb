import React from 'react';
import './Infrastructure.css';

const initiatives = [
  {
    title: 'Addis AI Hub',
    desc: '100+ petaflops computing center powered by solar and geothermal energy.'
  },
  {
    title: 'Regional Edge Nodes',
    desc: '12 decentralized nodes delivering low-latency intelligence for communities.'
  },
  {
    title: 'National AI Grid',
    desc: 'Federated learning network connecting research, academia, and industry securely.'
  },
  {
    title: 'Carrier-grade Mesh',
    desc: 'Carrier partners host resilient, encrypted connectivity that keeps Ethimind services near the people.'
  }
];

const infrastructureStats = [
  { value: '100+', label: 'Petaflops of sustainable compute' },
  { value: '24/7', label: 'Operational carrier monitoring' },
  { value: '48', label: 'Federated partners across ministries & research labs' },
  { value: '0', label: 'Carbon-neutral datacenter footprint' },
];

const focusPillars = [
  {
    title: 'Federated compute fabric',
    detail: 'Composable infrastructure that lets governments keep data on-premise while still sharing intelligence.'
  },
  {
    title: 'Carrier collaboration',
    detail: 'Low-earth orbit, fiber, and mobile carrier partners that provide carrier-grade routing with local sovereignty.'
  },
  {
    title: 'Sovereign governance',
    detail: 'Multi-stakeholder councils, ethical review boards, and transparent audit trails for every deployment.'
  },
];

const capabilityAreas = [
  {
    title: 'Software Development & Engineering',
    tagline: 'Web, SaaS, and enterprise systems built for African realities.',
    details: [
      'Web, mobile, SaaS, and enterprise systems tailored for Africa',
      'API architecture, integrations, and secure platforms',
      'E-government, automation, and modernization programs',
    ],
  },
  {
    title: 'Machine Learning, Big Data & AI',
    tagline: 'Predictive intelligence powering every sector.',
    details: [
      'Predictive analytics, NLP, computer vision, and recommender systems',
      'AI-powered automation and business intelligence across sectors',
      'Large-scale data platforms that unlock actionable insight',
    ],
  },
  {
    title: 'Cloud Computing & DevOps',
    tagline: 'Global-grade reliability, locally governed execution.',
    details: [
      'Cloud infrastructure, IaC, containerization, and microservices',
      'CI/CD pipelines, cloud security, and scalable platforms',
      'Global-grade reliability with AWS, Azure, GCP expertise',
    ],
  },
  {
    title: 'Education, Training & Talent',
    tagline: 'Building the next wave of engineers, scientists, and storytellers.',
    details: [
      'Coding bootcamps, AI & data science academies, and cloud programs',
      'Robotics/STEM initiatives, UI/UX labs, and digital learning platforms',
      'Talent outsourcing, professional hiring, and capacity building',
    ],
  },
  {
    title: 'Robotics, Engineering & Media',
    tagline: 'From drones to digital storytelling, we ship innovation.',
    details: [
      'Robotics, embedded systems, IoT, and drone innovation',
      'Graphic design, branding, marketing, and creative media production',
      'Photography, documentary, 3D animation, and motion design',
    ],
  },
];

const Infrastructure = () => {
  return (
    <section className="infrastructure-page">
      <div className="tech-hero">
        <p className="eyebrow">Digital Backbone</p>
        <h1>Building Ethiopia’s AI infrastructure & sovereignty</h1>
        <p>
          Ethimind designs the compute, edge, and carrier fabric that keeps federated intelligence resilient, low
          latency, and rooted in public interest leadership.
        </p>
        <div className="hero-actions">
          <button className="btn primary">Review the architecture brief</button>
          <button className="btn ghost">See deployment map</button>
        </div>
      </div>

      <div className="stat-grid">
        {infrastructureStats.map((stat) => (
          <article key={stat.label}>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </article>
        ))}
      </div>

      <div className="pillar-section">
        {focusPillars.map((pillar) => (
          <article key={pillar.title}>
            <h3>{pillar.title}</h3>
            <p>{pillar.detail}</p>
          </article>
        ))}
      </div>

      <div className="capability-section">
        {capabilityAreas.map((area) => (
          <article key={area.title}>
            <h3>{area.title}</h3>
            <p className="capability-tagline">{area.tagline}</p>
            <ul>
              {area.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="initiative-list">
        {initiatives.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>

      <div className="infrastructure-footer">
        <div>
          <h3>Want to host an Ethimind node?</h3>
          <p>
            Share your site readiness, carrier availability, or research lab capacity and our teams will plan the next
            infrastructure upgrade sprint alongside your coalition.
          </p>
        </div>
        <button className="btn primary">Submit a site brief</button>
      </div>
    </section>
  );
};

export default Infrastructure;
