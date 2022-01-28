export default {
  name: 'community',
  title: 'Community',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'imageCard' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'About Us'
      }
    }
  }
}
