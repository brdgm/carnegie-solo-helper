<template>
  <div class="sidebar">    
    <p>{{t('sideBar.round')}} <strong>{{round}}</strong> / 20</p>

    <span>{{t('sideBar.nextAction')}}</span><br/>      
    <div class="nextActions">
      <span class="nextAction" v-if="currentCard">
        <span v-if="isCurrentCardActionHidden" class="unknownAction">?</span>
        <AppIcon v-else type="action" :name="currentCard.mainAction" class="icon"/>
      </span>
      /
      <span class="nextAction" v-if="nextCard">
        <span v-if="isNextCardActionHidden" class="unknownAction">?</span>
        <AppIcon v-else type="action" :name="nextCard.mainAction" class="icon"/>
      </span>
    </div>

    <p class="small">
      {{t('sideBar.vpCards',{count:vpCalculator.cardsShiftVP})}}<br/>
      {{t('sideBar.vpDepartments',{count:vpCalculator.departmentsVP})}}
    </p>

    <p class="buttons">
      <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#sidebarDepartmentShopModal">{{t('sideBar.departments')}}</button>
      <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#sidebarTimelineModal" :disabled="navigationState.isTimelineSelection">{{t('sideBar.timeline')}}</button>
    </p>
  </div>

  <DepartmentShop id="sidebarDepartmentShopModal" :departments="availableDepartments"
      :playerReserveDepartments="playerReserveDepartments" :playerDepartments="playerDepartments" :botDepartments="botDepartments"/>

  <ModalDialog id="sidebarTimelineModal" :title="t('sideBar.timeline')" :size-xl="true" :scrollable="true">
    <template #body>
      <TimelineSelection :timeline="navigationState.timeline" :readOnly="true"/>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState';
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';
import { useStateStore } from '@/store/state';
import DepartmentShop from '../structure/DepartmentShop.vue';
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue';
import TimelineSelection from './TimelineSelection.vue';
import AppIcon from '../structure/AppIcon.vue';
import Card from '@/services/Card';
import CardType from '@/services/enum/CardType';
import RoundsVPCalculator from '@/services/RoundsVPCalculator';
import removeDepartments from '@/util/removeDepartments';
import Player from '@/services/enum/Player';
import addDepartments from '@/util/addDepartments';

export default defineComponent({
  name: 'SideBar',
  components: {
    DepartmentShop,
    ModalDialog,
    TimelineSelection,
    AppIcon
  },
  setup() {
    const { t } = useI18n();
    const state = useStateStore()
    return { t, state };
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    round() : number {
      return this.navigationState.round
    },
    availableDepartments() : string[] {
      return [...removeDepartments(this.navigationState.departments,
          this.navigationState.playerNewDepartments, this.navigationState.botNewDepartments)]
    },
    playerReserveDepartments() : string[] {
      return [...removeDepartments(this.navigationState.playerReserveDepartments,this.navigationState.playerNewDepartments)]
    },
    playerDepartments() : string[] {
      return [...addDepartments(this.navigationState.playerDepartments,this.navigationState.playerNewDepartments)]
    },
    botDepartments() : string[] {
      return [...addDepartments(this.navigationState.botDepartments,this.navigationState.botNewDepartments)]
    },
    currentCard() : Card|undefined {
      return this.navigationState.cardDeck.currentCard
    },
    nextCard() : Card|undefined {
      return this.navigationState.cardDeck.nextCard
    },
    isCurrentCardActionHidden() : boolean {
      return this.currentCard?.cardType == CardType.ADVANCED
          && this.navigationState.player != Player.BOT
    },
    isNextCardActionHidden() : boolean {
      return this.nextCard?.cardType == CardType.ADVANCED
    },
    vpCalculator() : RoundsVPCalculator {
      return new RoundsVPCalculator(this.state.rounds
          .filter(item => item.round <= this.navigationState.round - 1), this.navigationState)
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 150px;
  padding: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  margin-right: -12px;
  border: 1px solid #eee;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #fbf8f1;
  filter: drop-shadow(#666 3px 3px 3px);

  .nextActions {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
  }
  .nextAction {
    .icon {
      width: 40px;
    }
    .unknownAction {
      font-size: 30px;
      font-weight: bold;
      margin-left: 15px;
      margin-right: 10px;
    }
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
