<template>
  <ModalDialog id="departmentShopModal" :title="t('departmentShop.title')" :size-xl="true" :scrollable="true">
    <template #body>

      <template v-if="selectedDepartment">
        <div class="department float-start ms-3 me-4 mb-3">
          <AppIcon type="department" :name="selectedDepartment.department.id" extension="jpg"
                  v-for="index of selectedDepartment.count" :key="index"
                  class="icon" :class="{double: selectedDepartment.count > 1}"
                  :title="t(`department.${selectedDepartment.department.id}.title`)"
                  @click="backToOverview"/>
        </div>
        <h5>{{t(`department.${selectedDepartment.department.id}.title`)}}</h5>
        <p v-if="!selectedDepartment.department.expansion" v-html="t(`department.${selectedDepartment.department.id}.description`)"></p>
        <p v-html="t(`department.${selectedDepartment.department.id}.rules`)"></p>
        <button class="btn btn-secondary" @click="backToOverview">&lt; {{t('action.back')}}</button>
        <button class="btn btn-primary ms-2" data-bs-dismiss="modal" @click="selectDepartment(selectedDepartment.department)">{{t('departmentShop.selectDepartment')}}</button>
      </template>

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

    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import AppIcon from '@/components/structure/AppIcon.vue'
import GroupedDepartments, { DepartmentCount, DepartmentGroup } from '@/services/GroupedDepartments'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
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
    select: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      selectedDepartment: undefined as DepartmentCount|undefined
    }
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    groups() : readonly DepartmentGroup[] {
      const groupedDepartments = new GroupedDepartments(this.departments)
      return groupedDepartments.groups
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
      this.$emit('selected', department)
    }
  }
})
</script>

<style lang="scss" scoped>
.departmentGroup {
  margin: 10px;
}
.department {
  position: relative;
  display: inline-block;
  height: 140px;
  width: 180px;
  .icon {
    position: absolute;
    left: 5px;
    top: 5px;
    height: 130px;
    border-radius: 10px;
    border: 1px solid #888;
    filter: drop-shadow(#333 3px 3px 3px);
    cursor: pointer;
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
  }
}
</style>
