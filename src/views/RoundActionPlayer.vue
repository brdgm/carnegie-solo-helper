<template>
  <h1>{{t('actionPlayer.title', {round})}}</h1>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
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
import Player from '@/services/enum/Player'

export default defineComponent({
  name: 'RoundActionPlayer',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { round, startPlayer, selectedAction } = navigationState
    return { t, state, navigationState, round, startPlayer, selectedAction }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.startPlayer == Player.BOT) {
        return `/round/${this.round}/action/bot`
      }
      else {
        return `/round/${this.round}/timelineSelection/${this.startPlayer}`
      }
    }
  },
  methods: {
    next() : void {
      if (this.startPlayer == Player.BOT) {
        // prepare next round
        if (this.selectedAction) {
          const { timeline, cardDeck, departments } = this.navigationState
          timeline.execute(this.selectedAction)
          cardDeck.discardCurrentCard(0)
          this.state.storeRound({
            round: this.round + 1,
            cardDeck: cardDeck.toPersistence(),
            timeline: timeline.toPersistence(),
            departments: departments
          })
          if (this.round == 20) {
            this.$router.push('/endOfGame')
          }
          else {
            this.$router.push(`/round/${this.round + 1}/timelineSelection/player`)
          }
        }
      }
      else {
        this.$router.push(`/round/${this.round}/action/bot`)
      }
    }
  }
})
</script>
