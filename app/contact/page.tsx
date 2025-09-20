// app/contact/page.tsx  (if using Next.js App Router)
// OR pages/contact.tsx   (if using Pages Router)

"use client";

// import ThemeGradientBackground from "@/components/ThemeGradientBackground";
import { schedule } from "@/data/schedule";
import contactData from "@/data/contact.json";

export default function ContactPage() {

  return (
    <>
      <main className="container mx-auto max-w-4xl px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-foreground mb-4 tracking-wide">
            Contact
          </h1>
          <div className="w-12 h-px bg-brand-500 mx-auto"></div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Information Section */}
          <div className="space-y-12">
            {/* Description */}
            <div className="text-center">
              <p className="text-lg text-secondary-600 dark:text-secondary-400 font-light">
                {contactData.description}
              </p>
            </div>

            {/* Direct Contact */}
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-widest text-secondary-500 dark:text-secondary-400 font-light">
                  Email
                </p>
                <a 
                  href={`mailto:${contactData.email}`} 
                  className="text-xl text-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-light"
                >
                  {contactData.email}
                </a>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-widest text-secondary-500 dark:text-secondary-400 font-light">
                  Téléphone
                </p>
                <a 
                  href={`tel:${contactData.phone.tel}`} 
                  className="text-xl text-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-light"
                >
                  {contactData.phone.display}
                </a>
              </div>
            </div>

            {/* Locations */}
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-secondary-500 dark:text-secondary-400 font-light">
                Dojos
              </p>
              <div className="space-y-3">
                {Array.from(new Set(schedule.map(item => JSON.stringify({ venue: item.venue, address: item.address, mapUrl: item.mapUrl }))))
                  .map(uniqueVenue => JSON.parse(uniqueVenue))
                  .map((location, index) => (
                    <div key={index} className="space-y-1">
                      <a
                        href={location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-light"
                      >
                        {location.venue}
                      </a>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400 font-light">
                        {location.address}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-secondary-500 dark:text-secondary-400 font-light">
                Horaires
              </p>
              <div className="space-y-2">
                {schedule.map((item, index) => (
                  <div key={index} className="flex justify-between items-baseline">
                    <span className="text-foreground font-light">
                      {item.day} {item.time}
                    </span>
                    <span className="text-sm text-secondary-500 dark:text-secondary-400 font-light">
                      {item.club}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-secondary-500 dark:text-secondary-400 font-light">
                Suivez-nous
              </p>
              <div className="flex space-x-6">
                {contactData.social.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-light"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
