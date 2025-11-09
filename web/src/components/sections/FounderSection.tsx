"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function FounderSection() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 md:p-12"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            MT
          </div>
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-200 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
              Meet the Founder
            </h2>
            <p className="mt-2 text-lg text-slate-300">
              Building the future of African technology
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - About */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Mulat Tiruye
              </h3>
              <p className="text-cyan-300 font-medium mb-2">
                Founder & CEO, EthiMinD AI Ecosystem
              </p>
              <p className="text-slate-300 leading-relaxed">
                Visionary technologist and researcher dedicated to building
                Africa's first comprehensive AI ecosystem. Combining world-class
                education with Ethiopian roots to create technology that serves
                billions.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm uppercase tracking-wider text-cyan-300 font-semibold">
                Education
              </h4>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-white">
                    M.Sc. Computer Engineering
                  </p>
                  <p className="text-sm text-slate-400">
                    University of Pisa, Italy (Current)
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-white">
                    Advanced Nanoelectronics Research
                  </p>
                  <p className="text-sm text-slate-400">
                    Chang Gung University, Taiwan
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-white">
                    Research & Innovation
                  </p>
                  <p className="text-sm text-slate-400">
                    Singapore University of Technology & Design
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-white">
                    B.Tech Electronics & Electrical Engineering
                  </p>
                  <p className="text-sm text-slate-400">
                    KIIT University, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Vision & Mission */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm uppercase tracking-wider text-emerald-300 font-semibold mb-3">
                Vision
              </h4>
              <p className="text-slate-300 leading-relaxed">
                To build the most intelligent technology company in Africa by
                2035, creating hardware and software innovations that empower
                Ethiopia and the continent. Making AI accessible, affordable,
                and culturally relevant for every Ethiopian.
              </p>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-wider text-emerald-300 font-semibold mb-3">
                Mission
              </h4>
              <ul className="space-y-2">
                {[
                  "Develop end-to-end AI products (phones, vehicles, drones, homes)",
                  "Create free educational platforms for Ethiopian institutions",
                  "Digitize national systems and infrastructure",
                  "Build Amharic-first coding education for next generation",
                  "Establish Ethiopia as Africa's AI innovation hub",
                  "Create 10,000+ high-tech jobs by 2030",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <h4 className="text-sm uppercase tracking-wider text-cyan-300 font-semibold mb-3">
                Connect
              </h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://linkedin.com/in/mulat1221"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400/20 border border-cyan-300/30 hover:bg-cyan-400/30 transition text-sm font-medium"
                >
                  <span>LinkedIn</span>
                  <span className="text-xs">↗</span>
                </a>
                <a
                  href="https://github.com/matcompute"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm font-medium"
                >
                  <span>GitHub</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-white/10"
        >
          <blockquote className="text-center">
            <p className="text-lg md:text-xl font-medium text-slate-200 italic">
              "The future of African technology starts in Ethiopia. We're not
              just building products — we're building an intelligent
              civilization."
            </p>
            <footer className="mt-3 text-cyan-300 font-semibold">
              — Mulat Tiruye, Founder & CEO
            </footer>
          </blockquote>
        </motion.div>
      </motion.div>
    </section>
  );
}
