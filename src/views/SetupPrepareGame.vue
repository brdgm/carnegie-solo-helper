<template>
  <h1>{{t('setupPrepare.title')}}</h1>

  <ol>
    <li v-html="t('setupPrepare.pickPlayerColor.intro')"></li>
    <ul>
      <li v-html="t('setupPrepare.pickPlayerColor.putDisks')"></li>
      <li v-html="t('setupPrepare.pickPlayerColor.takeGoodsMoney')"></li>
    </ul>
    <li v-html="t('setupPrepare.pickBotColor.intro')"></li>
    <ul>
      <li v-html="t('setupPrepare.pickBotColor.putDisks')"></li>
      <li v-html="t('setupPrepare.pickBotColor.botInfo')"></li>
    </ul>
    <li>
      <span v-html="t('setupPrepare.pickBlockingColor.intro')"></span>
      <BlockedDonations/>
      <BlockedCities/>
    </li>
  </ol>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons endGameButtonType="abortGame" backButtonRouteTo="/setupGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import BlockedDonations from '@/components/setup/BlockedDonations.vue'
import BlockedCities from '@/components/setup/BlockedCities.vue'

export default defineComponent({
  name: 'SetupPrepareGame',
  components: {
    FooterButtons,
    BlockedDonations,
    BlockedCities
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  methods: {
    startGame() : void {
      this.$router.push('/round/1/selectPhase')
    }
  }
})
</script>

<style lang="scss" scoped>
ol > li {
  margin-top: 10px;
}
</style>
