import * as _ from 'lodash'
import { TimelinePersistence } from '@/store/state'
import TimelineAction from './TimelineAction'
import rollDice from 'brdgm-commons/src/util/random/rollDice'
import TimelineTiles from './TimelineTiles'
import Action from './enum/Action'
import TimelineEntry from './TimelineEntry'
import Region from './enum/Region'
import Event from './enum/Event'

export default class Timeline {

  private _actions : TimelineAction[]

  public constructor(actions : TimelineAction[]) {
    this._actions = actions
  }

  public get actions() : readonly TimelineAction[] {
    return this._actions
  }

  /**
   * Gets persistence view of timeline.
   */
  public toPersistence() : TimelinePersistence {
    return {
      actions: this._actions.map(action => {
        return {
          action: action.action,
          entries: action.entries.map(entry => {
            return {
              events: entry.events,
              region: entry.region
            }
          })
        }
      })
    }
  }

  /**
   * Create new timeline grid based on random timeline tile fronts/backs and the fixed final entry for each row.
   */
  public static new() : Timeline {
    const timelineTiles = _.shuffle(TimelineTiles.getAll())
    const finalRegions = Object.values(Region)
    const actions : TimelineAction[] = []
    Object.values(Action).forEach(action => {
      const timelineTile = timelineTiles.shift()
      const entries : TimelineEntry[] = []
      if (timelineTile) {
        const front = (rollDice(2) == 1)
        if (front) {
          entries.push(...timelineTile.front)
        }
        else {
          entries.push(...timelineTile.back)
        }
      }
      entries.push({events:[Event.TAKE_INCOME,Event.DONATION], region:finalRegions.shift()})
      actions.push({action,entries})
    })
    return new Timeline(actions)
  }

  /**
   * Re-creates timeline form persistence.
   */
  public static fromPersistence(persistence : TimelinePersistence) : Timeline {
    return new Timeline(persistence.actions.map(action => {
      return {
        action: action.action,
        entries: action.entries.map(entry => {
          const result : TimelineEntry = { events: entry.events }
          if (entry.region) {
            result.region = entry.region
          }
          return result
        })
      }
    }))
  }

}
