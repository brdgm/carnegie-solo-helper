<template>
  <BotBackgroundImage/>

  <h1>{{t('actionBot.title', {round})}}</h1>

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
import BotBackgroundImage from '@/components/structure/BotBackgroundImage.vue'
import removeDepartments from '@/util/removeDepartments'

export default defineComponent({
  name: 'RoundActionBot',
  components: {
    FooterButtons,
    BotBackgroundImage
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { round, startPlayer, selectedAction, playerDepartments, botDepartments } = navigationState
    return { t, state, navigationState, round, startPlayer, selectedAction, playerDepartments, botDepartments }
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
      if (this.startPlayer == Player.PLAYER) {
        // prepare next round
        if (this.selectedAction) {
          const { timeline, cardDeck, departments } = this.navigationState
          timeline.execute(this.selectedAction)
          cardDeck.discardCurrentCard(0)
          this.state.storeRound({
            round: this.round + 1,
            cardDeck: cardDeck.toPersistence(),
            timeline: timeline.toPersistence(),
            departments: removeDepartments(departments, this.playerDepartments, this.botDepartments)
          })
          this.$router.push(`/round/${this.round + 1}/timelineSelection/bot`)
        }
      }
      else {
        this.$router.push(`/round/${this.round}/action/player`)
      }
    }
  }
})
</script>
