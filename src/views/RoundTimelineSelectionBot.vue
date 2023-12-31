<template>
  <SideBar :navigation-state="navigationState"/>
  <BotBackgroundImage/>

  <h1>{{t('timelineSelection.title')}}</h1>

  <p v-html="t('timelineSelection.botSelect')"></p>

  <TimelineSelection :timeline="navigationState.timeline" :preselectedAction="action"/>

  <ul v-if="events" class="mt-3">
    <TimelineExecutionBot v-if="botDonation" :events="events" :donation="botDonation" @eventCompleted="botEventCompleted"/>
    <TimelineExecutionPlayer :events="events"/>
  </ul>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" v-if="action && eventCompleted">
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
import TimelineSelection from '@/components/round/TimelineSelection.vue'
import BotBackgroundImage from '@/components/structure/BotBackgroundImage.vue'
import TimelineExecutionBot from '@/components/round/TimelineExecutionBot.vue'
import TimelineExecutionPlayer from '@/components/round/TimelineExecutionPlayer.vue'
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import Donation from '@/services/enum/Donation'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'RoundTimelineSelectionBot',
  components: {
    FooterButtons,
    TimelineSelection,
    BotBackgroundImage,
    TimelineExecutionBot,
    TimelineExecutionPlayer,
    SideBar,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { round} = navigationState

    // bot selects timeline action
    const action = navigationState.cardDeck.currentCard?.mainAction ?? Action.HUMAN_RESOURCES
    const timelineEntry = navigationState.timeline.checkExecuteAction(action)
    const events = timelineEntry?.events

    return { t, state, navigationState, round, action, events }
  },
  data() {
    return {
      eventCompleted: false,
      botEventDonationFailed: false
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/round/${this.round - 1}/action/player`
    },
    botDonation() : Donation|undefined {
      return this.navigationState.cardDeck.currentCard?.donation
    }
  },
  methods: {
    next() : void {
      this.state.storeTimelineSelection(this.round, this.action, this.botEventDonationFailed)
      this.$router.push(`/round/${this.round}/action/bot`)
    },
    botEventCompleted(donationFailed: boolean) : void {
      this.eventCompleted = true
      this.botEventDonationFailed = donationFailed
    }
  }
})
</script>
