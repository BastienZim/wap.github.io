// data/schedule.ts

// Define a type for schedule entries
export type ScheduleEntry = {
  day: string;
  time: string;
  venue: string;
  club: string;
  mapUrl: string;
};

// Combined schedule with venue links
export const schedule: ScheduleEntry[] = [
  {
    day: "Lundi",
    time: "12h–13h30",
    venue: "Dojo de la tour d'auvergne",
    club: "WAP",
    mapUrl: "https://www.google.com/maps/place/14+Rue+de+la+Tour+des+Dames,+75009+Paris/@48.8778838,2.3307278,974m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47e66e4840a484bd:0xe5d080c901318e11!8m2!3d48.8778838!4d2.3333081!16s%2Fg%2F11nntqg_9z?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    day: "Mercredi",
    time: "20h–22h",
    venue: "Petit Gymnase espace Jean Dame",
    club: "WAP",
    mapUrl: "https://www.google.com/maps/place/Espace+Jean+Dame/@48.8664934,2.3427862,975m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47e66e3d55e06ff5:0xfa0f024b06d8b412!8m2!3d48.8664934!4d2.3453665!16s%2Fg%2F1tf_s5hw?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    day: "Vendredi",
    time: "20h–22h",
    venue: "Dojo Centre Victoire Tinayre",
    club: "WAP",
    mapUrl: "https://www.google.com/maps/place/Daviel+Activity+Center/@48.8285362,2.3421938,975m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47e67197a97ad3d7:0x5db1b28155f142df!8m2!3d48.8285362!4d2.3447741!16s%2Fg%2F1vbnnqb6?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    day: "Samedi",
    time: "18h–19h",
    venue: "Dojo du Centre Jacques Bravo",
    club: "WAP",
    mapUrl: "https://www.google.com/maps/place/Centre+Paris+Anim'+Jacques+Bravo/@48.8778942,2.3302587,974m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47e66e4838aa9dad:0xc3f34376f102cbf1!8m2!3d48.8778942!4d2.332839!16s%2Fg%2F11j8ln9fn2?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    day: "Samedi",
    time: "19h–21h",
    venue: "Dojo du Centre Jacques Bravo",
    club: "WAP",
    mapUrl: "https://www.google.com/maps/place/Centre+Paris+Anim'+Jacques+Bravo/@48.8778942,2.3302587,974m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47e66e4838aa9dad:0xc3f34376f102cbf1!8m2!3d48.8778942!4d2.332839!16s%2Fg%2F11j8ln9fn2?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    day: "Dimanche",
    time: "12h–15h",
    venue: "Dojo du stade Charléty",
    club: "MEIWAKAN",
    mapUrl: "https://www.google.com/maps/place/Stade+S%C3%A9bastien+Charl%C3%A9ty/@48.8185279,2.3440703,976m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47e6719ee46bb021:0x522707cdd3299d6b!8m2!3d48.8185279!4d2.3466506!16zL20vMGRfYzc2?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D",
  },
];
