export default {
    name: 'achievement',
    title: 'Achievement',
    type: 'document',
    fields: [
        {
            name: 'achievement',
            title: 'Achievement',
            type: 'string',
        },
        {
            name: 'awardDate',
            title: 'Date received',
            type: 'string',
            description: 'Enter a date (e.g., "2024")',
        },
        {
            name: 'awardingOrganization',
            title: 'Awarding Organization',
            type: 'string',
        },
        {
            name: 'link',
            title: 'Link to award/achievement',
            type: 'url',
            description: 'URL of the award/achievement, if any.',
        },
        {
            name: 'qrImage',
            title: 'QR Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'QR code image for the award/achievement, if any.',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
    ]
}