import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import DepartmentSelectionType from '@/services/enum/DepartmentSelectionType'
import Action from '@/services/enum/Action'
import Region from '@/services/enum/Region'
import Event from '@/services/enum/Event'
import Donation from '@/services/enum/Donation'
import City from '@/services/enum/City'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.BEGINNER,
        departmentSelectionType: DepartmentSelectionType.BASE
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.setup.blockedDonations = undefined
      this.setup.blockedCities = undefined
      this.setup.initialDepartments = undefined
      this.rounds = []
    },
    storeRound(round : Round) {
      this.rounds = this.rounds.filter(item => item.round != round.round)
      this.rounds.push(round)
    },
    storeTimelineSelection(round : number, action: Action, botEventDonationFailed : boolean) {
      const roundData = this.rounds.find(item => item.round == round)
      if (roundData) {
        roundData.selectedAction = action
        roundData.botEventDonationFailed = botEventDonationFailed
      }
    },
    storePlayerRoundDetails(round : number, playerNewDepartments: readonly string[]) {
      const roundData = this.rounds.find(item => item.round == round)
      if (roundData) {
        roundData.playerNewDepartments = playerNewDepartments
      }
    },
    storeBotRoundDetails(round : number, botNewDepartments: readonly string[], botCardShift: number) {
      const roundData = this.rounds.find(item => item.round == round)
      if (roundData) {
        roundData.botNewDepartments = botNewDepartments
        roundData.botCardShift = botCardShift
      }
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  rounds: Round[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  departmentSelectionType: DepartmentSelectionType
  blockedDonations?: readonly Donation[]
  blockedCities?: readonly CityCount[]
  initialDepartments?: readonly string[]
}
export interface CityCount {
  city: City
  count: number
}

export interface Round {
  round: number
  cardDeck: CardDeckPersistence
  timeline: TimelinePersistence
  departments: readonly string[]
  playerDepartments: readonly string[]
  botDepartments: readonly string[]
  selectedAction?: Action
  botEventDonationFailed?: boolean
  playerNewDepartments?: readonly string[]
  botNewDepartments?: readonly string[]
  botCardShift?: number
}
export interface CardDeckPersistence {
  pile: string[]
  discardPile: string[][]
}
export interface TimelinePersistence {
  actions: TimelinePersistenceAction[]
}
export interface TimelinePersistenceAction {
  action: Action
  entries: TimelinePersistenceEntry[]
}
export interface TimelinePersistenceEntry {
  id: string
  events: Event[]
  region?: Region
  executed?: boolean
}
