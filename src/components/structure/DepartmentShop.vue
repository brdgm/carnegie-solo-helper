<template>
  <ModalDialog id="departmentShopModal" :title="t('departmentShop.title')" :size-xl="true" :scrollable="true">
    <template #body>
      <div class="departmentGroup" v-for="group of groups" :key="group.departmentType">
        <div class="department" v-for="departmentCount of group.departments" :key="departmentCount.department.id">
          <template v-if="departmentCount.count == 2">
            <AppIcon type="department" :name="departmentCount.department.id" extension="jpg" class="icon double"/>
            <AppIcon type="department" :name="departmentCount.department.id" extension="jpg" class="icon double"/>
          </template>
          <template v-else>
            <AppIcon type="department" :name="departmentCount.department.id" extension="jpg" class="icon"/>
          </template>
        </div>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import AppIcon from '@/components/structure/AppIcon.vue'
import GroupedDepartments, { DepartmentGroup } from '@/services/GroupedDepartments'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'DepartmentShop',
  components: {
    AppIcon,
    ModalDialog
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
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    groups() : readonly DepartmentGroup[] {
      const groupedDepartments = new GroupedDepartments(this.departments as string[])
      return groupedDepartments.groups
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
