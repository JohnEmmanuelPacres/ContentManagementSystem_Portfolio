export default{
    name: "work",
    title: "Work",
    type: "document",
    fields: [
        {
            name: 'companyName',
            title: 'Company Name',
            type: 'string',
        },
        {
            name: 'jobTitle',
            title: 'Job Title',
            type: 'string',
        },
        {
            name: 'companyAddress',
            title: 'Company Address',
            type: 'string',
        },
        {
            name: 'startYear',
            title: 'Start Year',
            type: 'string',
            description: 'Enter a year (e.g., "2020")',
        },
        {
            name: 'endYear',
            title: 'End Year',
            type: 'string',
            description: 'Enter a year (e.g., "2024") or "Present"',
        },
    ]
}