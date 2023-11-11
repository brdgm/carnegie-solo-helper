<template>
  <h1>{{t('roundTimelineSelection.title', {round})}}</h1>

  <TimelineSelection :timeline="navigationState.timeline"/>

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
import TimelineSelection from '@/components/round/TimelineSelection.vue'

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
      selectedPhasesStored: false
    }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      if (this.round > 1) {
        if (this.navigationState.startPlayer == Player.PLAYER) {
          return `/round/${this.round - 1}/bot`
        }
        else {
          return `/round/${this.round - 1}/player`
        }
      }
      return undefined
    }
  },
  methods: {
    next() : void {
      if (this.navigationState.startPlayer == Player.PLAYER) {
        this.$router.push(`/round/${this.round}/player`)
      }
      else {
        this.$router.push(`/round/${this.round}/bot`)
      }
    }
  }
})
</script>
