<template>
  <ModalDialog id="departmentShopModal" :title="t('departmentShop.title')" :size-xl="true" :scrollable="true">
    <template #body>
      <div class="departmentGroup" v-for="group of groups" :key="group.departmentType">
        <div class="department" v-for="departmentCount of group.departments" :key="departmentCount.department.id">
          <AppIcon type="department" :name="departmentCount.department.id" extension="jpg" class="icon"/>x{{departmentCount.count}};
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
  display: inline-block;
  .icon {
    max-height: 150px;
    border-radius: 10px;
  }
}
</style>
