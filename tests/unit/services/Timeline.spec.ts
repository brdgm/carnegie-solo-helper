import Timeline from '@/services/Timeline'
import Action from '@/services/enum/Action'
import Event from '@/services/enum/Event'
import Region from '@/services/enum/Region'
import { expect } from 'chai'

describe('services/Timeline', () => {
  it('new', () => {
    const timeline = Timeline.new()

    expect(timeline.canExecute()).to.true
    expect(timeline.execute(Action.HUMAN_RESOURCES).executed).to.true

    expect(timeline.actions.length).to.eq(4)
    const [ action1, action2, action3, action4 ] = timeline.actions

    expect(action1.action).to.eq(Action.HUMAN_RESOURCES)
    expect(action1.entries.length).to.eq(5)
    expect(action1.entries[0].executed).to.true
    expect(action1.entries[4].events).to.eql([Event.TAKE_INCOME,Event.DONATION])
    expect(action1.entries[4].region).to.eq(Region.EAST)

    expect(action2.action).to.eq(Action.MANAGEMENT)
    expect(action2.entries.length).to.eq(5)
    expect(action2.entries[0].executed).to.undefined
    expect(action2.entries[4].events).to.eql([Event.TAKE_INCOME,Event.DONATION])
    expect(action2.entries[4].region).to.eq(Region.MIDWEST)

    expect(action3.action).to.eq(Action.CONSTRUCTION)
    expect(action3.entries.length).to.eq(5)
    expect(action3.entries[2].executed).to.undefined
    expect(action3.entries[4].events).to.eql([Event.TAKE_INCOME,Event.DONATION])
    expect(action3.entries[4].region).to.eq(Region.SOUTH)

    expect(action4.action).to.eq(Action.RESEARCH_DEVELOPMENT)
    expect(action4.entries.length).to.eq(5)
    expect(action4.entries[2].executed).to.undefined
    expect(action4.entries[4].events).to.eql([Event.TAKE_INCOME,Event.DONATION])
    expect(action4.entries[4].region).to.eq(Region.WEST)

    const persistence = timeline.toPersistence()
    expect(persistence.actions.length).to.eq(4)
    persistence.actions.forEach(actionPersistence => {
      expect(actionPersistence.action).to.not.undefined
      expect(actionPersistence.entries.length).to.eq(5)
    })

    const fromPersistence = Timeline.fromPersistence(persistence)
    expect(fromPersistence).to.eql(timeline)
  })

  it('executions', () => {
    const timeline = Timeline.fromPersistence({actions: [
      {action:Action.HUMAN_RESOURCES,entries:[{id:'h1',events:[Event.TAKE_INCOME],region:Region.EAST}]},
      {action:Action.MANAGEMENT,entries:[{id:'m1',events:[Event.TAKE_INCOME],region:Region.WEST},{id:'m2',events:[Event.DONATION]}]},
      {action:Action.CONSTRUCTION,entries:[{id:'c1',events:[Event.TAKE_INCOME],region:Region.MIDWEST}]},
      {action:Action.RESEARCH_DEVELOPMENT,entries:[{id:'r1',events:[Event.TAKE_INCOME],region:Region.SOUTH}]}
    ]})

    // test multiple executions with switch to next preferred action and wrap-over
    expect(timeline.canExecute()).to.true
    const entry1 = timeline.execute(Action.MANAGEMENT)
    expect(entry1.region).to.eq(Region.WEST)
    const entry2 = timeline.execute(Action.MANAGEMENT)
    expect(entry2.events).to.eql([Event.DONATION])
    const entry3 = timeline.execute(Action.MANAGEMENT)
    expect(entry3.region).to.eq(Region.MIDWEST)
    const entry4 = timeline.execute(Action.MANAGEMENT)
    expect(entry4.region).to.eq(Region.SOUTH)
    const entry5 = timeline.execute(Action.MANAGEMENT)
    expect(entry5.region).to.eq(Region.EAST)
    expect(timeline.canExecute()).to.false
  })

  it('checkExecuteTimelineEntry', () => {
    const entryH1 = {id:'h1',events:[Event.TAKE_INCOME],region:Region.EAST}
    const entryM1 = {id:'m1',events:[Event.TAKE_INCOME],region:Region.WEST,executed:true}
    const entryM2 = {id:'m2',events:[Event.DONATION]}
    const entryC1 = {id:'c1',events:[Event.TAKE_INCOME],region:Region.MIDWEST,executed:true}
    const entryR1 = {id:'r1',events:[Event.TAKE_INCOME],region:Region.SOUTH}

    const timeline = Timeline.fromPersistence({actions: [
      {action:Action.HUMAN_RESOURCES,entries:[entryH1]},
      {action:Action.MANAGEMENT,entries:[entryM1,entryM2]},
      {action:Action.CONSTRUCTION,entries:[entryC1]},
      {action:Action.RESEARCH_DEVELOPMENT,entries:[entryR1]}
    ]})

    // test multiple executions with switch to next preferred action and wrap-over
    expect(timeline.checkExecuteTimelineEntry(entryH1)).to.eq(Action.HUMAN_RESOURCES)
    expect(timeline.checkExecuteTimelineEntry(entryM1)).to.undefined
    expect(timeline.checkExecuteTimelineEntry(entryM2)).to.eq(Action.MANAGEMENT)
    expect(timeline.checkExecuteTimelineEntry(entryC1)).to.undefined
    expect(timeline.checkExecuteTimelineEntry(entryR1)).to.eq(Action.RESEARCH_DEVELOPMENT)
  })
})
