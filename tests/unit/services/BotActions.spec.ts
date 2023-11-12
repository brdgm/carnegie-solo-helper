import BotActions from '@/services/BotActions'
import Cards from '@/services/Cards'
import Action from '@/services/enum/Action'
import City from '@/services/enum/City'
import Region from '@/services/enum/Region'
import { expect } from 'chai'

describe('services/BotActions', () => {
  it('N01-human-resources', () => {
    const botActions = new BotActions(Cards.get('N01'), false, [], [])
    botActions.applyAction(Action.HUMAN_RESOURCES)

    expect(botActions.cardShift).to.eq(4)
  })

  it('N01-human-resources-donationfailed', () => {
    const botActions = new BotActions(Cards.get('N01'), true, [], [])
    botActions.applyAction(Action.HUMAN_RESOURCES)

    expect(botActions.cardShift).to.eq(4)
  })

  it('N02-management', () => {
    const botActions = new BotActions(Cards.get('N02'), false,
      ['01-training-partnerships','02-recruiting','06-sales','06-sales','07-logistics'], ['06-sales'])
    botActions.applyAction(Action.MANAGEMENT)

    expect(botActions.cardShift).to.eq(0)
    expect(botActions.botNewDepartments).to.eql(['07-logistics'])
  })

  it('N04-management-failed1', () => {
    const botActions = new BotActions(Cards.get('N04'), false,
      ['01-training-partnerships','02-recruiting','07-logistics','14-advanced-design'], ['06-sales'])
    botActions.applyAction(Action.MANAGEMENT)

    expect(botActions.cardShift).to.eq(1)
    expect(botActions.botNewDepartments).to.eql(['14-advanced-design'])
  })

  it('N01-construction', () => {
    const botActions = new BotActions(Cards.get('N01'), false, [], [])
    botActions.applyAction(Action.CONSTRUCTION)

    expect(botActions.cardShift).to.eq(0)
    expect(botActions.cities).to.eql([City.SALT_LAKE_CITY,City.RENO])
  })

  it('N01-construction-failed2', () => {
    const botActions = new BotActions(Cards.get('N01'), false, [], [])
    botActions.applyAction(Action.CONSTRUCTION)
    botActions.setCitiesFailed(2)

    expect(botActions.cardShift).to.eq(2)
    expect(botActions.cities).to.eql([City.SALT_LAKE_CITY,City.RENO])
  })

  it('N01-research-development', () => {
    const botActions = new BotActions(Cards.get('N01'), false, [], [])
    botActions.applyAction(Action.RESEARCH_DEVELOPMENT)

    expect(botActions.cardShift).to.eq(0)
    expect(botActions.transportRegion).to.eq(Region.WEST)
    expect(botActions.transportSteps).to.eq(2)
  })

  it('N01-research-development-failed2', () => {
    const botActions = new BotActions(Cards.get('N01'), false, [], [])
    botActions.applyAction(Action.RESEARCH_DEVELOPMENT)
    botActions.setTransportStepsFailed(2)

    expect(botActions.cardShift).to.eq(2)
    expect(botActions.transportRegion).to.eq(Region.WEST)
    expect(botActions.transportSteps).to.eq(2)
  })

  it('N01-research-development-failed2-donationfailed', () => {
    const botActions = new BotActions(Cards.get('N01'), true, [], [])
    botActions.applyAction(Action.RESEARCH_DEVELOPMENT)
    botActions.setTransportStepsFailed(2)

    expect(botActions.cardShift).to.eq(3)
    expect(botActions.transportRegion).to.eq(Region.WEST)
    expect(botActions.transportSteps).to.eq(2)
  })
})
