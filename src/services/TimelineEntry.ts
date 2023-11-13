import Event from "./enum/Event"
import Region from "./enum/Region"

export default interface TimelineEntry {
  id: string
  events: Event[]
  region?: Region
  executed?: boolean
}
