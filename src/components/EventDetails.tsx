"use client";

import { useState } from "react";
import { EventData } from "@/src/lib/sanity/sanity";

export default function EventDetails({ event }: { event: EventData }) {
	// Dynamic form state for all RSVP fields
	const [formData, setFormData] = useState<{ [key: string]: any }>(() => {
		// Initialize with empty values for each labelField
		const initial: { [key: string]: any } = {};
		if (Array.isArray(event.labelFields)) {
			event.labelFields.forEach((field: any) => {
				initial[field.labelName] = "";
			});
		}
		return initial;
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const attendees = Array.isArray(event.attendees) ? event.attendees : [];

	// Generic change handler
	const handleChange = (field: string, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	async function handleRSVP(e: React.FormEvent) {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);
		setSuccess(false);

		try {
			const res = await fetch("/api/rsvp", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					eventId: event._id,
					...formData,
				}),
			});

			if (!res.ok) throw new Error("Failed to submit RSVP");

			setSuccess(true);
			// Reset all fields
			setFormData((prev) => {
				const reset: { [key: string]: any } = {};
				Object.keys(prev).forEach((k) => {
					reset[k] = typeof prev[k] === "number" ? 0 : "";
				});
				return reset;
			});
		} catch (err: any) {
			setError(err.message);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<article className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-8">
			<header className="space-y-2">
				<h1 className="text-3xl font-bold text-gray-900">
					{event.title || "Untitled event"}
				</h1>
				<p className="text-gray-600">
					<span className="font-semibold">Date:</span>{" "}
					{event.date
						? new Date(event.date).toLocaleString(undefined, {
								year: "numeric",
								month: "long",
								day: "numeric",
							})
						: "Date not set"}
				</p>
				<p className="text-gray-600">
					<span className="font-semibold">Time:</span>{" "}
					{!event.startTime
						? "Time not set"
						: ` ${new Date(event.startTime).toLocaleString(undefined, {
								hour: "2-digit",
								minute: "2-digit",
								hour12: true,
								timeZoneName: "short",
							})} - ${new Date(event.endTime).toLocaleString(undefined, {
								hour: "2-digit",
								minute: "2-digit",
								hour12: true,
								timeZoneName: "short",
							})}`}
				</p>
				<p className="text-gray-600">
					<span className="font-semibold">Location:</span>{" "}
					<a
						className={`underline`}
						href={`https://www.google.com/maps/dir/?api=1&destination=${event.location.split(" ").join("+")}`}
						target="_blank"
					>
						{event.location || "Location not set"}
					</a>
				</p>
			</header>

			<section>
				<h2 className="text-xl font-semibold text-gray-800 mb-2">
					Event Details
				</h2>
				<div className="text-gray-700 text-sm whitespace-pre-line">
					{event.description || "No description provided yet."}
				</div>

				{event?.externalLink && (
					<>
						<div className="text-blue-700 hover:underline">
							<a
								href={event.externalLink.url}
								target="_tab"
							>
								{event?.externalLink.description}
							</a>
						</div>
					</>
				)}
			</section>

			<section>
				<h2 className="text-xl font-semibold text-gray-800 mb-4">Attendees</h2>
				{attendees.length === 0 ? (
					<p className="text-gray-500">No RSVPs yet</p>
				) : (
					<ul className="space-y-2">
						{attendees.map((a, i) => (
							<li
								key={i}
								className="p-3 bg-gray-50 rounded-lg border border-gray-200"
							>
								<span className="font-medium text-gray-900">{a.name}</span>
								{a.bringing && (
									<span className="text-gray-600"> — {a.bringing}</span>
								)}
							</li>
						))}
					</ul>
				)}
			</section>

			<section>
				<h2 className="text-xl font-semibold text-gray-800 mb-4">RSVP</h2>
				<form
					onSubmit={handleRSVP}
					className="space-y-4"
				>
					<div>
						{/* Render dynamic fields from event.labelFields */}
						{Array.isArray(event.labelFields) &&
							event.labelFields.map((field: any) => (
								<div
									key={field.labelName}
									className="mb-2"
								>
									<label className="block text-sm font-medium text-gray-700">
										{field.labelTitle}
									</label>
									<input
										type={field.labelFieldType || "text"}
										required={field.required}
										value={formData[field.labelName] || ""}
										onChange={(e) =>
											handleChange(field.labelName, e.target.value)
										}
										className="pl-2 mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
									/>
								</div>
							))}
					</div>
					{/* <div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="text"
							value={formData.email || ""}
							onChange={(e) => handleChange("email", e.target.value)}
							className="pl-2 mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div> */}
					{/* <div>
						<label className="block text-sm font-medium text-gray-700">
							Number of guests
						</label>
						<input
							type="number"
							value={formData.guestNo || 0}
							onChange={(e) =>
								handleChange("guestNo", parseInt(e.target.value) || 0)
							}
							className="pl-2 mt-1 text-black block w-full font-mono rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div> */}
					{error && <p className="text-red-500 text-sm">{error}</p>}
					{success && <p className="text-green-600 text-sm">RSVP submitted!</p>}
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
					>
						{isSubmitting ? "Submitting..." : "RSVP"}
					</button>
				</form>
			</section>
		</article>
	);
}
