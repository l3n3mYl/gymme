import { MdSettings } from 'react-icons/md'

export default {
  name: "siteSettings",
  title: "siteSettings",
  type: "document",
  icon: MdSettings,
  fields: [
    {
      title: "Open Graph",
      name: "openGraph",
      description: "Default meta tags",
      type: "openGraph"
    }
  ],
  preview: {
    prepare({ title = "Site Settings"}) {
      return {
        title
      }
    }
  }
}