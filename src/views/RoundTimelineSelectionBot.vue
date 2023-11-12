<template>
  <BotBackgroundImage/>

  <h1>{{t('roundTimelineSelection.title', {round})}}</h1>

  <p v-html="t('roundTimelineSelection.botSelect')"></p>

  <TimelineSelection :timeline="navigationState.timeline" :preselectedAction="action"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" v-if="action">
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

export default defineComponent({
  name: 'RoundTimelineSelectionBot',
  components: {
    FooterButtons,
    TimelineSelection,
    BotBackgroundImage
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
    }
  }
})
</script>
