<template>
  <h1>{{t('roundTimelineSelection.title', {round})}}</h1>

  <p v-html="t('roundTimelineSelection.playerSelect')"></p>

  <TimelineSelection :timeline="navigationState.timeline" @selected="selectTimeline"/>

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
import Action from '@/services/enum/Action'
import Event from '@/services/enum/Event'

export default defineComponent({
  name: 'RoundTimelineSelectionPlayer',
  components: {
    FooterButtons,
    TimelineSelection
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const round = navigationState.round
    return { t, state, navigationState, round }
  },
  data() {
    return {
      action: undefined as Action|undefined,
      events: undefined as Event[]|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      if (this.round > 1) {
        return `/round/${this.round - 1}/timelineSelection/bot`
      }
      return undefined
    }
  },
  methods: {
    next() : void {
      // prepare next round
      if (this.action) {
        const { timeline, cardDeck, departments } = this.navigationState
        timeline.execute(this.action)
        cardDeck.discardCurrentCard(0)
        this.state.storeRound({
          round: this.round + 1,
          cardDeck: cardDeck.toPersistence(),
          timeline: timeline.toPersistence(),
          departments: departments
        })
      }
      this.$router.push(`/round/${this.round + 1}/timelineSelection/bot`)
    },
    selectTimeline(action?: Action, events?: Event[]) : void {
      this.action = action
      this.events = events
    }
  }
})
</script>
