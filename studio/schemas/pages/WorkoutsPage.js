export default {
  name: 'workouts',
  title: 'Workouts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'offerings',
      title: 'Offerings',
      type: 'array',
      of: [{ type: 'imageTitle' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Workouts Page'
      }
    }
  }
}
