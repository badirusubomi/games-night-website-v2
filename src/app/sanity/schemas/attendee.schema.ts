export default {
    name: 'attendee',
    title: 'Attendee',
    type: 'document',
    fields: [
      {
        name: 'event',
        title: 'Event',
        type: 'reference',
        to: [{ type: 'event' }]
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string'
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string'
      }
    ]
  }
  