'use client'

import { FormEvent, useState } from "react";

export default function EmailSignUp() {
  const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
  
  
    async function submitEmail(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true)

  
        try {
            const res = await fetch('/api/emailSignup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email,
              })
            })
      
            if (!res.ok) throw new Error('Failed to signup')
      
            setSuccess(true)
            setEmail('')
          } catch (err: any) {
            setError(err.message)
          } finally {
            setIsSubmitting(false)
          }
    }

  return (
    <form onSubmit={submitEmail}
						className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
					>
        <input
            type="email"
            value={email}
            hidden={success? true: false}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg text-gray-900 bg-white"
            required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
          {/* {success && <p className="text-white text-sm">Thanks for joining!</p>} */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Joining...' : success ? 'Thanks for joining!': 'Join Our Newsletter'}
          </button>
        {/* <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
            
        </button> */}
	</form>
  )
}
