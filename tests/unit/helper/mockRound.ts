import CardDeck from '@/services/CardDeck'
import Timeline from '@/services/Timeline'
import Action from '@/services/enum/Action'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { CardDeckPersistence, Round, TimelinePersistence } from '@/store/state'

export default function (params?: MockRoundParams) : Round {  
  return {
    round: params?.round ?? 1,
    cardDeck: params?.cardDeck ?? CardDeck.new(DifficultyLevel.BEGINNER).toPersistence(),
    timeline: params?.timeline ?? Timeline.new().toPersistence(),
    departments: params?.departments ?? [],
    playerReserveDepartments: params?.playerReserveDepartments ?? [],
    playerDepartments: params?.playerDepartments ?? [],
    botDepartments: params?.botDepartments ?? [],
    selectedAction: params?.selectedAction,
    botEventDonationFailed: params?.botEventDonationFailed,
    playerNewDepartments: params?.playerNewDepartments,
    botNewDepartments: params?.botNewDepartments,
    botCardShift: params?.botCardShift
  }
}

export interface MockRoundParams {
  round?: number
  cardDeck?: CardDeckPersistence
  timeline?: TimelinePersistence
  departments?: readonly string[]
  playerReserveDepartments?: readonly string[]
  playerDepartments?: readonly string[]
  botDepartments?: readonly string[]
  selectedAction?: Action
  botEventDonationFailed?: boolean
  playerNewDepartments?: readonly string[]
  botNewDepartments?: readonly string[]
  botCardShift?: number
}
