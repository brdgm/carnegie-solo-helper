<template>
  <ModalDialog :id="id" :title="t('departmentShop.title')" :size-xl="true" :scrollable="true" :centered="false" :fullscreen-lg-down="true">
    <template #body>

      <ul class="nav nav-tabs">
        <li class="nav-item" v-if="(playerReserveDepartments ?? []).length > 0">
          <a id="tablink-player-reserve" class="nav-link" :class="{active:departmentView=='playerReserve'}" href="#" @click.prevent="showDepartments('playerReserve')">{{t('departmentShop.playerReserve')}}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{active:departmentView=='available'}" href="#" @click.prevent="showDepartments('available')">{{t('departmentShop.available')}}</a>
        </li>
        <li class="nav-item" v-if="(playerDepartments ?? []).length > 0">
          <a class="nav-link" :class="{active:departmentView=='player'}" href="#" @click.prevent="showDepartments('player')">{{t('departmentShop.player')}}</a>
        </li>
        <li class="nav-item" v-if="(botDepartments ?? []).length > 0">
          <a class="nav-link" :class="{active:departmentView=='bot'}" href="#" @click.prevent="showDepartments('bot')">{{t('departmentShop.bot')}}</a>
        </li>
      </ul>

      <div class="border departmentContent">
        <div v-if="selectedDepartment" class="p-4">
          <div class="alert alert-warning" role="alert" v-if="isDepartmentSelectionPossible && isDuplicateDepartment" v-html="t('departmentShop.duplicateDepartmentWarning')"></div>
          <div class="alert alert-warning" role="alert" v-if="isDepartmentSelectionPossible && isNotPlayerReserveWhichIsNotEmpty" v-html="t('departmentShop.playerReserveWarning')"></div>
          <div class="department float-md-start ms-3 me-4 mb-3 single">
            <AppIcon type="department" :name="selectedDepartment.department.id" extension="jpg"
                    class="icon single"
                    :title="t(`department.${selectedDepartment.department.id}.title`)"
                    @click="backToOverview"/>
          </div>
          <h5>{{t(`department.${selectedDepartment.department.id}.title`)}}</h5>
          <p v-if="!selectedDepartment.department.expansion" v-html="t(`department.${selectedDepartment.department.id}.description`)" class="fst-italic"></p>
          <p v-html="t(`department.${selectedDepartment.department.id}.rules`)"></p>
          <div class="clearfix"></div>
          <div class="mt-2">
            <button class="btn btn-secondary" @click="backToOverview">&lt; {{t('action.back')}}</button>
            <button class="btn btn-primary ms-2" data-bs-dismiss="modal" @click="selectDepartment(selectedDepartment.department)"
                v-if="isDepartmentSelectionPossible"
                :disabled="isDuplicateDepartment || isNotPlayerReserveWhichIsNotEmpty">{{t('departmentShop.selectDepartment')}}</button>
          </div>
        </div>

        <template v-else>
          <div class="departmentGroup" v-for="group of groups" :key="group.departmentType">
            <div class="department" v-for="departmentCount of group.departments" :key="departmentCount.department.id">
              <AppIcon type="department" :name="departmentCount.department.id" extension="jpg"
                  v-for="index of departmentCount.count" :key="index"
                  class="icon" :class="{double: departmentCount.count > 1}"
                  :title="t(`department.${departmentCount.department.id}.title`)"
                  @click="departmentDetails(departmentCount)"/>
            </div>
          </div>
        </template>
      </div>

    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/structure/AppIcon.vue'
import GroupedDepartments, { DepartmentCount, DepartmentGroup } from '@/services/GroupedDepartments'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import Department from '@/services/Department'

export default defineComponent({
  name: 'DepartmentShop',
  components: {
    AppIcon,
    ModalDialog
  },
  emits: {
    selected: (_department: Department) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  props: {
    departments: {
      type: Array<string>,
      required: true
    },
    playerReserveDepartments: {
      type: Array<string>,
      required: false
    },
    playerDepartments: {
      type: Array<string>,
      required: false
    },
    playerNewDepartments: {
      type: Array<string>,
      required: false
    },
    botDepartments: {
      type: Array<string>,
      required: false
    },
    select: {
      type: Boolean,
      required: false
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      departmentView: (this.playerReserveDepartments ?? []).length > 0 ? 'playerReserve' : 'available',
      selectedDepartment: undefined as DepartmentCount|undefined
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    groupsAvailable() : readonly DepartmentGroup[] {
      const groupedDepartments = new GroupedDepartments(this.departments)
      return groupedDepartments.groups
    },
    groupsPlayerReserve() : readonly DepartmentGroup[] {
      const groupedDepartments = new GroupedDepartments(this.playerReserveDepartments ?? [])
      return groupedDepartments.groups
    },
    groupsPlayer() : readonly DepartmentGroup[] {
      const groupedDepartments = new GroupedDepartments(this.playerDepartments ?? [])
      return groupedDepartments.groups
    },
    groupsBot() : readonly DepartmentGroup[] {
      const groupedDepartments = new GroupedDepartments(this.botDepartments ?? [])
      return groupedDepartments.groups
    },
    groups() : readonly DepartmentGroup[] {
      if (this.departmentView == 'playerReserve') {
        return this.groupsPlayerReserve
      }
      if (this.departmentView == 'player') {
        return this.groupsPlayer
      }
      else if (this.departmentView == 'bot') {
        return this.groupsBot
      }
      else {
        return this.groupsAvailable
      }
    },
    isDepartmentSelectionPossible() : boolean {
      return this.select && (this.departmentView == 'available' || this.departmentView == 'playerReserve')
    },
    isDuplicateDepartment() : boolean {
      return !!(this.select && this.selectedDepartment
          && ((this.playerDepartments ?? []).includes(this.selectedDepartment.department.id)
          || (this.playerNewDepartments ?? []).includes(this.selectedDepartment.department.id)))
    },
    isNotPlayerReserveWhichIsNotEmpty() : boolean {
      return !!(this.playerReserveDepartments && this.playerReserveDepartments.length > 0 && this.selectedDepartment
          && !this.playerReserveDepartments.includes(this.selectedDepartment.department.id))
    }
  },
  methods: {
    departmentDetails(departmentCount : DepartmentCount) {
      this.selectedDepartment = departmentCount
    },
    backToOverview() {
      this.selectedDepartment = undefined
    },
    selectDepartment(department : Department) {      
      this.selectedDepartment = undefined
      this.departmentView = 'available'
      this.$emit('selected', department)
    },
    showDepartments(departmentView: string) {
      this.selectedDepartment = undefined
      this.departmentView = departmentView
    }
  }
})
</script>

<style lang="scss" scoped>
$breakpoint: 550px;
.departmentContent {
  min-height: 300px;
}
.departmentGroup {
  margin: 10px;
}
.department {
  position: relative;
  display: inline-block;
  height: 140px;
  width: 180px;
  @media (max-width: $breakpoint) {
    height: 93px;
    width: 120px;
    &.single {
      height: 140px;
      width: 180px;
    }
  }
  .icon {
    position: absolute;
    left: 5px;
    top: 5px;
    height: 130px;
    border-radius: 10px;
    border: 1px solid #888;
    filter: drop-shadow(#333 3px 3px 3px);
    cursor: pointer;
    @media (max-width: $breakpoint) {
      height: 86px;
      &.single {
        height: 130px;
      }
    }
    &.double:nth-child(1) {
      position: absolute;
      left: 10px;
      top: 10px;
    }
    &.double:nth-child(2) {
      position: absolute;
      left: 0;
      top: 0;
    }
    &.single {
      left: 0px;
      top: 0px;
    }
  }
}
</style>
