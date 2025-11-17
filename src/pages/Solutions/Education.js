import React from 'react';
import './Education.css';

const Education = () => {
  return (
    <div className="education-page">
      <header className="education-hero">
        <p className="eyebrow">LearnAI: Educational Transformation</p>
        <h1>
          Learning intelligence co-created with educators, universities, and industry partners
          who trust Ethimind to deliver inclusive, future-ready pathways.
        </h1>
        <p>
          LearnAI combines public-sector curriculum guidance, expert mentorship, and investor-backed
          technology so every student can explore, build, and reflect with human-centered AI.
        </p>
        <div className="hero-actions">
          <button className="btn primary">Explore LearnAI classrooms</button>
          <button className="btn ghost">Download partnership blueprint</button>
        </div>
      </header>

      <section className="education-summary">
        <article>
          <h2>Mission-aligned intelligence</h2>
          <p>
            LearnAI partners with education ministries, research universities, and industry mentors to
            align teaching goals with workforce opportunities. Together we pilot adaptive learning,
            cultural storytelling, and real-world projects that reinforce agency and civic impact.
          </p>
        </article>
        <article>
          <h2>Inclusive experiences</h2>
          <p>
            Every curriculum is co-designed with expert individuals and government advisors to ensure the
            learning journeys are accessible, multilingual, and rooted in the challenges unique to each region.
          </p>
        </article>
        <article>
          <h2>Investor-ready innovation</h2>
          <p>
            Institutional investors and philanthropic partners support LearnAI studios that prototype AI-assisted
            tutors, community labs, and lifelong learning passports, creating measurable impact for educators.
          </p>
        </article>
      </section>
    </div>
  );
};

export default Education;
