export default{
    name: "organization",
    tite: "Organization",
    type: "document",
    fields:[
        {
            name: 'organization-name',
            title: 'Organization',
            type: 'string',
        },
        {
            name: 'organization-address',
            title: 'Organization Address',
            type: 'string',
        },
        {
            name: 'start-year',
            title: 'Start Year',
            type: 'number',
        },
        {
            name: 'end-year',
            title: 'End Year',
            type: 'number',
        },
    ]
}