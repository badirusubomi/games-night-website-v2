import {fetchEvents} from "@lib/sanity"
import EmailSignUp from "../components/emailSignUp";

export default async function Home() {

	const events = await fetchEvents();

	return (
		<div className="min-h-screen bg-gray-50 text-gray-800">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20">
				<div className="max-w-4xl mx-auto text-center px-4">
					<h1 className="text-5xl font-bold mb-4"> The Homies Invite You</h1>
					<p className="text-lg mb-6">
						We host amazing events every now and then. Come through and have fun.
					</p>

					<EmailSignUp/>
				</div>
			</section>

			{/* Upcoming Events */}
			<section className="max-w-5xl mx-auto py-16 px-4">
				<h2 className="text-3xl font-semibold mb-8 text-center">Upcoming Events</h2>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{events.map((event) => (
						<div
							key={event._id}
							className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
						>
							{/* <img
								src={`https://source.unsplash.com/random/400x250?sig=${event.}&event`}
								alt="Event"
								className="w-full h-48 object-cover"
							/> */}
							<div className="p-4">
								<a href={`/events/${event._id}`}>
									<h3 className="font-semibold text-lg mb-2">{event.title}</h3>
									<p className="text-gray-600 text-sm mb-4">
									{event.description}
									</p>
									<h2 className="text-indigo-600 font-medium hover:underline">Learn More →</h2>
								</a>
								
							</div>
						</div>
					))}
				</div>
			</section>
			<section className=" mx-auto py-16 px-4 ">
				<h5 className=" font-mono mb-8 text-center ">Subbie © 2025</h5>
			</section>

		</div>
	);
}
