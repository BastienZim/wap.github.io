import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "@fontsource-variable/inter";
import "@fontsource/anton";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WAP: Wado Academy Paris",
  description: "Wado Academy Paris",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash: add .dark class ASAP based on saved preference or media query */}
        <Script id="theme-init" strategy="beforeInteractive">{`
          try {
            const saved = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const isDark = saved ? saved === 'dark' : prefersDark;
            if (isDark) document.documentElement.classList.add('dark');
          } catch {}
        `}</Script>
      </head>

      {/* Use Tailwind v4 tokens so surfaces match your @theme colors */}
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-brand-500/30 selection:text-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"                 /* matches the script above */
          disableTransitionOnChange          /* avoids color transition flicker */
        >
          <Header />
          <main className="pb-24">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
