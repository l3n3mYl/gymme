import { FiFileText } from 'react-icons/fi'

export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: FiFileText,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'category',
      title: 'Categories',
      description: 'Create categories at Sidebar -> Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' }
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    },
    {
      title: 'Open Graph',
      name: 'openGraph',
      description: 'SEO Optimisation',
      type: 'openGraph'
    }
  ],
  orderings: [
    {
      title: 'Publishing date new->old',
      name: 'publishingDateAsc',
      by: [
        { field: 'publishedAt', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Published date old->new',
      name: 'publishingDateDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' },
        { field: 'title', direction: 'desc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      image: 'mainImage'
    },
    prepare({ title = 'No title', publishedAt, image }) {
      return {
        title,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : 'Missing publishing date',
        media: image
      }
    }
  }
}
