<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <table aria-describedby="endOfGameTitle">
    <tr>
      <th scope="col"></th>
      <th scope="col">{{t('endOfGame.player')}}</th>
      <th scope="col">{{t('endOfGame.bot')}}</th>
    </tr>
    <tr>
      <th scope="row">{{t('endOfGame.vpActiveEmployee')}}</th>
      <td><input type="number" min="0" max="99" step="1" v-model="playerVPActiveEmployee" @focus="inputSelectAll"/></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">{{t('endOfGame.vpDepartments')}}</th>
      <td><input type="number" min="0" max="99" step="1" v-model="playerVPDepartments" @focus="inputSelectAll"/></td>
      <td>{{botVPDepartments}} {{t('endOfGame.vp')}}</td>
    </tr>
    <tr>
      <th scope="row">{{t('endOfGame.vpProjectTabs')}}</th>
      <td><input type="number" min="0" max="99" step="1" v-model="playerVPProjectTabs" @focus="inputSelectAll"/></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">{{t('endOfGame.vpConnectionMajorCities')}}</th>
      <td><input type="number" min="0" max="99" step="1" v-model="playerVPConnectionMajorCities" @focus="inputSelectAll"/></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">{{t('endOfGame.vpCityProjects')}}</th>
      <td><input type="number" min="0" max="99" step="1" v-model="playerVPCityProjects" @focus="inputSelectAll"/></td>
      <td><input type="number" min="0" max="99" step="1" v-model="botVPCityProjects" @focus="inputSelectAll"/></td>
    </tr>
    <tr>
      <th scope="row">{{t('endOfGame.vpDonations')}}</th>
      <td><input type="number" min="0" max="99" step="1" v-model="playerVPDonations" @focus="inputSelectAll"/></td>
      <td><input type="number" min="0" max="99" step="1" v-model="botVPDonations" @focus="inputSelectAll"/></td>
    </tr>
    <tr>
      <th scope="row">{{t('endOfGame.vpBotTransportLevel')}}</th>
      <td></td>
      <td><input type="number" min="0" max="24" step="6" v-model="botVPTransportLevel" @focus="inputSelectAll"/></td>
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
  </table>

  <p class="mt-3">
    {{t('endOfGame.difficultyLevel')}} <b>{{t(`difficultyLevel.${state.setup.difficultyLevel}`)}}</b>
  </p>

  <p class="small mt-4">
    <b>*) </b>
    <span v-html="t('endOfGame.vpDonationsBotInfo1')"></span><br/>
    <span v-html="t('endOfGame.vpDonationsBotInfo2')"></span>
  </p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import RoundsVPCalculator from '@/services/RoundsVPCalculator'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
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
      return this.playerVPActiveEmployee + this.playerVPDepartments + this.playerVPProjectTabs
          + this.playerVPConnectionMajorCities + this.playerVPCityProjects + this.playerVPDonations
    },
    totalBot() : number {
      return this.botVPDepartments + this.botVPCityProjects + this.botVPDonations
          + this.botVPTransportLevel + this.botVPCards
    }
  },
  methods: {
    inputSelectAll(event: Event) : void {
      const input = event.target as HTMLInputElement
      input.select()
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
