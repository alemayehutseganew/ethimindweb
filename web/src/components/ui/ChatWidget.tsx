"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface Message {
  role: "ai" | "user";
  text: string;
}

function Logo({ className = "h-5 w-5" }: { className?: string }) {
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

function mockAnswer(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("ecosystem") || lower.includes("ኢኮሲስተም"))
    return "Our stack spans infrastructure, devices, sectors, and education — all Amharic‑first.";
  if (lower.includes("partner") || lower.includes("ተባባሪ"))
    return "Share your name and email — we'll reach out with collaboration steps.";
  if (lower.includes("invest") || lower.includes("ኢንቨስት"))
    return "We're preparing pilots through 2026–2027; investor brief available on request.";
  if (
    lower.includes("translation") ||
    lower.includes("amharic") ||
    lower.includes("አማርኛ")
  )
    return "Site supports EN/AM today; more Ethiopian languages coming.";
  if (lower.includes("imind") || lower.includes("phone"))
    return "iMind is our AI-first phone with on-device models and private assistants.";
  if (lower.includes("igrow") || lower.includes("farm"))
    return "iGrow provides smart irrigation and crop health insights for Ethiopian farmers.";
  return "Thanks! I'll share your note with the team.";
}

export default function ChatWidget() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([
    { role: "ai", text: t("chat.greeting") },
  ]);
  const [input, setInput] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({
      top: boxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, open]);

  const send = () => {
    if (!input.trim()) return;
    const ask = input.trim();
    setMsgs((m) => [...m, { role: "user", text: ask }]);
    setInput("");
    // Mock response — replace with real API later
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: mockAnswer(ask) }]);
    }, 400);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-3 w-[90vw] max-w-sm rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
          <div className="flex items-center justify-between p-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Logo className="h-5 w-5" />
              <span className="text-sm font-semibold">{t("chat.title")}</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white text-xl leading-none"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
          <div ref={boxRef} className="h-64 overflow-y-auto p-3 space-y-2">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.role === "ai"
                    ? "bg-white/5"
                    : "bg-cyan-400/20 ml-auto text-right"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/10">
            <div className="text-[10px] text-slate-400 mb-1">
              {t("chat.disclaimer")}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={t("chat.placeholder")}
                className="flex-1 rounded-xl bg-slate-800 border border-white/10 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
              />
              <button
                onClick={send}
                className="rounded-xl bg-cyan-400/20 border border-cyan-300/30 px-3 py-2 text-sm hover:bg-cyan-400/30 transition"
              >
                {t("chat.send")}
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full h-14 w-14 flex items-center justify-center border border-cyan-300/40 bg-cyan-400/20 hover:bg-cyan-400/30 shadow-lg transition text-2xl"
        aria-label="Open chat"
      >
        💬
      </button>
    </div>
  );
}
