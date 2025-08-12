import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_KEY || undefined,
})

export interface Attendee {
  name: string
  bringing?: string
}

export interface EventData {
  _id: string
  title: string
  date?: string
  startTime?: string
  endTime?: string
  location?: string
  description?: string
  attendees?: Attendee[]
}

export async function fetchEventById(id: string): Promise<EventData | null> {
  const query = `*[_type == "event" && _id == $id][0]{
    _id,
    title,
    date,
    startTime,
    endTime,
    location,
    description,
    attendees[] {
      name,
      bringing
    }
  }`
  return client.fetch(query, { id })
}

export async function fetchEvents(): Promise<EventData[] | null> {
    const EVENTS_QUERY = `*[
        _type == "event"
      ]{_id, title, description, date, startTime, endTime}`;

    const options = { next: { revalidate: 30 } };


    return client.fetch(EVENTS_QUERY, {}, options);
    
  }