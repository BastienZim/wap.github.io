import React from "react";

type ThemeGradientBackgroundProps = {
  mode?: "auto" | "light" | "dark";
};

// Define gradient color schemes using CSS custom properties
const GRADIENT_SCHEMES = {
  light: {
    from: "rgb(var(--color-white))",      // white
    to: "rgb(var(--color-brand))",       // brand orange
  },
  dark: {
    from: "rgb(var(--color-primary))", // coffee brown
    to: "rgb(var(--color-brand))",       // brand orange
  }
} as const;

export default function ThemeGradientBackground({ mode = "auto" }: ThemeGradientBackgroundProps) {
  const [scroll, setScroll] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      setScroll(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Create dynamic gradient based on scroll position and theme
  const createGradient = React.useCallback((scheme: { from: string; to: string }) => {
    // Create a gradient that interpolates between the from and to colors based on scroll
    const scrollProgress = Math.min(scroll, 1);
    return `linear-gradient(to bottom, 
      color-mix(in srgb, ${scheme.from} ${100 - (scrollProgress * 50)}%, ${scheme.to} ${scrollProgress * 50}%) 0%, 
      ${scheme.to} 100%)`;
  }, [scroll]);

  const lightGradient = React.useMemo(() => 
    createGradient(GRADIENT_SCHEMES.light), [createGradient]
  );

  const darkGradient = React.useMemo(() => 
    createGradient(GRADIENT_SCHEMES.dark), [createGradient]
  );

  // Render specific mode
  if (mode === "light") {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: lightGradient,
          transition: "background 0.3s ease-out",
        }}
        aria-hidden="true"
      />
    );
  }

  if (mode === "dark") {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: darkGradient,
          transition: "background 0.3s ease-out",
        }}
        aria-hidden="true"
      />
    );
  }

  // auto: automatic theme switching based on system/user preference
  return (
    <>
      {/* Light mode gradient */}
      <div
        className="fixed inset-0 -z-10 dark:hidden"
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: lightGradient,
          transition: "background 0.3s ease-out",
        }}
        aria-hidden="true"
      />
      {/* Dark mode gradient */}
      <div
        className="fixed inset-0 -z-10 hidden dark:block"
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: darkGradient,
          transition: "background 0.3s ease-out",
        }}
        aria-hidden="true"
      />
    </>
  );
}