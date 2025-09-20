// components/Schedule.tsx
import { schedule } from "../data/schedule";


export default function Schedule() {
  return (
    <section
      id="schedule"
      className="w-8/10 mx-auto p-6 rounded-lg shadow dark:bg-primary-800"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
        Planning Hebdomadaire
      </h2>

      <div className="mt-6 overflow-x-auto rounded-lg ring-1 ring-secondary-300">
        <table
          className="w-full table-auto text-sm md:text-base"
          aria-label="Planning hebdomadaire des activités"
        >
          <thead>
            <tr
              className="
                sticky top-0 z-10
                bg-secondary-50 text-foreground
                backdrop-blur supports-[backdrop-filter]:bg-secondary-50/80
              "
            >
              <th className="px-4 py-3 text-left font-semibold">Jour</th>
              <th className="px-4 py-3 text-left font-semibold">Horaire</th>
              <th className="px-4 py-3 text-left font-semibold">Lieu</th>
              <th className="px-4 py-3 text-left font-semibold">Club</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-secondary-300">
            {schedule.map((item, index) => (
              <tr
                key={index}
                tabIndex={0}
                className="
                  outline-none transition-colors
                  odd:bg-background even:bg-secondary-50
                  hover:bg-brand-50
                  focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background
                "
              >
                <td className="px-4 py-2 font-medium text-foreground">
                  {item.day}
                </td>
                <td className="px-4 py-2 text-secondary-700 dark:text-secondary-300">{item.time}</td>
                <td className="px-4 py-2 text-secondary-700 dark:text-secondary-300">
                  {item.mapUrl ? (
                    <a
                      href={item.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 hover:text-brand-700 transition-colors font-medium no-underline"
                    >
                      {item.venue}
                    </a>
                  ) : (
                    item.venue
                  )}
                </td>
                <td className="px-4 py-2 font-semibold text-tertiary-600">
                  {item.club.replace(/[>]+$/g, "")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-center text-xs md:text-sm text-secondary-700">
        * Les horaires peuvent varier selon la saison et la disponibilité des gymnases.
      </p>
    </section>
  );
}
