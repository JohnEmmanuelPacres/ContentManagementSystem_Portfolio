export default{
    name: 'achievement',
    title: 'Achievements and Certifications',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Achievement Title',
            type: 'string',
        },
        {
            name: 'issuer',
            title: 'Issuing Organization or Event',
            type: 'string',
        },
        {
            name: 'issueDate',
            title: 'Date Issued',
            type: 'date',
        },
        {
            name: 'description',
            title: 'Summary',
            type: 'text',
        },
        {
            name: 'qrImage',
            title: 'QR Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        }
    ],
}