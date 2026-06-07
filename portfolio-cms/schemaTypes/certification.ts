export default{
    name: 'certification',
    title: 'Certifications',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Certification Title',
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
            name: 'expirationDate',
            title: 'Date of Expiration (if any)',
            type: 'string',
            description: "Leave empty if the credential does not expire",
        },
        {
            name: 'credentialURL',
            title: 'Credential URL',
            type: 'url',
            description: "URL of the credential, if any.",
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