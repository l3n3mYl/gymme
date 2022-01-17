import { FaPhotoVideo } from "react-icons/fa";

export default {
  name: "imageTitle",
  title: "Image Title",
  type: "object",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      preview: {
        select: {
          image: "image",
        },
        prepare({ image }) {
          return {
            media: image,
          };
        },
      },
    },
    {
      title: "Alternative text for image (for screen readers)",
      name: "alt",
      type: "string",
      options: {
        isHighlighted: true
      }
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
  ],
  preview: {
    select: {
      description: "descripion",
    },
    prepare({ description = ""}) {
      return {
        title: "Image Card" + description ,
        media: FaPhotoVideo,
      };
    },
  },
};