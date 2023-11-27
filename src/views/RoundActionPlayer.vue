<template>
  <SideBar :navigation-state="navigationState"/>

  <h1>{{t('actionPlayer.title')}}</h1>

  <div v-if="selectedAction" class="mt-3">
    <AppIcon type="action-hex" :name="selectedAction" class="actionIcon float-md-start me-3 mb-3"/>
    <p v-html="t('actionPlayer.useDepartments')"></p>
  </div>

  <div v-if="isManagement">
    <p v-html="t('actionPlayer.newDepartments')"></p>
    <p v-if="playerNewDepartments.length > 0">
      <DepartmentTile v-for="(department, index) of playerNewDepartments" :key="index"
          :department="department" :clickable="true" @click="deselectDepartment(index)"/>
    </p>
    <button class="btn btn-primary" v-if="playerNewDepartments.length < 3"
        data-bs-toggle="modal" data-bs-target="#newDepartmentModal">{{t('actionPlayer.selectDepartment')}}</button>
    <div class="alert alert-warning mt-2" role="alert" v-if="isManagementDepartmentsBuildNotFromPlayerReserve" v-html="t('departmentShop.playerReserveWarning')"></div>
  </div>

  <DepartmentShop id="newDepartmentModal" :select="true" @selected="selectDepartment"
      :departments="availableDepartments" :playerReserveDepartments="playerReserveDepartments"
      :playerDepartments="playerDepartments" :playerNewDepartments="playerNewDepartments" :botDepartments="botDepartments"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" :disabled="isManagementDepartmentsBuildNotFromPlayerReserve">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>
  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
import removeDepartment from '@/util/removeDepartment'
import removeDepartments from '@/util/removeDepartments'
import addDepartments from '@/util/addDepartments'
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'

export default defineComponent({
  name: 'RoundActionPlayer',
  components: {
    FooterButtons,
    AppIcon,
    DepartmentShop,
    DepartmentTile,
    SideBar,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { round, startPlayer, selectedAction, botNewDepartments } = navigationState

    const playerNewDepartments = ref([] as string[])

    return { t, state, navigationState, round, startPlayer, selectedAction,
      botNewDepartments, playerNewDepartments }
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
    },
    isManagementDepartmentsBuildNotFromPlayerReserve() : boolean {
      return this.isManagement && this.playerNewDepartments.length > 0 && this.playerReserveDepartments.length > 0
    },
    availableDepartments() : string[] {
      return [...removeDepartments(this.navigationState.departments, this.playerNewDepartments, this.botNewDepartments)]
    },
    playerReserveDepartments() : string[] {
      return [...removeDepartments(this.navigationState.playerReserveDepartments, this.playerNewDepartments)]
    },
    playerDepartments() : string[] {
      return [...this.navigationState.playerDepartments]
    },
    botDepartments() : string[] {
      return [...addDepartments(this.navigationState.botDepartments,this.navigationState.botNewDepartments)]
    }
  },
  methods: {
    next() : void {
      // update current round
      this.state.storePlayerRoundDetails(this.round, this.playerNewDepartments)
      if (this.startPlayer == Player.BOT) {
        // prepare next round
        if (this.selectedAction) {
          const { timeline, cardDeck, departments, playerReserveDepartments, playerDepartments, botDepartments, botCardShift } = this.navigationState
          cardDeck.discardCurrentCard(botCardShift)
          this.state.storeRound({
            round: this.round + 1,
            cardDeck: cardDeck.toPersistence(),
            timeline: timeline.toPersistence(),
            playerReserveDepartments: removeDepartments(playerReserveDepartments, this.playerNewDepartments),
            departments: removeDepartments(departments, this.playerNewDepartments, this.botNewDepartments),
            playerDepartments: addDepartments(playerDepartments, this.playerNewDepartments),
            botDepartments: addDepartments(botDepartments, this.botNewDepartments)
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
      this.playerNewDepartments.push(department.id)
      this.availableDepartments = [...removeDepartment(this.availableDepartments, department.id)]
    },
    deselectDepartment(index : number) : void {
      this.availableDepartments.push(...this.playerNewDepartments.splice(index, 1))
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 80px;
}
</style>
