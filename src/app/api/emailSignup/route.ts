import { NextResponse } from 'next/server'
import { client } from '@lib/sanity'
import { v4 as uuidv4 } from 'uuid'


export async function POST(req: Request) {
    try {
        const { email } = await req.json()
    
        if ( !email) {
          return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }
    
        const emailSignup = await client.create({
            _type: 'emailSignup',
            email
          })
    
        return NextResponse.json({ success: true, emailSignup })
      } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to signup' }, { status: 500 })
      }
}
