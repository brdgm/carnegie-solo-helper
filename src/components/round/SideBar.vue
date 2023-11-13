<template>
  <div class="sidebar">    
    <p>{{t('sideBar.round')}} <strong>{{round}}</strong> / 20</p>

    <p>
      <span>{{t('sideBar.nextAction')}}</span><br/>
      <span class="nextAction">
        <span v-if="isAdvancedCard" class="unknownAction">?</span>
        <AppIcon v-else type="action" :name="currentCard.mainAction" class="icon"/>
      </span>
    </p>

    <p class="buttons">
      <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#sidebarDepartmentShopModal">{{t('sideBar.departments')}}</button>
      <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#sidebarTimelineModal">{{t('sideBar.timeline')}}</button>
    </p>
  </div>

  <DepartmentShop id="sidebarDepartmentShopModal" :departments="availableDepartments"/>

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

export default defineComponent({
  name: "SideBar",
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
    availableDepartments() : string [] {
      return [...this.navigationState.departments]
    },
    currentCard() : Card {
      return this.navigationState.cardDeck.currentCard
    },
    isAdvancedCard() : boolean {
      return this.currentCard.cardType == CardType.ADVANCED
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

  .nextAction {
    .icon {
      width: 50px;
    }
    .unknownAction {
      font-size: 30px;
      font-weight: bold;
      margin-left: 15px;
    }
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}
</style>
