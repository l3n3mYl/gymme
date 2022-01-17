import { IoMdPricetag } from 'react-icons/io'

export default {
  title: "Pricing Template",
  name: "pricingTemp",
  type: "object",
  icon: IoMdPricetag,
  fields: [
    {
      title: "Plan",
      name: "plan",
      type: "string"
    },
    {
      title: "Price",
      name: "price",
      type: "number"
    },
    {
      title: "Frequency",
      name: "freq",
      description: "How often should the price be payed (monthly, weekly...)",
      type: "string"
    },
    {
      title: "Extras",
      name: "extras",
      description: "What the user will get with this plan",
      type: "array",
      of: [{ type: "string" }]
    }
  ],
  prepare({ title = "Pricing Temp" }) {
    return {
      title,
      media: IoMdPricetag
    }
  }
}