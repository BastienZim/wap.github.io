import * as React from "react";

export const gearList = [
  {
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5">
        <path d="M7.5 13.5 3.5 9.5m4 4 9-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Karategi (kimono) blanc, ceinture selon votre grade.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M12 3l8 4v5c0 5-3.5 9-8 9s-8-4-8-9V7l8-4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Protection buccale et gants si travail de kumite.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M7 10h10M7 14h7M5 5h14v14H5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Bouteille d’eau, petite serviette.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M12 8v5l3 2M5 3h14v4H5zM5 7v12h14V7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Arriver en avance pour s’échauffer et respecter l’étiquette du dojo.",
  },
];