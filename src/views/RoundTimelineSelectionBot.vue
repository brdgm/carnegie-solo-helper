<template>
  <BotBackgroundImage/>

  <h1>{{t('timelineSelection.title', {round})}}</h1>

  <p v-html="t('timelineSelection.botSelect')"></p>

  <TimelineSelection :timeline="navigationState.timeline" :preselectedAction="action"/>

  <ul v-if="events" class="mt-3">
    <TimelineExecutionBot :events="events" :donation="navigationState.cardDeck.currentCard.donation" @eventCompleted="botEventCompleted"/>
    <TimelineExecutionPlayer :events="events"/>
  </ul>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" v-if="action && eventCompleted">
    {{t('action.next')}}
  </button>

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

export default defineComponent({
  name: 'RoundTimelineSelectionBot',
  components: {
    FooterButtons,
    TimelineSelection,
    BotBackgroundImage,
    TimelineExecutionBot,
    TimelineExecutionPlayer
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const round = navigationState.round

    // bot selects timeline action
    const action = navigationState.cardDeck.currentCard.mainAction
    const timelineEntry = navigationState.timeline.checkExecute(action)
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
      return `/round/${this.round - 1}/timelineSelection/player`
    }
  },
  methods: {
    next() : void {
      // prepare next round
      const { timeline, cardDeck, departments } = this.navigationState
      timeline.execute(this.action)
      cardDeck.discardCurrentCard(0)
      this.state.storeRound({
        round: this.round + 1,
        cardDeck: cardDeck.toPersistence(),
        timeline: timeline.toPersistence(),
        departments: departments
      })
      this.$router.push(`/round/${this.round + 1}/timelineSelection/player`)
    },
    botEventCompleted(donationFailed: boolean) : void {
      this.eventCompleted = true
      this.botEventDonationFailed = donationFailed
    }
  }
})
</script>
