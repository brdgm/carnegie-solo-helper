<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <b>Card Deck</b><br/>
      Pile: {{cardDeck.pile.map(card => cardInfo(card))}}<br/>
      Discard: <span v-for="(discard,index) of cardDeck.discardPile" :key="index">{{index}}: {{(discard ?? []).map(card => cardInfo(card))}}&nbsp;</span><br/>
      <b>Departments</b><br/>
      Available: {{navigationState.departments}}({{navigationState.departments.length}})<br/>
      Player: {{navigationState.playerDepartments}}({{navigationState.playerDepartments.length}}),
        Reserve: {{navigationState.playerReserveDepartments}}({{navigationState.playerReserveDepartments.length}})<br/>
      Bot: {{navigationState.botDepartments}}({{navigationState.botDepartments.length}}) + {{navigationState.botNewDepartments}}({{navigationState.botNewDepartments.length}})<br/>
      <b>Bot</b><br/>
      botEventDonationFailed={{navigationState.botEventDonationFailed}}, botCardShift={{navigationState.botCardShift}}<br/>
      vpCalculator: cardsShift={{vpCalculator.cardsShift}}, cardsShiftVP={{vpCalculator.cardsShiftVP}}, departmentCount={{vpCalculator.departmentCount}}, departmentsVP={{vpCalculator.departmentsVP}}
    </p>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import RoundsVPCalculator from '@/services/RoundsVPCalculator'
import Card from '@/services/Card'

export default defineComponent({
  name: 'DebugInfo',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    cardDeck() {
      return this.navigationState.cardDeck
    },
    vpCalculator() {
      return new RoundsVPCalculator(this.state.rounds.filter(item => item.round < this.navigationState.round), this.navigationState)
    }
  },
  methods: {
    cardInfo(card : Card) : string {
      return `${card.id}-${card.mainAction}`
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
</style>
