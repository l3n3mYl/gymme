import { FiGrid } from "react-icons/fi"

export default {
  title: "Grid",
  name: "grid",
  type: "object",
  options: {
    hotspot: true
  },
  fields: [
    {
      title: "Grid Media",
      name: "gridMedia",
      type: "array",
      of: [
        { type: "figure" },
        { type: "video" },
        { type: "blockContent" }
      ],
      preview: {
        select: {
          image: "gridMedia"
        },
        prepare({ image }) {
          return {
            media: image[0]
          }
        }
      }
    },
    {
      title: "Column Template",
      name: "colTemplate",
      description:
        "E.g.: '1fr 2fr'. Defines size of columns in the grid. Will have only one column on mobile. Available units: px, em, %, fr, rem (can be mixed). More info: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns",
      type: "string"
    },
    {
      title: "Row Template",
      name: "rowTemplate",
      description: "Same as column, leave empty for auto rows",
      type: "string"
    },
    {
      title: "Column Gap",
      name: "colGap",
      description: 'eg.: "10px". Defines size of gap in the grid. Available units: px, em, %, rem',
      type: "string"
    },
    {
      title: "Row Gap",
      name: "rowGap",
      description: 'eg.: "10px". Defines size of gap in the grid. Available units: px, em, %, rem',
      type: "string"
    },
    {
      title: "Centered",
      name: "centered",
      description: "Centers the items in the grid",
      type: "boolean"
    },
    {
      title: "Margin",
      name: "margin",
      description: 
        "Used to create space around elements. More info: https://www.w3schools.com/css/css_margin.asp",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      description: 
      "Optional: Add description to easily remember what is inside the grid. This is for your convenience",
      type: "string",
    }
  ],
  preview: {
    select: {
      colTemplate: "colTemplate",
      description: "description"
    },
    prepare({ description = "", colTemplate = "Untitled" }) {
      return {
        title: description + " " + colTemplate,
        media: FiGrid
      }
    }
  }
}