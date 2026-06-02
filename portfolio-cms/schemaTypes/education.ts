export default{
    name: 'education',
    title: 'Education',
    type: 'document',
    fields: [
        {
            name: 'universityName',
            title: 'University',
            type: 'string',
        },
        {
            name: 'courseName',
            title: 'Course Name',
            type: 'string',
        },
        {
            name: 'address',
            title: 'Address',
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
    ],
}