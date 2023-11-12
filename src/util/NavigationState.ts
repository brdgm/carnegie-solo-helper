import CardDeck from "@/services/CardDeck"
import Timeline from "@/services/Timeline"
import Player from "@/services/enum/Player"
import { State } from "@/store/state"
import { RouteLocation } from "vue-router"

export default class NavigationState {

  readonly round : number
  readonly startPlayer : Player

  readonly cardDeck : CardDeck
  readonly timeline : Timeline
  readonly departments : readonly string[]

  constructor(route : RouteLocation, state : State) {    
    this.round = parseInt(route.params['round'] as string)
    this.startPlayer = this.round % 2 == 0 ? Player.BOT : Player.PLAYER

    const roundData = state.rounds.find(item => item.round == this.round)
    if (roundData) {
      this.cardDeck = CardDeck.fromPersistence(roundData.cardDeck)
      this.timeline = Timeline.fromPersistence(roundData.timeline)
      this.departments = roundData.departments
    }
    else {
      this.cardDeck = CardDeck.new(state.setup.difficultyLevel)
      this.timeline = Timeline.new()
      this.departments = []
    }
  }

}