// data/schedule.ts

// Define a type for schedule entries
export type ScheduleEntry = {
  day: string;
  time: string;
  venue: string;
  club: string;
  mapUrl: string;
  address: string; // New field for address
};

// Combined schedule with venue links
export const schedule: ScheduleEntry[] = [
  {
    day: "Lundi",
    time: "12h–13h30",
    venue: "Dojo de la tour d'Auvergne",
    club: "WAP",
    mapUrl: "https://maps.app.goo.gl/9LAPnTbSYbfVmh129",
    address: "15 bis Rue Louise-Émilie de la Tour d'Auvergne, 75009 Paris",
  },
  {
    day: "Mercredi",
    time: "20h–22h",
    venue: "Petit Gymnase espace Jean Dame",
    club: "WAP",
    mapUrl: "https://maps.app.goo.gl/9NECicBH1pkWhbrK8",
    address: "Centre Sportif Jean Dame, 17 Rue Léopold Bellan, 75002 Paris",
  },
  {
    day: "Vendredi",
    time: "20h–22h",
    venue: "Dojo Centre Victoire Tinayre",
    club: "WAP",
    mapUrl: "https://maps.app.goo.gl/hKyUygLpVbkna3MC9",
    address: "24 Rue Daviel, 75013 Paris",
  },
  {
    day: "Samedi",
    time: "18h–19h",
    venue: "Dojo du Centre Jacques Bravo",
    club: "WAP",
    mapUrl: "https://maps.app.goo.gl/kSvd8HsdeJrkTWPD7",
    address: "14-18 Rue de la Tour des Dames, 75009 Paris",
  },
  {
    day: "Samedi",
    time: "19h–21h",
    venue: "Dojo du Centre Jacques Bravo",
    club: "WAP",
    mapUrl: "https://maps.app.goo.gl/kSvd8HsdeJrkTWPD7",
    address: "14-18 Rue de la Tour des Dames, 75009 Paris",
  },
  {
    day: "Dimanche",
    time: "12h–15h",
    venue: "Dojo du stade Charléty",
    club: "MEIWAKAN",
    mapUrl: "https://maps.app.goo.gl/3nh7XSMfY8Uk1YZUA",
    address: "99 Bd Kellermann, 75013 Paris",
  },
];
