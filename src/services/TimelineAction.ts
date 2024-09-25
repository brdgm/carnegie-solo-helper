import TimelineEntry from './TimelineEntry'
import Action from './enum/Action'

export default interface TimelineAction {
  action: Action
  entries: TimelineEntry[]
}
