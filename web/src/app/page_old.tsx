"use client";
import { motion } from "framer-motion";
import { getSite, getEcosystem, getProducts, getVision } from "@/lib/data";

type Brand = { tagline: string; name?: string };

export default function Home() {
  const site = getSite();
  const eco = getEcosystem();
  const prod = getProducts();
  const vision = getVision();

  return (
    <main>
      {/* animated gradient blobs */}
      <div aria-hidden className="fixed inset-0 -z-10">
        <div className="brand-glow absolute -top-20 left-1/2 -translate-x-1/2 w-[45rem] h-[45rem] rounded-full" />
        <div className="brand-glow absolute bottom-[-10%] right-[-10%] w-[32rem] h-[32rem] rounded-full" />
      </div>

      <Header name={site.brand.name} />
      <Hero brand={{ tagline: site.brand.tagline }} />
      <Trust />
      <EcosystemSection cards={eco} />
      <ProductsSection cards={prod} />
      <VisionSection title={vision.title} points={vision.points} />
      <Contact />
      <Footer brand={site.brand.name} />
    </main>
  );
}

function Header({ name }: { name: string }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-semibold tracking-wide">{name}</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#ecosystem" className="hover:text-white">Ecosystem</a>
          <a href="#products" className="hover:text-white">Products</a>
          <a href="#vision" className="hover:text-white">Vision 2035</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <a href="#contact" className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm hover:bg-cyan-300/20">
          Collaborate
        </a>
      </div>
    </header>
  );
}

function Hero({ brand }: { brand: Brand }) {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
      <p className="text-cyan-300/80 tracking-[0.3em] text-xs sm:text-sm uppercase">ETHIOPIA • AI • FUTURE</p>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-5 text-4xl sm:text-6xl font-extrabold leading-tight"
      >
        <span className="bg-linear-to-r from-cyan-200 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
          {brand.tagline}
        </span>
      </motion.h1>
      <p className="mt-5 max-w-2xl text-slate-300">
        EthiMinD is building an end-to-end AI ecosystem from Ethiopia—rooted in culture, powered by innovation.
      </p>
      <div className="mt-8 flex gap-3">
        <a href="#ecosystem" className="rounded-2xl px-5 py-3 bg-cyan-400/20 border border-cyan-300/30 hover:bg-cyan-400/30">
          Explore the Ecosystem
        </a>
        <a href="#contact" className="rounded-2xl px-5 py-3 bg-white/5 border border-white/10 hover:bg-white/10">
          Meet the Founder
        </a>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <div className="border-y border-white/10 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-300">
        Designing with ethics, culture, and impact.
      </div>
    </div>
  );
}

function EcosystemSection({ cards }: { cards: { title: string; body: string }[] }) {
  return (
    <section id="ecosystem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl sm:text-4xl font-bold">The EthiMinD Ecosystem</h2>
      <p className="mt-2 text-slate-300">A connected stack that turns ideas into industry.</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-6 border border-white/10 bg-white/5 hover:border-cyan-300/30 transition"
          >
            <h3 className="font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm text-slate-300">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProductsSection({ cards }: { cards: { name: string; desc: string }[] }) {
  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl sm:text-4xl font-bold">Early Products & Pilots</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((c, i) => (
          <div
            key={i}
            className="group rounded-2xl border border-white/10 bg-linear-to-b from-white/5 to-slate-900 p-6 hover:from-cyan-400/10 hover:border-cyan-300/30 transition"
          >
            <div className="text-sm tracking-widest text-cyan-300/80">{c.name}</div>
            <h3 className="mt-2 font-semibold">{c.desc}</h3>
            <div className="mt-6 flex items-center gap-2">
              <span className="text-xs text-slate-400">Prototype</span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VisionSection({ title, points }: { title: string; points: string[] }) {
  return (
    <section id="vision" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="rounded-3xl border border-cyan-300/30 bg-cyan-400/10 p-8">
        <h2 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/20 border border-cyan-300/40">🚀</span>
          {title}
        </h2>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {points.map((p, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-100">
              <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300"></span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-center">Build the future from Ethiopia.</h3>
        <p className="mt-2 text-center text-slate-300">Investors, researchers, creators — let’s co-create.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input required placeholder="Name" className="rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 outline-none focus:border-cyan-300/40" />
          <input required type="email" placeholder="Email" className="rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 outline-none focus:border-cyan-300/40" />
          <button className="rounded-xl bg-cyan-400/20 border border-cyan-300/30 px-4 py-3 font-medium text-cyan-100 hover:bg-cyan-400/30 transition">
            Collaborate
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer({ brand }: { brand: string }) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-slate-300"><Logo className="h-6 w-6" /> <span>{brand}</span></div>
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} EthiMinD. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-label="EthiMinD logo">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path fill="url(#g)" d="M28 8c12 0 22 8 22 18s-10 18-22 18c-2 0-4 0-6-1l-8 5 3-9c-3-3-5-8-5-13 0-10 10-18 22-18z"/>
    </svg>
  );
}
