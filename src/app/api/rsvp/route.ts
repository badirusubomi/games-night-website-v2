import { NextResponse } from 'next/server'
import { serverClient } from '@lib/sanity'

export async function POST(req: Request) {
    try {
        const { eventId, name, email, bringing, guestNo } = await req.json()
    
        if (!eventId || !name ) {
          return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }
    
        const attendee = await serverClient.patch(eventId)
        .setIfMissing({ attendees: [] })
        .append("attendees", [{ name, email, bringing, guestNo }])
        .commit();
    
        return NextResponse.json({ success: true, attendee })
      } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to RSVP' }, { status: 500 })
      }
}
