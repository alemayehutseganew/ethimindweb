import React from 'react';
import './Team.css';

const categories = [
  { role: 'Leadership', desc: 'African technologists, policy experts, and global partners guiding strategy.' },
  { role: 'Engineering', desc: 'Software, cloud, AI, hardware, and integration teams building products.' },
  { role: 'Research & Robotics', desc: 'Robotics, electronics, and innovation labs prototyping future systems.' },
  { role: 'Academia & Training', desc: 'Educators and program directors growing talent pipelines.' },
];

const Team = () => {
  return (
    <section className="team-page">
      <h1>Ethimind Leadership & Community</h1>
      <p>
        Ethimind convenes engineering excellence, policy clarity, and creative energy from across Africa and beyond.
        Our people drive the mission of making Ethiopia—and the continent—a leading technology producer.
      </p>
      <div className="team-grid">
        {categories.map((item) => (
          <article key={item.role}>
            <h3>{item.role}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Team;
