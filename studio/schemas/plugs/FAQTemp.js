import { BsQuestionLg } from 'react-icons/bs'

export default {
  name: 'faqTemp',
  title: 'FAQ Template',
  type: 'document',
  icon: BsQuestionLg,
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string'
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'blockContent'
    }
  ],
  prepare({ title = 'FAQ Temp' }) {
    return {
      title,
      media: BsQuestionLg
    }
  }
}
