import TimelineEntry from "./TimelineEntry"

export default interface TimelineTile {
  id: number
  front: TimelineEntry[]
  back: TimelineEntry[]
}
