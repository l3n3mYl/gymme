export default {
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent'
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
