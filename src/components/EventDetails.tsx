'use client'

import { useState } from 'react'
import { EventData } from '@/src/lib/sanity'

export default function EventDetails({ event }: { event: EventData }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bringing, setBringing] = useState('')
  const [guestNo, setGuestNo] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const attendees = Array.isArray(event.attendees) ? event.attendees : []

  async function handleRSVP(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event._id,
          name,
          email,
          bringing,
          guestNo
        })
      })

      if (!res.ok) throw new Error('Failed to submit RSVP')

      setSuccess(true)
      setName('')
      setEmail('')
      setBringing('')
      setGuestNo(0)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <article className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{event.title || 'Untitled event'}</h1>
        <p className="text-gray-600">
          <span className="font-semibold">Date:</span> {event.date ? new Date(event.date).toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            })
        : 'Date not set'}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Time:</span> {!event.startTime ? 'Time not set' : ` ${new Date(event.startTime).toLocaleString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZoneName: 'short',
            })} - ${new Date(event.endTime).toLocaleString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZoneName: 'short',
                })}` }
          
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Location:</span> <a className={`underline`} href={`https://www.google.com/maps/dir/?api=1&destination=${event.location.split(' ').join('+')}`} target='_blank'>{event.location || 'Location not set'}</a>
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
        <p className="text-gray-700">{event.description || 'No description provided yet.'}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Attendees & What They’re Bringing</h2>
        {attendees.length === 0 ? (
          <p className="text-gray-500">No RSVPs yet</p>
        ) : (
          <ul className="space-y-2">
            {attendees.map((a, i) => (
              <li key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
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
        <form onSubmit={handleRSVP} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name (required)</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-2 mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
            //   required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-2 mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">What will you be bringing?</label>
            <input
              type="text"
              value={bringing}
              onChange={(e) => setBringing(e.target.value)}
              className="pl-2 mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of guests</label>
            <input
              type="number"
              value={guestNo}
              onChange={(e) => setGuestNo(parseInt(e.target.value))}
              className="pl-2 mt-1 text-black block w-full font-mono rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">RSVP submitted!</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'RSVP'}
          </button>
        </form>
      </section>
    </article>
  )
}
