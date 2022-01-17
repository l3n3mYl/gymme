export default {
  name: "pricingPage",
  title: "Pricing Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "pricings",
      title: "Plans",
      type: "array",
      of: [{type: "pricingTemp"}],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Pricing",
      };
    },
  },
};