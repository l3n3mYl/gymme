export default {
  title: 'Figure',
  name: 'figure',
  type: 'image',
  options: {
    hotspot: true
  },
  fields: [
    {
      title: 'Alternative text (for screen readers)',
      name: 'alt',
      type: 'string',
      options: {
        isHighlighted: true
      }
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
      options: {
        isHighlighted: true
      }
    },
    {
      title: 'Can be zoomed?',
      name: 'isZoomable',
      type: 'boolean',
      options: {
        isHighlighted: true
      }
    },
    {
      title: 'Max width',
      name: 'maxWidth',
      description: 'Max image width in css measurements',
      type: 'string',
      options: {
        isHighlighted: true
      }
    },
    {
      title: 'Border',
      name: 'border',
      type: 'boolean',
      description: 'Adds border around the image',
      options: {
        isHighlighted: true
      }
    }
  ],
  initialValue: {
    isZoomable: false
  }
}
