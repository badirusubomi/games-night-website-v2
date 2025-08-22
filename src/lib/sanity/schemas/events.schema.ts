export default {
	name: "event",
	title: "Event",
	type: "document",
	fields: [
		{ name: "title", title: "Title", type: "string" },
		{ name: "date", title: "Date", type: "datetime" },
		{
			name: "startTime",
			title: "startTime",
			type: "datetime",
			options: {
				timeStep: 15,
				timeFormat: "HH:mm", // Controls time display format
			},
		},
		{
			name: "endTime",
			title: "endTime",
			type: "datetime",
			options: {
				timeStep: 15,
				timeFormat: "HH:mm", // Controls time display format
			},
		},
		{ name: "location", title: "Location", type: "string" },
		{ name: "description", title: "Description", type: "text" },
		{
			name: "externalLink",
			title: "External Link",
			type: "document",
			fields: [
				{
					title: "Link Name",
					name: "linkName",
					type: "string",
				},
				{
					title: "Description",
					name: "description",
					type: "string",
				},
				{
					title: "url",
					name: "url",
					type: "url",
				},
			],
		},
		{
			name: "labelFields",
			title: "Label Fields",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "labelName",
							title: "labelName",
							type: "string",
						},
						{
							name: "labelTitle",
							title: "Label Title",
							type: "string",
						},
						{
							name: "labelFieldType",
							title: "Label Field Type",
							type: "string",
						},
						{
							name: "required",
							title: "required",
							type: "boolean",
						},
					],
				},
			],
		},
		{
			name: "attendees",
			title: "Attendees",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{ name: "name", title: "Name", type: "string" },
						{ name: "email", title: "Email", type: "string" },
					],
				},
			],
		},
	],
};
