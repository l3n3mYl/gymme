export default {
  title: 'Open Graph',
  name: 'openGraph',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: '!Important!, this will overide page title.',
      validation: (Rule) => Rule.max(60).warning('Not more than 60 characters')
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      validation: (Rule) =>
        Rule.max(155).warning('Not more than 155 characters')
    },
    {
      title: 'Image',
      name: 'image',
      type: 'mainImage',
      description: 'Recommended size: 1200x630'
    },
    {
      title: 'Keywords',
      name: 'keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      route: 'route.slug.current',
      link: 'link'
    },
    prepare({ title, route, link }) {
      return {
        title,
        subtitle: route
          ? `Route: /${route}/`
          : link
          ? `External link: ${link}`
          : 'Not set'
      }
    }
  }
}
