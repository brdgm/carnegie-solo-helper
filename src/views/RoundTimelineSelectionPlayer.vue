<template>
  <SideBar :navigation-state="navigationState"/>

  <h1>{{t('timelineSelection.title')}}</h1>

  <p v-html="t('timelineSelection.playerSelect')"></p>

  <TimelineSelection :timeline="navigationState.timeline" @selected="selectTimeline"/>

  <ul v-if="events" class="mt-3">
    <TimelineExecutionPlayer :events="events"/>
    <TimelineExecutionBot v-if="botDonation" :events="events" :donation="botDonation" @eventCompleted="botEventCompleted"/>
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
import Action from '@/services/enum/Action'
import Event from '@/services/enum/Event'
import TimelineExecutionBot from '@/components/round/TimelineExecutionBot.vue'
import TimelineExecutionPlayer from '@/components/round/TimelineExecutionPlayer.vue'
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import Donation from '@/services/enum/Donation'

export default defineComponent({
  name: 'RoundTimelineSelectionPlayer',
  components: {
    FooterButtons,
    TimelineSelection,
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
    const { round } = navigationState
    return { t, state, navigationState, round }
  },
  data() {
    return {
      action: undefined as Action|undefined,
      events: undefined as Event[]|undefined,
      eventCompleted: false,
      botEventDonationFailed: false
    }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      if (this.round > 1) {
        return `/round/${this.round - 1}/action/player`
      }
      return undefined
    },
    botDonation() : Donation|undefined {
      return this.navigationState.cardDeck.currentCard?.donation
    }
  },
  methods: {
    next() : void {
      if (this.action) {
        this.state.storeTimelineSelection(this.round, this.action, this.botEventDonationFailed)
      }
      this.$router.push(`/round/${this.round}/action/player`)
    },
    selectTimeline(action?: Action, events?: Event[]) : void {
      this.action = action
      this.events = events
      if (this.action == undefined) {
        this.eventCompleted = false
        this.botEventDonationFailed = false
      }
    },
    botEventCompleted(donationFailed: boolean) : void {
      this.eventCompleted = true
      this.botEventDonationFailed = donationFailed
    }
  }
})
</script>
