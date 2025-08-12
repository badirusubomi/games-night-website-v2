import { NextResponse } from 'next/server'
import { serverClient } from '@lib/sanity'


export async function POST(req: Request) {
    try {
        consoel.log(`Testing env. variables: Sanity Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
        const { email } = await req.json()
    
        if ( !email) {
          return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }
    
        const emailSignup = await serverClient.create({
            _type: 'emailSignup',
            email
          })
    
        return NextResponse.json({ success: true, emailSignup })
      } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to signup' }, { status: 500 })
      }
}
