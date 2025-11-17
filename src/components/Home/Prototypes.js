import React from 'react';
import './Prototypes.css';

const prototypes = [
  {
    title: 'Software Development & Engineering',
    blurbs: [
      'Web, mobile, SaaS, and enterprise systems tailored for Africa',
      'API architecture, integrations, and secure platforms',
      'E-government, automation, and modernization programs',
    ],
  },
  {
    title: 'Machine Learning, Big Data & AI',
    blurbs: [
      'Predictive analytics, NLP, computer vision, and recommender systems',
      'AI-powered automation and business intelligence across sectors',
      'Large-scale data platforms that unlock actionable insight',
    ],
  },
  {
    title: 'Cloud Computing & DevOps',
    blurbs: [
      'Cloud infrastructure, IaC, containerization, and microservices',
      'CI/CD pipelines, cloud security, and scalable platforms',
      'Global-grade reliability with AWS, Azure, GCP expertise',
    ],
  },
  {
    title: 'Education, Training & Talent',
    blurbs: [
      'Coding bootcamps, AI & data science academies, and cloud programs',
      'Robotics/STEM initiatives, UI/UX labs, and digital learning platforms',
      'Talent outsourcing, professional hiring, and capacity building',
    ],
  },
  {
    title: 'Robotics, Engineering & Media',
    blurbs: [
      'Robotics, embedded systems, IoT, and drone innovation',
      'Graphic design, branding, marketing, and creative media production',
      'Photography, documentary, 3D animation, and motion design',
    ],
  },
];

const Prototypes = () => {
  return (
    <section className="prototypes">
      <div className="prototypes-heading">
        <h2>Prototype Portfolio & Development Pipeline</h2>
        <p>
          Four flagship initiatives—iMind, iGrow, HealthAI, and LearnAI—are advancing through pilot phases to
          demonstrate Ethiopia’s AI sovereignty and drive national impact.
        </p>
      </div>
      <div className="prototype-grid">
        {prototypes.map((item) => (
          <article key={item.title} className="prototype-card">
            <h3>{item.title}</h3>
            <ul>
              {item.blurbs.map((blurb) => (
                <li key={blurb}>{blurb}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Prototypes;
