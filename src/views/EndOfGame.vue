<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <table aria-describedby="endOfGameTitle">
    <tbody>
      <tr>
        <th scope="col"></th>
        <th scope="col">{{t('endOfGame.player')}}</th>
        <th scope="col">{{t('endOfGame.bot')}}</th>
      </tr>
      <tr>
        <th scope="row">{{t('endOfGame.vpGameBoard')}}</th>
        <td><ScoringTextInput v-model="playerVPGameBoard"/></td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">{{t('endOfGame.vpActiveEmployee')}}</th>
        <td><ScoringTextInput v-model="playerVPActiveEmployee"/></td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">{{t('endOfGame.vpDepartments')}}</th>
        <td><ScoringTextInput v-model="playerVPDepartments"/></td>
        <td>{{botVPDepartments}} {{t('endOfGame.vp')}}</td>
      </tr>
      <tr>
        <th scope="row">{{t('endOfGame.vpProjectTabs')}}</th>
        <td><ScoringTextInput v-model="playerVPProjectTabs"/></td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">{{t('endOfGame.vpConnectionMajorCities')}}</th>
        <td><ScoringTextInput v-model="playerVPConnectionMajorCities"/></td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">{{t('endOfGame.vpCityProjects')}}</th>
        <td><ScoringTextInput v-model="playerVPCityProjects"/></td>
        <td><ScoringTextInput v-model="botVPCityProjects"/></td>
      </tr>
      <tr>
        <th scope="row">{{t('endOfGame.vpDonations')}}</th>
        <td><ScoringTextInput v-model="playerVPDonations"/></td>
        <td><ScoringTextInput v-model="botVPDonations"/></td>
      </tr>
      <tr>
        <th scope="row">{{t('endOfGame.vpBotTransportLevel')}}</th>
        <td></td>
        <td><input type="number" min="0" max="24" step="6" v-model="botVPTransportLevel"/></td>
      </tr>
      <tr>
        <th scope="row">{{t('endOfGame.vpBotCards')}}</th>
        <td></td>
        <td>{{botVPCards}} {{t('endOfGame.vp')}}</td>
      </tr>
      <tr>
        <th scope="row">{{t('endOfGame.total')}}</th>
        <td><b>{{totalPlayer}} {{t('endOfGame.vp')}}</b></td>
        <td><b>{{totalBot}} {{t('endOfGame.vp')}}</b></td>
      </tr>
    </tbody>
  </table>

  <p class="mt-3">
    {{t('endOfGame.difficultyLevel')}} <b>{{t(`difficultyLevel.${state.setup.difficultyLevel}`)}}</b>
  </p>

  <p class="small mt-4">
    <b>*) </b>
    <span class="fst-italic" v-html="t('endOfGame.vpDonationsBotInfo')"></span>
  </p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import RoundsVPCalculator from '@/services/RoundsVPCalculator'
import ScoringTextInput from '@brdgm/brdgm-commons/src/components/form/ScoringTextInput.vue'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons,
    ScoringTextInput
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      playerVPGameBoard: 0,
      playerVPActiveEmployee: 0,
      playerVPDepartments: 0,
      playerVPProjectTabs: 0,
      playerVPConnectionMajorCities: 0,
      playerVPCityProjects: 0,
      botVPCityProjects: 0,
      playerVPDonations: 0,
      botVPDonations: 0,
      botVPTransportLevel: 0
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return '/round/20/action/player'
    },
    vpCalculator() : RoundsVPCalculator {
      return new RoundsVPCalculator(this.state.rounds)
    },
    botVPDepartments() : number {
      return this.vpCalculator.departmentsVP
    },
    botVPCards() : number {
      return this.vpCalculator.cardsShiftVP
    },
    totalPlayer() : number {
      return this.playerVPGameBoard 
          + this.playerVPActiveEmployee + this.playerVPDepartments + this.playerVPProjectTabs
          + this.playerVPConnectionMajorCities + this.playerVPCityProjects + this.playerVPDonations
    },
    totalBot() : number {
      return this.botVPDepartments + this.botVPCityProjects + this.botVPDonations
          + this.botVPTransportLevel + this.botVPCards
    }
  }
})
</script>

<style lang="scss" scoped>
th, td {
  text-align: center;
  padding: 0.5rem;
}
th:nth-child(1) {
  text-align: start;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  vertical-align: middle;
}
input {
  width: 5rem;
}
</style>
