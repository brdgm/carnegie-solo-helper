import Timeline from '@/services/Timeline'
import Action from '@/services/enum/Action'
import Event from '@/services/enum/Event'
import Region from '@/services/enum/Region'
import { expect } from 'chai'

describe('services/Timeline', () => {
  it('new', () => {
    const timeline = Timeline.new()

    expect(timeline.actions.length).to.eq(4)
    const [ action1, action2, action3, action4 ] = timeline.actions

    expect(action1.action).to.eq(Action.HUMAN_RESOURCES)
    expect(action1.entries.length).to.eq(5)
    expect(action1.entries[4].events).to.eql([Event.TAKE_INCOME,Event.DONATION])
    expect(action1.entries[4].region).to.eq(Region.EAST)

    expect(action2.action).to.eq(Action.MANAGEMENT)
    expect(action2.entries.length).to.eq(5)
    expect(action2.entries[4].events).to.eql([Event.TAKE_INCOME,Event.DONATION])
    expect(action2.entries[4].region).to.eq(Region.MIDWEST)

    expect(action3.action).to.eq(Action.CONSTRUCTION)
    expect(action3.entries.length).to.eq(5)
    expect(action3.entries[4].events).to.eql([Event.TAKE_INCOME,Event.DONATION])
    expect(action3.entries[4].region).to.eq(Region.SOUTH)

    expect(action4.action).to.eq(Action.RESEARCH_DEVELOPMENT)
    expect(action4.entries.length).to.eq(5)
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
})
