"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type GradientStyle = 'sunrise' | 'ocean' | 'ember' | 'forest' | 'royal' | 'sunset' | 'wap' | 'karate';

interface GradientStyleContextType {
  gradientStyle: GradientStyle;
  toggleGradientStyle: () => void;
}

// Default to wap style
const defaultValue: GradientStyleContextType = {
  gradientStyle: 'wap',
  toggleGradientStyle: () => {}
};

const GradientStyleContext = createContext<GradientStyleContextType>(defaultValue);

export const useGradientStyle = () => useContext(GradientStyleContext);

export const GradientStyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [gradientStyle, setGradientStyle] = useState<GradientStyle>('wap');

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gradientStyle") as GradientStyle | null;
      if (saved && (saved === 'wap' || saved === 'karate')) {
        setGradientStyle(saved);
      }
    } catch {
      // Ignore errors accessing localStorage
    }
  }, []);

  const toggleGradientStyle = () => {
    const newStyle = gradientStyle === 'wap' ? 'karate' : 'wap';
    try {
      localStorage.setItem("gradientStyle", newStyle);
    } catch {
      // Ignore errors setting localStorage
    }
    setGradientStyle(newStyle);
  };

  return (
    <GradientStyleContext.Provider value={{ gradientStyle, toggleGradientStyle }}>
      {children}
    </GradientStyleContext.Provider>
  );
};