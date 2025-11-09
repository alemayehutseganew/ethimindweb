"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getSite, getEcosystem, getProducts, getVision } from "@/lib/data";
import ChatWidget from "@/components/ui/ChatWidget";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import FounderSection from "@/components/sections/FounderSection";
import "../i18n/config";

export default function Home() {
  const site = getSite();
  const eco = getEcosystem();
  const prod = getProducts();
  const vision = getVision();

  useEffect(() => {
    document.title = "EthiMinD — Beyond Intelligence";
  }, []);

  return (
    <main>
      {/* animated gradient blobs */}
      <div aria-hidden className="fixed inset-0 -z-10">
        <div className="brand-glow absolute -top-20 left-1/2 -translate-x-1/2 w-180 h-180 rounded-full" />
        <div className="brand-glow absolute bottom-[-10%] right-[-10%] w-lg h-128 rounded-full" />
      </div>

      <Header name={site.brand.name} />
      <Hero />
      <Trust />
      <FounderSection />
      <EcosystemSection cards={eco} />
      <ProductsSection cards={prod} />
      <VisionSection title={vision.title} points={vision.points} />
      <Contact />
      <Footer brand={site.brand.name} />
      <ChatWidget />
    </main>
  );
}

function Header({ name }: { name: string }) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-backdrop-filter:bg-slate-950/65 bg-slate-950/85 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-9 w-9" />
          <span className="font-semibold tracking-wide">{name}</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#home" className="hover:text-white transition">
            {t("nav.home")}
          </a>
          <a href="#ecosystem" className="hover:text-white transition">
            {t("nav.ecosystem")}
          </a>
          <a href="#products" className="hover:text-white transition">
            {t("nav.products")}
          </a>
          <a href="#vision" className="hover:text-white transition">
            {t("nav.vision")}
          </a>
          <a href="#contact" className="hover:text-white transition">
            {t("nav.contact")}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="ml-2 inline-flex items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-300/20 transition"
          >
            {t("cta.primary")}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20"
    >
      <p className="text-cyan-300/80 tracking-[0.3em] text-xs sm:text-sm uppercase">
        {t("hero.kicker")}
      </p>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
      >
        <span className="bg-linear-to-r from-cyan-200 via-sky-300 to-emerald-300 bg-clip-text text-transparent drop-shadow">
          {t("hero.title")}
        </span>
      </motion.h1>
      <p className="mt-5 max-w-2xl text-slate-300">{t("hero.sub")}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#ecosystem"
          className="rounded-2xl px-5 py-3 bg-cyan-400/20 border border-cyan-300/30 hover:bg-cyan-400/30 text-cyan-100 font-medium transition"
        >
          {t("hero.cta1")}
        </a>
        <a
          href="#about"
          className="rounded-2xl px-5 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-100 font-medium transition"
        >
          {t("hero.cta2")}
        </a>
      </div>
      <HeroCards />
    </section>
  );
}

function HeroCards() {
  const { t } = useTranslation();

  const items = [
    {
      title: t("hero.cards.privacy.title"),
      body: t("hero.cards.privacy.body"),
      icon: "🔒",
    },
    {
      title: t("hero.cards.amharic.title"),
      body: t("hero.cards.amharic.body"),
      icon: "🗣️",
    },
    {
      title: t("hero.cards.green.title"),
      body: t("hero.cards.green.body"),
      icon: "🌱",
    },
  ];

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((i, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-cyan-300/30 transition"
        >
          <div className="text-2xl" aria-hidden="true">
            {i.icon}
          </div>
          <h3 className="mt-3 font-semibold text-lg">{i.title}</h3>
          <p className="mt-1 text-slate-300 text-sm">{i.body}</p>
        </motion.div>
      ))}
    </div>
  );
}

function Trust() {
  const { t } = useTranslation();

  return (
    <div className="border-y border-white/10 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-300">
        {t("trust")}
      </div>
    </div>
  );
}

function EcosystemSection({
  cards,
}: {
  cards: { title: string; body: string }[];
}) {
  const { t } = useTranslation();

  return (
    <section
      id="ecosystem"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <h2 className="text-2xl sm:text-4xl font-bold">{t("ecosystem.title")}</h2>
      <p className="mt-2 text-slate-300">{t("ecosystem.sub")}</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
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

function ProductsSection({
  cards,
}: {
  cards: { name: string; desc: string }[];
}) {
  const { t } = useTranslation();

  return (
    <section
      id="products"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <h2 className="text-2xl sm:text-4xl font-bold">{t("products.title")}</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group rounded-2xl border border-white/10 bg-linear-to-b from-white/5 to-slate-900 p-6 hover:from-cyan-400/10 hover:border-cyan-300/30 transition"
          >
            <div className="text-sm tracking-widest text-cyan-300/80">
              {c.name}
            </div>
            <h3 className="mt-2 font-semibold">{c.desc}</h3>
            <div className="mt-6 flex items-center gap-2">
              <span className="text-xs text-slate-400">
                {t("products.badge")}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function VisionSection({ points }: { title: string; points: string[] }) {
  const { t } = useTranslation();

  return (
    <section
      id="vision"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-cyan-300/30 bg-cyan-400/10 p-8"
      >
        <h2 className="text-2xl sm:text-4xl font-bold flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/20 border border-cyan-300/40">
            🚀
          </span>
          {t("vision.title")}
        </h2>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {points.map((p, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-start gap-3 text-slate-100"
            >
              <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shrink-0"></span>
              <span>{p}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-center">
          {t("cta.title")}
        </h3>
        <p className="mt-2 text-center text-slate-300">{t("cta.sub")}</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          <input
            required
            placeholder={t("form.name")}
            className="col-span-1 rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 outline-none focus:border-cyan-300/40 transition"
          />
          <input
            required
            type="email"
            placeholder={t("form.email")}
            className="col-span-1 rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 outline-none focus:border-cyan-300/40 transition"
          />
          <button className="col-span-1 rounded-xl bg-cyan-400/20 border border-cyan-300/30 px-4 py-3 font-medium text-cyan-100 hover:bg-cyan-400/30 transition">
            {t("cta.primary")}
          </button>
        </form>
        <div className="mt-3 text-center text-xs text-slate-400">
          {t("cta.secondary")}
        </div>
      </div>
    </section>
  );
}

function Footer({ brand }: { brand: string }) {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/10 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3 text-slate-300">
            <Logo className="h-6 w-6" />
            <span>{brand}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/mulat1221"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-300 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/mulat1221"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-300 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://x.com/besu311qos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-300 transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-400">
            {t("footer.rights", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}

function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="EthiMinD logo"
    >
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path
        fill="url(#g)"
        d="M28 8c12 0 22 8 22 18s-10 18-22 18c-2 0-4 0-6-1l-8 5 3-9c-3-3-5-8-5-13 0-10 10-18 22-18z"
      />
    </svg>
  );
}
