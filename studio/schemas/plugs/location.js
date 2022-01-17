import { MdMyLocation } from 'react-icons/md'

export default {
  title: "Location",
  name: "location",
  type: "object",
  icon: MdMyLocation,
  fields: [
    {
      title: "Latitude",
      name: "lat",
      description: "Tip: A quick way to find these -> https://www.latlong.net/",
      type: "number"
    },
    {
      title: "Longitude",
      name: "lng",
      type: "number"
    }
  ],
  prepare({ title = lat ? lat + " " + lng : "Untitled location"}) {
    return {
      title,
      media: MdMyLocation
    }
  }
}