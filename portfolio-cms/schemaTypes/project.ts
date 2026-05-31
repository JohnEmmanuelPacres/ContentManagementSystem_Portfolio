export default {
    name: 'project',
    title: 'Projects',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Project Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'techStack',
            title: 'Technologies Used',
            type: 'array',
            of: [{type: 'string'}],
        },
        {
            name: 'githubLink',
            title: 'GitHub repository URL',
            type: 'url',
        },
        {
            name: 'mainImage',
            title: 'Project Thumbnail',
            type: 'image',
            options: {hotspot: true},
        }
    ],
}