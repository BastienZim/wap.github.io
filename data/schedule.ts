// data/schedule.ts

export const schedule = [
  { day: "Lundi", time: "12h–13h30", venue: "Gymnase de la tour d'auvergne", club: "WAP" },
  { day: "Mercredi", time: "20h–22h", venue: "Gymnase Jean Dame", club: "WAP" },
  { day: "Vendredi", time: "20h–22h", venue: "Centre Victoire Tinayre", club: "WAP" },
  { day: "Samedi", time: "19h–21h", venue: "Centre Jacques Bravo", club: "WAP" },
  { day: "Dimanche", time: "12h–15h", venue: "Dojo du stade Charléty", club: "MEIWAKAN" },
];

// Map venue names to Google Maps URLs
export const venueLinks: Record<string, string> = {
  "Gymnase de la tour d'auvergne": "https://www.google.com/maps/place/Tour+d'Auvergne+Gymnase/",
  "Gymnase Jean Dame": "https://www.google.com/maps/place/Espace+Jean+Dame/@48.8665737,2.3452261,15z/",
  "Centre Victoire Tinayre": "https://www.google.com/maps/place/Gymnase+Tinayre/",
  "Centre Jacques Bravo": "https://www.google.com/maps/place/Gymnase+Jacques+Bravo/",
  "Dojo du stade Charléty": "https://www.google.com/maps/place/Stade+Charléty/",
};
