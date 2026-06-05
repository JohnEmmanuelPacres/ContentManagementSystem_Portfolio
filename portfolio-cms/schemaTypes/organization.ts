export default{
    name: "organization",
    title: "Organization",
    type: "document",
    fields:[
        {
            name: 'organizationName',
            title: 'Organization',
            type: 'string',
        },
        {
            name: 'organizationRole',
            title: 'Organization Role',
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