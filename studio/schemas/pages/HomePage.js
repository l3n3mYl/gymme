import { MdMenu } from 'react-icons/md'

export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: MdMenu,
  options: {
    hotspot: true
  },
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Subtitle",
      name: "subtitle",
      type: "string"
    },
    {
      title: "Image",
      name: "image",
      type: "mainImage"
    }
  ],
  preview: {
    select: {
      title: "title"
    },
    prepare({ title = "Home Page" }) {
      return {
        title: title
      }
    }
  }
}