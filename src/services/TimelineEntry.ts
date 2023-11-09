import Event from "./enum/Event"
import Region from "./enum/Region"

export default interface TimelineEntry {
  events: Event[]
  region?: Region
}
