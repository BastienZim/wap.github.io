"use client";
import Link from "next/link";
import BaseImage from "@/components/ui/BaseImage";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

const links = [
    { href: "/", label: "Accueil" },
    { href: "/pratique", label: "Pratique" },
    { href: "/apropos", label: "À propos" },
    { href: "/galerie", label: "Galerie" },
    { href: "/new_images_section", label: "new_images_section" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const [isDark, setIsDark] = useState<boolean | null>(null);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const sheetRef = useRef<HTMLDivElement>(null);

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        try {
            const saved = localStorage.getItem("theme"); // 'dark' | 'light' | null
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const initial = saved ? saved === "dark" : prefersDark;
            document.documentElement.classList.toggle("dark", initial);
            setIsDark(initial);
        } catch {
            setIsDark(false);
        }
    }, []);

    // Mark as mounted (for portal / document access)
    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when sheet is open
    useEffect(() => {
        if (!mounted) return;
        if (open) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [open, mounted]);

    // (Removed scrolled state logic - unused)

    // Close on ESC & trap focus when mobile menu is open
    useEffect(() => {
        if (!open) return;
        const firstFocusable = sheetRef.current?.querySelector<HTMLElement>(
            'a,button,[tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "Tab" && sheetRef.current) {
                const focusables = sheetRef.current.querySelectorAll<HTMLElement>(
                    'a,button,[tabindex]:not([tabindex="-1"])'
                );
                if (focusables.length === 0) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    const toggleTheme = () => {
        const next = !document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
        setIsDark(next);
    };

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname?.startsWith(href);

    return (
        <>
            {/* Skip link */}
            <a
                href="#content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] rounded-lg bg-brand-600 px-3 py-2 text-white shadow"
            >
                Aller au contenu
            </a>

            <header
                className={[
                    "sticky top-0 z-50 border-b border-secondary-200 dark:border-secondary-700",
                    "backdrop-blur supports-[backdrop-filter]:backdrop-blur",
                    "text-primary dark:text-primary",
                    "bg-transparent",
                ].join(" ")}
                role="banner"
            >
                <div className="container flex h-16 items-center justify-between">
                    <Link
                        href="/"
                        className="ml-2 md:ml-0 group inline-flex items-center gap-2"
                        aria-label="Aller à l'accueil"
                    >
                        <span className="relative">
                            <BaseImage
                                src="images/directly_useful/logowap.png"
                                alt="WAP logo"
                                width={36}
                                height={36}
                                className="rounded-md ring-1 ring-brand-500/10 group-hover:ring-brand-500/30 transition"
                            />
                        </span>
                        <span className="font-display text-2xl font-bold tracking-wide text-brand-700 dark:text-brand-500">
                            WAP
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1 text-sm">
                        <ul className="flex items-center gap-1">
                            {links.map((l) => {
                                const active = isActive(l.href);
                                return (
                                    <li key={l.href}>
                                        {/* Base Link Element */}
                                        <Link
                                            href={l.href}
                                            aria-current={active ? "page" : undefined}
                                            className={
                                                `relative inline-flex items-center rounded-full px-3.5 py-2 transition motion-safe:duration-200
                                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2
                                                ${active
                                                    ? "bg-brand-500/20 ring-1 ring-brand-500/30 text-secondary-900 dark:text-primary-600 font-semibold"
                                                    : "text-brand-600 dark:text-brand-500 hover:bg-primary-100/60 dark:hover:bg-secondary-700/60 hover:text-primary-700 dark:hover:text-primary-200 font-medium"}`
                                            }
                                        >
                                            {/* Background Effect Layer */}
                                            {/* Creates a pill-shaped highlight behind the text */}
                                            <span className={
                                                `absolute inset-0 -z-10 rounded-full opacity-0 scale-95 motion-safe:transition-all motion-safe:duration-300
                                                ${active
                                                    ? "opacity-100 scale-100 bg-brand-500/20 ring-1 ring-brand-500/30"
                                                    : "group-hover:opacity-100 group-hover:scale-100"}`
                                            }
                                                aria-hidden="true"
                                            />
                                            {/* Link Text and Animated Underline */}
                                            <span className="relative">
                                                {l.label}
                                                <span
                                                    className={
                                                        `absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 motion-safe:transition-transform motion-safe:duration-300
                                                        ${active
                                                            ? "scale-x-100 bg-secondary-700/80 dark:bg-success-700/80"
                                                            : "group-hover:scale-x-100 bg-brand-500/60"}`
                                                    }
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Theme toggle (desktop) */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label="Basculer le thème"
                            aria-pressed={isDark ?? false}
                            title="Toggle theme"
                            className={
                                "ml-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-500/20 " +
                                "bg-success-500/10 dark:bg-success-500/15 hover:bg-success-500/20 dark:hover:bg-success-500/25 " +
                                "transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2"
                            }
                        >
                            {isDark === null ? null : isDark ? (
                                <Moon className="h-5 w-5 text-brand-300" />
                            ) : (
                                <Sun className="h-5 w-5 text-brand-700" />
                            )}
                        </button>
                    </nav>

                    {/* Mobile: theme + menu button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label="Basculer le thème"
                            aria-pressed={isDark ?? false}
                            title="Toggle theme"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/20 bg-success-500/10 dark:bg-success-500/15 hover:bg-success-500/20 dark:hover:bg-success-500/25 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2"
                        >
                            {isDark === null ? null : isDark ? (
                                <Moon className="h-5 w-5 text-brand-300" />
                            ) : (
                                <Sun className="h-5 w-5 text-brand-700" />
                            )}
                        </button>

                        <button
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/20 bg-success-500/10 hover:bg-success-500/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2"
                            onClick={() => setOpen(true)}
                            aria-label="Ouvrir le menu"
                            aria-haspopup="dialog"
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                        >
                            <Menu className="text-brand-700 dark:text-brand-300" />
                        </button>
                    </div>
                </div>

                {/* Mobile sheet via portal, with backdrop only under the sheet */}
                {mounted && open &&
                    createPortal(
                        <div
                            id="mobile-menu"
                            role="dialog"
                            aria-modal="true"
                            className="md:hidden fixed inset-0 z-[100]"
                        >
                            {/* Fullscreen transparent click layer so tapping anywhere outside closes */}
                            <button
                                type="button"
                                aria-label="Fermer le menu"
                                className="absolute inset-0 bg-transparent"
                                onClick={() => setOpen(false)}
                            />

                            {/* Right side region = sheet area */}
                            <div className="absolute inset-y-0 right-0 w-[86%] max-w-sm">
                                {/* Visual backdrop confined to sheet area (opaque) */}
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-black dark:bg-black"
                                />

                                {/* Sheet panel (on top of its own backdrop) */}
                                <div
                                    ref={sheetRef}
                                    className={[
                                        "relative h-full",
                                        "bg-background ",
                                        "border-l border-brand-500/20 shadow-2xl",
                                        "animate-in slide-in-from-right duration-200",
                                    ].join(" ")}
                                >
                                    <div className="flex items-center justify-between p-4">
                                        <div className="inline-flex items-center gap-2">
                                            <BaseImage
                                                src="images/directly_useful/logowap.png"
                                                alt="WAP logo"
                                                width={28}
                                                height={28}
                                                className="rounded-md ring-1 ring-brand-500/20"
                                            />
                                            <span className="font-display text-lg font-semibold text-brand-700 dark:text-brand-200">
                                                Menu
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setOpen(false)}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/20 bg-success-500/10 hover:bg-success-500/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2"
                                            aria-label="Fermer"
                                        >
                                            <X className="text-brand-700 dark:text-brand-300" />
                                        </button>
                                    </div>

                                    <nav className="px-4 pb-6">
                                        <ul className="grid gap-1.5">
                                            {links.map((l) => {
                                                const active = isActive(l.href);
                                                return (
                                                    <li key={l.href}>
                                                        <Link
                                                            href={l.href}
                                                            onClick={() => setOpen(false)}
                                                            aria-current={active ? "page" : undefined}
                                                            className={
                                                                `block rounded-xl px-4 py-3 transition text-base
                                                                ${active
                                                                    ? "bg-brand-500/20 ring-1 ring-brand-500/30 text-secondary-900 dark:text-primary-200 font-semibold"
                                                                    : "text-brand-600 dark:text-brand-300 hover:bg-primary-100/60 dark:hover:bg-secondary-700/60 hover:text-primary-700 dark:hover:text-primary-200 font-medium"}`
                                                            }
                                                        >
                                                            {l.label}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>,
                        document.body
                    )}
            </header>

            {/* Anchor target for the skip link */}
            <div id="content" className="sr-only" />
        </>
    );
}
