import React from 'react';
import './Intelligence.css';

const Intelligence = () => {
  const initiatives = [
    {
      title: 'iGrow: Agricultural Intelligence',
      summary:
        'We co-design resilient landscapes with governments, agronomists, and university partners—blending satellite insight, localized data, and regenerative research to optimize every harvest responsibly.',
      highlights: [
        'Public-private data pipelines that link ministries of agriculture with local cooperatives',
        'University-led living laboratories powering adaptive irrigation and soil health',
        'Industry-aligned automation pilots that keep biodiversity and yields in balance',
      ],
      cta: 'See how governments lean on iGrow'
    },
    {
      title: 'HealthAI: Medical Intelligence',
      summary:
        'In partnership with health ministries, medical experts, and investors, HealthAI protects communities through transparent diagnostics, explainable AI, and collaborative clinical workflows.',
      highlights: [
        'Federated networks connecting clinics, hospitals, and research institutions',
        'Expert-reviewed decision support that unites physicians, nurses, and policy teams',
        'Investor-backed virtual care hubs co-created with universities and civic leaders',
      ],
      cta: 'Explore HealthAI collaborations'
    },
    {
      title: 'LearnAI: Educational Transformation',
      summary:
        'We develop intelligence with education ministries, teachers, and industry mentors so every learner interacts with culturally responsive content, adaptive pathways, and real-world project briefs.',
      highlights: [
        'University research labs testing immersive mentoring experiences',
        'Industry-sponsored studios where students build solutions for local challenges',
        'Policy design workshops aligning LearnAI with national learning goals',
      ],
      cta: 'Discover LearnAI classrooms'
    }
  ];

  return (
    <div className="intelligence-page">
      <section className="intelligence-hero">
        <p className="eyebrow">Intelligence Platforms</p>
        <h1>
          Our mission is to co-create intelligence with governments, expert individuals, universities,
          industries, and investors so that agriculture, healthcare, and education thrive together.
        </h1>
        <p className="intro">
          EthiMind designs adaptive systems in collaboration with civic leaders, research institutions, and capital partners.
          Together we serve patients, farmers, and learners, unlocking generational value through proactive insight and responsible governance.
        </p>
        <div className="hero-cta">
          <button className="btn primary">Request a collaborative briefing</button>
          <button className="btn ghost">Download the intelligence manifesto</button>
        </div>
      </section>

      <section className="initiative-grid">
        {initiatives.map((initiative) => (
          <article key={initiative.title} className="initiative-card">
            <div className="badge" aria-hidden="true"></div>
            <h2>{initiative.title}</h2>
            <p>{initiative.summary}</p>
            <ul>
              {initiative.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <button className="btn btn-link">{initiative.cta}</button>
          </article>
        ))}
      </section>

      <section className="partnership-section">
        <div className="partnership-content">
          <p className="eyebrow">Partnership Ecosystem</p>
          <h3>
            We work hand-in-hand with governments, academic research, industries, and investors so
            every intelligence track benefits from accountability, expertise, and long-term support.
          </h3>
          <p>
            The ecosystem mixes co-funded labs, policy dialogues, and impact capital that providence the
            intelligence stack. Our partners pilot iGrow, HealthAI, and LearnAI together, ensuring each advancement
            includes civic governance, transparent ethics, and tangible economic opportunity.
          </p>
          <div className="partnership-cta">
            <button className="btn primary">Join the partnership network</button>
            <span>Invite the EthiMind Partnerships team to co-design your intelligence journey.</span>
          </div>
        </div>
        <div className="partnership-visual">
          <div className="glow"></div>
          <div className="orbits">
            <span>iGrow</span>
            <span>HealthAI</span>
            <span>LearnAI</span>
            <span>Partners</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Intelligence;