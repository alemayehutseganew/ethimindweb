import type { Metadata } from "next";
import "./globals.css"; // <-- must match the file above exactly

export const metadata: Metadata = {
  title: "EthiMinD — Beyond Intelligence, With Your Future",
  description:
    "Building Africa's first comprehensive AI ecosystem from Ethiopia. Devices, infrastructure, education, and research — rooted in culture, powered by innovation.",
  keywords: [
    "AI",
    "Ethiopia",
    "Technology",
    "Innovation",
    "EthiMind",
    "African Tech",
    "iMind",
    "Artificial Intelligence",
  ],
  authors: [
    { name: "Mulat Tiruye", url: "https://linkedin.com/in/mulattiruye" },
  ],
  creator: "Mulat Tiruye",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ethimind-f8njwmxe8-mulat-tiruyes-projects.vercel.app",
    title: "EthiMinD — Beyond Intelligence, With Your Future",
    description:
      "Building Africa's first comprehensive AI ecosystem from Ethiopia 🇪🇹",
    siteName: "EthiMinD",
  },
  twitter: {
    card: "summary_large_image",
    title: "EthiMinD — Beyond Intelligence",
    description: "Building Africa's AI future from Ethiopia",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="selection:bg-cyan-300/40">{children}</body>
    </html>
  );
}
