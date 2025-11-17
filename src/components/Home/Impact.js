import React from 'react';
import './Impact.css';

const metrics = [
  { title: 'Technology & Innovation', value: 'Africa’s center for research, robotics, and sustainable engineering' },
  { title: 'People & Skills', value: 'Digital literacy for millions and talent development across 54 nations' },
  { title: 'Economic Impact', value: '$500M+ economic value, 10,000 direct jobs, 100,000 indirect by 2030' },
  { title: 'Governance & Sustainability', value: 'Ethical AI frameworks, green compute, and continental partnerships' },
];

const Impact = () => {
  return (
    <section className="impact">
      <div className="impact-heading">
        <h2>Impact Assessment & Success Metrics</h2>
        <p>
          EthiMinD is a multi-dimensional national program. Our metrics align technology, economy, society, and the
          environment to ensure every milestone delivers measurable impact.
        </p>
      </div>
      <div className="metric-grid">
        {metrics.map((item) => (
          <article key={item.title} className="metric-card">
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Impact;
