<template>
  <h1>{{t('actionPlayer.title', {round})}}</h1>

  <div v-if="selectedAction" class="clearfix mt-3 mb-3">
    <AppIcon type="action-hex" :name="selectedAction" class="actionIcon float-start me-3"/>
    <p v-html="t('actionPlayer.useDepartments')"></p>
  </div>

  <div v-if="isManagement">
    <p v-html="t('actionPlayer.newDepartments')"></p>
    <p v-if="newDepartments.length > 0">
      <DepartmentTile v-for="(department, index) of newDepartments" :key="index"
          :department="department" @click="removeDepartment(index)"/>
    </p>
    <button class="btn btn-primary" v-if="newDepartments.length < 3"
      data-bs-toggle="modal" data-bs-target="#newDepartmentModal">{{t('actionPlayer.selectDepartment')}}</button>
  </div>

  <DepartmentShop id="newDepartmentModal" :departments="(navigationState.departments as string[])" @selected="selectDepartment"/>

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
import AppIcon from '@/components/structure/AppIcon.vue'
import Action from '@/services/enum/Action'
import Department from '@/services/Department'
import DepartmentShop from '@/components/structure/DepartmentShop.vue'
import DepartmentTile from '@/components/structure/DepartmentTile.vue'

export default defineComponent({
  name: 'RoundActionPlayer',
  components: {
    FooterButtons,
    AppIcon,
    DepartmentShop,
    DepartmentTile
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { round, startPlayer, selectedAction } = navigationState
    return { t, state, navigationState, round, startPlayer, selectedAction }
  },
  data() {
    return {
      "newDepartments": [] as string[]
    }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.startPlayer == Player.BOT) {
        return `/round/${this.round}/action/bot`
      }
      else {
        return `/round/${this.round}/timelineSelection/${this.startPlayer}`
      }
    },
    isManagement() : boolean {
      return this.selectedAction == Action.MANAGEMENT
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
    },
    selectDepartment(department : Department) : void {
      this.newDepartments.push(department.id)
    },
    removeDepartment(index : number) : void {
      this.newDepartments.splice(index, 1)
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 80px;
}
</style>
