export default {
  name: 'faqPage',
  title: 'FAQ Page',
  type: 'document',
  fields: [
    {
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{ type: 'faqTemp' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'FAQ'
      }
    }
  }
}
