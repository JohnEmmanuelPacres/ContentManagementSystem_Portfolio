export default{
    name: "organization",
    tite: "Organization",
    type: "document",
    fields:[
        {
            name: 'organizationName',
            title: 'Organization',
            type: 'string',
        },
        {
            name: 'organizationAddress',
            title: 'Organization Address',
            type: 'string',
        },
        {
            name: 'startYear',
            title: 'Start Year',
            type: 'date',
        },
        {
            name: 'endYear',
            title: 'End Year',
            type: 'date',
        },
    ]
}