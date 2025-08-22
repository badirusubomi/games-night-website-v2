import { fetchEvents } from "@/src/lib/sanity/sanity";

export default async function Event() {
	const events = await fetchEvents();

	return (
		<div className="font-mono grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<h3>Current Events</h3>
			<ul className="flex flex-col align-middle justify-center gap-y-4">
				{events?.map((event: any) => (
					<li
						className="hover:underline"
						key={event._id}
					>
						<a
							href={`/events/${event._id}`}
							className="text-white text-2xl font-light hover:underline"
						>
							<h2 className="text-xl font-semibold">{event.title}</h2>

							<p className="text-white text-sm">
								{event.description?.length > 100
									? event.description.slice(0, 100) + ". . ."
									: event.description}
							</p>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
