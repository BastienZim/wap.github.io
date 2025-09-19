// components/LieuxHorairesAligned.tsx
import Image from "@/components/ui/BaseImage";
import Link from "next/link";
import { schedule } from "../data/schedule";

const venueLinks: Record<string, string> = {
	"Gymnase de la tour d'auvergne":
		"https://www.google.com/maps/place/Tour+d'Auvergne+Gymnase/",
	"Gymnase Jean Dame":
		"https://www.google.com/maps/place/Espace+Jean+Dame/@48.8665737,2.3452261,15z/",
	"Centre Victoire Tinayre": "https://www.google.com/maps/place/Gymnase+Tinayre/",
	"Centre Jacques Bravo": "https://www.google.com/maps/place/Gymnase+Jacques+Bravo/",
	"Dojo du stade Charléty": "https://www.google.com/maps/place/Stade+Charléty/",
};

const landmarks = [
	{
		src: "images/directly_useful/pictotoureiffel2.png",
		alt: "Tour Eiffel",
		width: 68,
		height: 68,
		left: "32%",
		top: "43%",
	},
	{
		src: "images/directly_useful/pictonotredame3.png",
		alt: "Notre-Dame",
		width: 68,
		height: 68,
		left: "60%",
		top: "52%",
	},
	{
		src: "images/directly_useful/pictosacrecoeur2.png",
		alt: "Sacré-Cœur",
		width: 64,
		height: 64,
		left: "57%",
		top: "17%",
	},
];

export default function LieuxHorairesAligned() {
	return (
		<section id="carousel_212e" className="py-16 bg-primary-100 text-white">
			<div className="mx-auto max-w-5xl px-6">
				<h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-neutral-900">
					Lieux &amp; Horaires
				</h3>

				{/* Map container with white background, then arrondissements, then monuments */}
				<div className="relative w-full aspect-[700/467] rounded-xl overflow-hidden shadow-lg bg-secondary-100">
					{/* Paris arrondissements background, slightly reduced size */}
					<Image
						src="images/directly_useful/paris_background.png"
						alt="Paris arrondissements"
						className="absolute z-10"
						style={{
							top: "50%",
							left: "50%",
							width: "85%",
							height: "85%",
							transform: "translate(-50%, -50%)",
							objectFit: "cover",
							opacity: 1,
						}}
					/>

					{/* Landmark icons, positioned by percentage */}
					{landmarks.map((icon, idx) => (
						<div
							key={icon.alt}
							className="absolute z-20"
							style={{
								left: icon.left,
								top: icon.top,
								transform: "translate(-50%, -50%)",
								pointerEvents: "auto",
							}}
							aria-label={icon.alt}
							title={icon.alt}
						>
							<Image
								src={icon.src}
								alt={icon.alt}
								width={icon.width}
								height={icon.height}
								className="opacity-90"
							/>
						</div>
					))}
				</div>

				{/* Content card with links/times */}
				<div className="mt-8 rounded-2xl bg-white/95 text-gray-900 shadow-lg p-6 md:p-8">
					<p>
						Les entraînements se déroulent en soirée et week-end sur plusieurs
						Lieux à Paris :
					</p>
					<ul className="mt-4 space-y-3">
						{schedule.map((item, idx) => (
							<li key={idx}>
								<span className="font-semibold">
									{item.day} {item.time}
								</span>{" "}
								—{" "}
								{venueLinks[item.venue] ? (
									<Link
										href={venueLinks[item.venue]}
										target="_blank"
										className="text-tertiary-700 hover:underline font-medium"
									>
										{item.venue}
									</Link>
								) : (
									item.venue
								)}
								{item.club ? (
									<span className="text-gray-500"> ({item.club})</span>
								) : null}
							</li>
						))}
					</ul>
					<p className="mt-4 text-gray-700">
						Des cours d’essai sont proposés, merci de prendre contact au
						préalable.
					</p>
				</div>
			</div>
		</section>
	);
}
