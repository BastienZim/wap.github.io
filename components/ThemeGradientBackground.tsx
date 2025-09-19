import React from "react";

type ThemeGradientBackgroundProps = {
  mode?: "auto" | "light" | "dark";
};

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

  // Light: white to brand
  const lightBackground = React.useMemo(() => {
    const colorA = [254, 253, 255]; // white
    const colorB = [243, 165, 75];  // brand orange
    const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
    const rgb = colorA.map((a, i) => lerp(a, colorB[i], scroll));
    return `linear-gradient(to bottom, rgb(${rgb.join(",")}) 0%, rgb(${colorB.join(",")}) 100%)`;
  }, [scroll]);

  // Dark: brown to brand
  const darkBackground = React.useMemo(() => {
    const colorA = [105, 74, 56]; // brown
    const colorB = [243, 165, 75]; // brand orange
    const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
    const rgb = colorA.map((a, i) => lerp(a, colorB[i], scroll));
    return `linear-gradient(to bottom, rgb(${rgb.join(",")}) 0%, rgb(${colorB.join(",")}) 100%)`;
  }, [scroll]);

  if (mode === "light") {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: lightBackground,
          transition: "background 0.3s linear",
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
          background: darkBackground,
          transition: "background 0.3s linear",
        }}
        aria-hidden="true"
      />
    );
  }

  // auto: light for light mode, dark for dark mode
  return (
    <>
      <div
        className="fixed inset-0 -z-10 dark:hidden"
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: lightBackground,
          transition: "background 0.3s linear",
        }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 -z-10 dark:block hidden"
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: darkBackground,
          transition: "background 0.3s linear",
        }}
        aria-hidden="true"
      />
    </>
  );
}