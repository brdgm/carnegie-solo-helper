<template>
  <img src="@/assets/andrew.png" class="botImage" v-if="!playerStartPlayer"/>

  <h1>{{t('roundTimelineSelection.title', {round})}}</h1>

  <p v-if="playerStartPlayer">Please select the next timeline action:</p>
  <p v-else>Andrew selects this action:</p>

  <TimelineSelection :timeline="navigationState.timeline" @selected="selectTimeline"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" v-if="selectedAction">
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
import Player from '@/services/enum/Player'

export default defineComponent({
  name: 'RoundTimelineSelection',
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
      selectedAction: undefined as Action|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      if (this.round > 1) {
        return `/round/${this.round - 1}/timelineSelection`
        /*
        if (this.navigationState.startPlayer == Player.PLAYER) {
          return `/round/${this.round - 1}/bot`
        }
        else {
          return `/round/${this.round - 1}/player`
        }
        */
      }
      return undefined
    },
    playerStartPlayer() : boolean {
      return this.navigationState.startPlayer == Player.PLAYER
    }
  },
  methods: {
    next() : void {
      // prepare next round
      if (this.selectedAction) {
        this.navigationState.timeline.execute(this.selectedAction)
        this.state.storeRound({
          round: this.round + 1,
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          timeline: this.navigationState.timeline.toPersistence(),
          departments: this.navigationState.departments
        })
      }
      this.$router.push(`/round/${this.round + 1}/timelineSelection`)
      /*
      if (this.navigationState.startPlayer == Player.PLAYER) {
        this.$router.push(`/round/${this.round}/player`)
      }
      else {
        this.$router.push(`/round/${this.round}/bot`)
      }
      */
    },
    selectTimeline(action: Action) : void {
      this.selectedAction = action
    }
  }
})
</script>

<style lang="scss" scoped>
.botImage {
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 100%;
  max-width: 500px;
  opacity: 25%;
  overflow: hidden;
  z-index: -50;
}
</style>