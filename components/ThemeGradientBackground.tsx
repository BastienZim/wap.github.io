import React from "react";

type GradientStyle = 'sunrise' | 'ocean' | 'ember' | 'forest' | 'royal' | 'sunset' | 'wap' | 'karate';

type ThemeGradientBackgroundProps = {
  mode?: 'auto' | 'light' | 'dark';
  style?: GradientStyle;
};

/**
 * Dynamic ThemeGradientBackground with Multiple Style Options
 * 
 * Props:
 *  - mode: 'auto' | 'light' | 'dark' - Controls light/dark theme behavior
 *  - style: Selects from various gradient presets
 *    - 'sunrise' (default): Warm orange theme
 *    - 'ocean': Blue aquatic theme
 *    - 'ember': Fiery red/orange theme
 *    - 'forest': Nature-inspired green theme
 *    - 'royal': Purple/indigo theme
 *    - 'sunset': Dramatic pink/purple theme
 *    - 'wap': Brand orange theme (uses site color tokens)
 *    - 'karate': Coffee-blue theme (uses site color tokens)
 */

// Collection of beautiful gradient presets inspired by hypercolor.dev
// Each has a light and dark mode variant
const GRADIENTS = {
  // Default warm orange theme
  sunrise: {
    light: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 45%, #f97316 100%)',
    dark: 'linear-gradient(135deg, #0c1427 0%, #1e3a8a 45%, #f59e0b 100%)'
  },
  // Cool blue aquatic theme
  ocean: {
    light: 'linear-gradient(135deg, #ecfeff 0%, #67e8f9 45%, #0891b2 100%)',
    dark: 'linear-gradient(135deg, #082f49 0%, #155e75 45%, #0ea5e9 100%)'
  },
  // Fiery red theme
  ember: {
    light: 'linear-gradient(135deg, #fef2f2 0%, #fca5a5 45%, #dc2626 100%)',
    dark: 'linear-gradient(135deg, #1c1917 0%, #991b1b 45%, #f97316 100%)'
  },
  // Nature-inspired green theme
  forest: {
    light: 'linear-gradient(135deg, #f0fdf4 0%, #6ee7b7 45%, #059669 100%)',
    dark: 'linear-gradient(135deg, #022c22 0%, #064e3b 45%, #10b981 100%)'
  },
  // Rich purple theme
  royal: {
    light: 'linear-gradient(135deg, #f5f3ff 0%, #c4b5fd 45%, #7c3aed 100%)',
    dark: 'linear-gradient(135deg, #2e1065 0%, #5b21b6 45%, #a855f7 100%)'
  },
  // Dramatic sunset theme
  sunset: {
    light: 'linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 45%, #db2777 100%)',
    dark: 'linear-gradient(135deg, #4c0519 0%, #9d174d 45%, #f472b6 100%)'
  },
  
  // CUSTOM THEME-BASED GRADIENTS
  
  // Brand-primary gradient using fixed hex colors matching theme
  wap: {
    dark: 'linear-gradient(135deg, #ffffff 0%, #ffe8cc 45%, #f3a54b 100%)',
    light: 'linear-gradient(135deg, #3d2b1f 0%, #c88430 55%, #f3a54b 100%)'
  },
  
  // Coffee-blue gradient using fixed hex colors matching theme
  karate: {
    light: 'linear-gradient(135deg, #dbe8ee 0%, #8eb1c7 40%, #9e7052 100%)',
    dark: 'linear-gradient(135deg, #2a1d17 0%, #452f24 50%, #5a7387 100%)'
  }
};

export default function ThemeGradientBackground({ 
  mode = 'auto',
  style = 'sunrise' 
}: ThemeGradientBackgroundProps) {
  // Get selected gradient style or default to sunrise
  const selectedGradient = GRADIENTS[style] || GRADIENTS.sunrise;
  
  // Base style common to all gradient elements
  const baseStyle = {
    minHeight: '100vh',
    width: '100vw',
    transition: 'background 0.6s ease-out'
  };

  // Explicit light mode rendering
  if (mode === 'light') {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          ...baseStyle,
          background: selectedGradient.light
        }}
        aria-hidden="true"
      />
    );
  }

  // Explicit dark mode rendering
  if (mode === 'dark') {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          ...baseStyle,
          background: selectedGradient.dark
        }}
        aria-hidden="true"
      />
    );
  }

  // Auto mode: use CSS classes to respond to theme preference
  return (
    <>
      {/* Light mode gradient */}
      <div
        className="fixed inset-0 -z-10 dark:hidden"
        style={{
          ...baseStyle,
          background: selectedGradient.light
        }}
        aria-hidden="true"
      />
      {/* Dark mode gradient */}
      <div
        className="fixed inset-0 -z-10 hidden dark:block"
        style={{
          ...baseStyle,
          background: selectedGradient.dark
        }}
        aria-hidden="true"
      />
    </>
  );
}