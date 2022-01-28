import { FaPhotoVideo } from 'react-icons/fa'

export default {
  name: 'itemGallery',
  title: 'Gallery',
  type: 'object',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'items',
      title: 'Gallery items',
      type: 'array',
      of: [{ type: 'figure' }, { type: 'video' }, { type: 'blockContent' }],
      preview: {
        select: {
          image: 'items'
        },
        prepare({ image }) {
          return {
            media: image[0]
          }
        }
      }
    },
    {
      title: 'Alternative text (for screen readers)',
      name: 'alt',
      type: 'string',
      options: {
        isHighlighted: true
      }
    },
    {
      title: 'Descripion',
      name: 'descripion',
      type: 'string',
      description:
        'Optional: Add description to easily remember what is inside the gallery. This is for your convenience'
    }
  ],
  preview: {
    select: {
      description: 'descripion'
    },
    prepare({ description = '' }) {
      return {
        title: 'Gallery ' + description,
        media: FaPhotoVideo
      }
    }
  }
}
