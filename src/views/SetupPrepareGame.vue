<template>
  <h1>{{t('setupPrepareGame.title')}}</h1>

  <ol>
    <li v-html="t('setupPrepareGame.pickPlayerColor.intro')"></li>
    <ul>
      <li v-html="t('setupPrepareGame.pickPlayerColor.putDisks')"></li>
      <li v-html="t('setupPrepareGame.pickPlayerColor.placeEmployees')"></li>
      <li v-html="t('setupPrepareGame.pickPlayerColor.takeGoodsMoney')"></li>
    </ul>
    <li v-html="t('setupPrepareGame.pickBotColor.intro')"></li>
    <ul>
      <li v-html="t('setupPrepareGame.pickBotColor.putDisks')"></li>
      <li v-html="t('setupPrepareGame.pickBotColor.botInfo')"></li>
    </ul>
    <li>
      <span v-html="t('setupPrepareGame.pickBlockingColor.intro')"></span>
      <BlockedDonations/>
      <BlockedCities/>
    </li>
  </ol>

  <RouterLink type="button" class="btn btn-primary btn-lg mt-4" to="/setupPreparePlayer">
    {{t('action.next')}}
  </RouterLink>

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
  }
})
</script>

<style lang="scss" scoped>
ol > li {
  margin-top: 10px;
}
</style>
