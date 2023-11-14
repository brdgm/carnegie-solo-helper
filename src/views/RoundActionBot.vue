<template>
  <SideBar :navigation-state="navigationState"/>
  <BotBackgroundImage/>

  <h1>{{t('actionBot.title')}}</h1>

  <div v-if="selectedAction" class="mt-3">
    <AppIcon type="action-hex" :name="selectedAction" class="actionIcon float-start me-3 mb-3"/>
    <component :is="`${selectedAction}BotAction`" :botActions="botActions"
        @actionCompleted="actionCompleted"/>
    <p v-if="getBotVP() > 0" v-html="t('actionBot.cardShiftVP',{count:getBotVP()})"></p>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" v-if="botActionCompleted">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>
  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import Player from '@/services/enum/Player'
import BotBackgroundImage from '@/components/structure/BotBackgroundImage.vue'
import removeDepartments from '@/util/removeDepartments'
import addDepartments from '@/util/addDepartments'
import HumanResourcesBotAction from '@/components/round/botAction/HumanResourcesBotAction.vue'
import ConstructionBotAction from '@/components/round/botAction/ConstructionBotAction.vue'
import ManagementBotAction from '@/components/round/botAction/ManagementBotAction.vue'
import ResearchDevelopmentBotAction from '@/components/round/botAction/ResearchDevelopmentBotAction.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import BotActions from '@/services/BotActions'
import getCardShiftVP from '@/util/getCardShiftVP'
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'

export default defineComponent({
  name: 'RoundActionBot',
  components: {
    FooterButtons,
    BotBackgroundImage,
    HumanResourcesBotAction,
    ConstructionBotAction,
    ManagementBotAction,
    ResearchDevelopmentBotAction,
    AppIcon,
    SideBar,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { round, startPlayer, selectedAction, playerNewDepartments } = navigationState

    const botActions = new BotActions(navigationState.cardDeck.currentCard,
        navigationState.botEventDonationFailed, navigationState.departments)
    if (selectedAction) {
      botActions.applyAction(selectedAction)
    }
    const botNewDepartments = botActions.botNewDepartments

    return { t, state, navigationState, round, startPlayer, selectedAction, playerNewDepartments, botNewDepartments, botActions }
  },
  data() {
    return {
      botActionCompleted: false
    }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.startPlayer == Player.PLAYER) {
        return `/round/${this.round}/action/player`
      }
      else {
        return `/round/${this.round}/timelineSelection/${this.startPlayer}`
      }
    }
  },
  methods: {
    next() : void {
      // update current round
      this.state.storeBotRoundDetails(this.round, this.botNewDepartments, this.botActions.cardShift)
      if (this.startPlayer == Player.PLAYER) {
        // prepare next round
        if (this.selectedAction) {
          const { timeline, cardDeck, departments, playerReserveDepartments, playerDepartments, botDepartments } = this.navigationState
          cardDeck.discardCurrentCard(this.botActions.cardShift)
          this.state.storeRound({
            round: this.round + 1,
            cardDeck: cardDeck.toPersistence(),
            timeline: timeline.toPersistence(),
            departments: removeDepartments(departments, this.playerNewDepartments, this.botNewDepartments),
            playerReserveDepartments: removeDepartments(playerReserveDepartments, this.playerNewDepartments),
            playerDepartments: addDepartments(playerDepartments, this.playerNewDepartments),
            botDepartments: addDepartments(botDepartments, this.botNewDepartments)
          })
          this.$router.push(`/round/${this.round + 1}/timelineSelection/bot`)
        }
      }
      else {
        this.$router.push(`/round/${this.round}/action/player`)
      }
    },
    actionCompleted(actionStepsFailed: number) {
      this.botActions.setActionStepsFailed(actionStepsFailed)
      this.botActionCompleted = true
      this.$forceUpdate()
    },
    getBotVP() : number {
      return getCardShiftVP(this.botActions.cardShift)
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 80px;
}
</style>
