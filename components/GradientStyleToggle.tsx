"use client";

import React, { useState, useEffect } from 'react';
import { Palette } from "lucide-react";
import { useGradientStyle } from "@/lib/GradientStyleContext";

export default function GradientStyleToggle() {
  const { gradientStyle, toggleGradientStyle } = useGradientStyle();
  const [mounted, setMounted] = useState(false);
  
  // Wait for client-side rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-white dark:bg-secondary-800 rounded-full px-4 py-2 shadow-lg ring-1 ring-brand-500/20">
      <button
        onClick={toggleGradientStyle}
        className="flex items-center gap-2 text-sm font-medium text-secondary-800 dark:text-white"
        title="Toggle gradient style"
      >
        <Palette className="h-4 w-4 text-brand-500" />
        <span>Style: {gradientStyle === 'wap' ? 'WAP' : 'Karaté'}</span>
      </button>
    </div>
  );
}