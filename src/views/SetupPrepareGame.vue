<template>
  <h1>{{t('setupPrepare.title')}}</h1>

  <ol>
    <li>Pick a player color <b>for you</b>.</li>
    <ul>
      <li>Put one disks on the score track, one disk on each transportation tracks starting field, and one each available space on the project tabs of your player board.</li>
      <li>Take 4 good cubes and $12.</li>
    </ul>
    <li>Pick a player color <b>for Andrew</b>, the solo opponent.</li>
    <ul>
      <li>Put one disks on the score track, one disk on each transportation tracks starting field.</li>
      <li>Andrew does not need a player board or any further setup. He does not get good cubes or money.</li>
    </ul>
    <li>
      Pick a third player color for initially <b>blocking certain donations and cities</b>:
      <BlockedDonations/>
      <BlockedCities/>
    </li>
    <li>...</li>
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
