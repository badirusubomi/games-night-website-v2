import { NextResponse } from "next/server";
import { serverClient } from "@/src/lib/sanity/sanity";

export async function POST(req: Request) {
	try {
		const data = await req.json();
		const { eventId, ...rest } = data;

		if (!eventId || !rest["name"]) {
			// It at least checks for a name
			return NextResponse.json({ error: "Missing fields" }, { status: 400 });
		}

		const uniqueKey =
			Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

		const attendee = await serverClient
			.patch(eventId)
			.setIfMissing({ attendees: [] })
			.append("attendees", [{ _key: uniqueKey, ...rest }])
			.commit();

		return NextResponse.json({ success: true, attendee });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Failed to RSVP" }, { status: 500 });
	}
}
