import CardDeck from '@/services/CardDeck'
import Timeline from '@/services/Timeline'
import Action from '@/services/enum/Action'
import Player from '@/services/enum/Player'
import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'

export default class NavigationState {

  readonly round : number
  readonly startPlayer : Player
  readonly player : Player

  readonly cardDeck : CardDeck
  readonly timeline : Timeline
  readonly departments : readonly string[]
  readonly playerDepartments : readonly string[]
  readonly playerNewDepartments : readonly string[]
  readonly botDepartments : readonly string[]
  readonly botNewDepartments : readonly string[]
  readonly selectedAction? : Action
  readonly botEventDonationFailed : boolean
  readonly botCardShift : number

  constructor(route : RouteLocation, state : State) {    
    this.round = parseInt(route.params['round'] as string)
    this.startPlayer = this.round % 2 == 0 ? Player.BOT : Player.PLAYER
    this.player = isBotRoute(route) ? Player.BOT : Player.PLAYER

    let cardDeck : CardDeck|undefined;
    let timeline : Timeline|undefined;
    let departments : readonly string[] = []
    let playerDepartments : readonly string[] = []
    let botDepartments : readonly string[] = []
    let selectedAction : Action|undefined
    let botEventDonationFailed = false
    let playerNewDepartments : readonly string[] = []
    let botNewDepartments : readonly string[] = []
    let botCardShift : number = 0

    const roundData = state.rounds.find(item => item.round == this.round)
    if (roundData) {
      cardDeck = CardDeck.fromPersistence(roundData.cardDeck)
      timeline = Timeline.fromPersistence(roundData.timeline)
      departments = roundData.departments
      playerDepartments = roundData.playerDepartments
      botDepartments = roundData.botDepartments

      if (!isTimelineSelection(route)) {
        selectedAction = roundData.selectedAction
        botEventDonationFailed = roundData.botEventDonationFailed ?? false
        if (this.startPlayer == Player.PLAYER && this.player == Player.BOT) {
          playerNewDepartments = roundData.playerNewDepartments ?? []
        }
        if (this.startPlayer == Player.BOT && this.player == Player.PLAYER) {
          botNewDepartments = roundData.botNewDepartments ?? []
          botCardShift = roundData.botCardShift ?? 0
        }
      }
    }

    this.cardDeck = cardDeck ?? CardDeck.new(state.setup.difficultyLevel)
    this.timeline = timeline ?? Timeline.new()
    this.departments = departments
    this.playerDepartments = playerDepartments
    this.playerNewDepartments = playerNewDepartments
    this.botDepartments = botDepartments
    this.botNewDepartments = botNewDepartments
    this.selectedAction = selectedAction
    this.botEventDonationFailed = botEventDonationFailed
    this.botCardShift = botCardShift

    if (this.selectedAction) {
      this.timeline.execute(this.selectedAction)
    }
  }

}

function isTimelineSelection(route : RouteLocation) : boolean {
  return route.name == 'RoundTimelineSelectionPlayer' || route.name == 'RoundTimelineSelectionBot'
}

function isBotRoute(route : RouteLocation) : boolean {
  return route.name == 'RoundTimelineSelectionBot' || route.name == 'RoundActionBot'
}
