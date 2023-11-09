import * as _ from 'lodash'
import { TimelinePersistence, TimelinePersistenceEntry } from '@/store/state'
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
   * Checks if an additional action can be executed
   * @returns true if any available entry is found
   */
  public canExecute() : boolean {
    return this._actions.filter(action => action.entries.filter(entry => !entry.executed).length > 0).length > 0
  }

  /**
   * Executed the given action and returns the timeline entry with event and region information
   * @param action timeline entry
   */
  public execute(action : Action) : TimelineEntry {
    // collect preferred actions rows to check for next available action
    const actionIndex = Object.values(Action).indexOf(action)
    const preferredActions : TimelineAction[] = []
    for (let i=actionIndex; i<this._actions.length; i++) {
      preferredActions.push(this._actions[i])
    }
    for (let i=0; i<actionIndex; i++) {
      preferredActions.push(this._actions[i])
    }
    // get next available action
    const result = preferredActions
        .map(actionItem => actionItem.entries.find(entry => !entry.executed))
        .find(entry => entry != undefined)
    if (result) {
      result.executed = true
      return result
    }
    else {
      throw new Error('No available timeline entry for action found.')
    }
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
            const result : TimelinePersistenceEntry = { events: entry.events }
            if (entry.region) {
              result.region = entry.region
            }
            if (entry.executed) {
              result.executed = entry.executed
            }
            return result
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
          if (entry.executed) {
            result.executed = true
          }
          return result
        })
      }
    }))
  }

}
