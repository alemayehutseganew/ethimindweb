import React from 'react';
import './Robotics.css';

const labs = [
  {
    title: 'Robotics Research Pods',
    focus: 'Human-centered robotics with embedded AI for health, agriculture, and public services',
  },
  {
    title: 'Automation Command Centers',
    focus: 'Integration hubs that orchestrate robotics fleets, drones, and automation workflows for governments and carriers',
  },
  {
    title: 'Automation Ethics Studio',
    focus: 'Ethical review board that governs autonomy, safety certifications, and inclusive deployment standards',
  },
];

const roboticsStreams = [
  {
    title: 'Machine + Motion',
    detail: 'Robotics, embedded systems, IoT, drones, and mechatronics prototyping that couples physical automation with AI perception.',
  },
  {
    title: 'Automation Playbooks',
    detail: 'Software-defined automation flows, low-code orchestration, and robotics-as-a-service frameworks for public and private infrastructure.',
  },
  {
    title: 'Creative Systems & Media',
    detail: 'Visual storytelling, motion design, digital twins, and media production that document automation pilots and teach communities.',
  },
];

const Robotics = () => {
  return (
    <main className="robotics-page">
      <section className="robotics-hero">
        <p className="eyebrow">Robotics & Automation</p>
        <h1>
          We enable human + machine partnerships, from drones and robotic logistics to automation that scales government services.
        </h1>
        <p>
          EthiMind blends robotics labs, automation command centers, and creative systems to deliver predictable operational
          intelligence while training communities to steward the technology.
        </p>
        <div className="hero-actions">
          <button className="btn primary">Request a robotics sprint</button>
          <button className="btn ghost">Meet the automation team</button>
        </div>
        <div className="hero-stats">
          <div>
            <p className="stat-value">12</p>
            <p className="stat-label">Robotics pilots active</p>
          </div>
          <div>
            <p className="stat-value">48</p>
            <p className="stat-label">Automation blueprints published</p>
          </div>
          <div>
            <p className="stat-value">36</p>
            <p className="stat-label">Ethical reviews completed</p>
          </div>
        </div>
      </section>

      <section className="robotics-grid">
        {labs.map((lab) => (
          <article key={lab.title}>
            <h3>{lab.title}</h3>
            <p>{lab.focus}</p>
          </article>
        ))}
      </section>

      <section className="robotics-streams">
        <div className="streams-intro">
          <p className="eyebrow">Core streams</p>
          <h2>Machine motion, automation playbooks, and media that document impact</h2>
          <p>
            Robotics and automation at EthiMind is about intentional deployment, inclusive governance, and measurable
            outcomes for education, logistics, healthcare, and civic programs.
          </p>
        </div>
        <div className="streams-grid">
          {roboticsStreams.map((stream) => (
            <article key={stream.title}>
              <h4>{stream.title}</h4>
              <p>{stream.detail}</p>
              <button className="btn-link">Explore example</button>
            </article>
          ))}
        </div>
      </section>

      <section className="robotics-cta">
        <div>
          <h3>Partner on robotics transformation</h3>
          <p>
            Submit your challenge—health logistics, automation for energy, or drones for agriculture—and we will pair you with
            command center engineers, ethics leads, and carriers ready to co-develop a pilot.
          </p>
        </div>
        <button className="btn primary">Submit automation challenge</button>
      </section>
    </main>
  );
};

export default Robotics;
