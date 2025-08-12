export default {
	name: 'event',
	title: 'Event',
	type: 'document',
	fields: [
	  { name: 'title', title: 'Title', type: 'string' },
	  { name: 'date', title: 'Date', type: 'datetime' },
	  { name: 'startTime', title: 'startTime', type: 'datetime',
		options: {
			timeStep: 15,
			timeFormat: 'HH:mm',     // Controls time display format
		} 
		},
	  { name: 'endTime', title: 'endTime', type: 'datetime',
		options: {
			timeStep: 15,
			timeFormat: 'HH:mm',     // Controls time display format
		}
	 	},
	  { name: 'location', title: 'Location', type: 'string' },
	  { name: 'description', title: 'Description', type: 'text' },
	  {
		name: 'attendees',
		title: 'Attendees',
		type: 'array',
		of: [
		  {
			type: 'object',
			fields: [
			  { name: 'name', title: 'Name', type: 'string' },
			  { name: 'email', title: 'Email', type: 'string' },
			  { name: 'bringing', title: 'Bringing', type: 'string' },
			  { name: 'guestNo', title: 'NumberofGuests', type: 'number' },
			],
		  },
		],
	  },
	],
  }
