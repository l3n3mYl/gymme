export default {
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  fields: [
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "photos",
      title: "Photos",
      type: "array",
      of: [{ type: "imageCard" }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: "Gallery Page",
      };
    },
  },
};