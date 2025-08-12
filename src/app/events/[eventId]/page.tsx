// pages/[eventId].js
// import { fetchEventById } from 
import { fetchEventById } from '@lib/sanity'
import EventDetails from '@components/EventDetails'
import { notFound } from 'next/navigation'


interface Props {
    params: { eventId: string }
}


export default async function EventPage(props: { params: Promise<{ eventId: string }> }) {
const { eventId } = await props.params;

const event = await fetchEventById(eventId)
  if (!event) {
    notFound()
    // return (
    //     <main style={{ padding: 32 }}>
    //       <h1>Event not found</h1>
    //       <p>We could not find an event with that id.</p>
    //     </main>
    //   )
  }
  return (
    <main style={{ padding: 32 }}>
      <EventDetails event={event!} />
    </main>
  )
}

// export async function getServerSideProps(context) {
//   const { eventId } = context.params

//   try {
//     const event = await fetchEventById(eventId)

//     if (!event) {
//       return { props: { event: null, notFound: true } }
//     }

//     return { props: { event } }
//   } catch (err) {
//     console.error('Sanity fetch error', err)
//     return { props: { event: null, notFound: true } }
//   }
// }