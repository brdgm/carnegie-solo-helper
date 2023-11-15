<template>
  <h3 class="mt-4 mb-3">{{t('setup.departmentSelection.title')}}</h3>

  <div class="row">
    <div class="offset-md-1 col-md-10">
      
      <div class="form-check" v-for="departmentSelectionType of departmentSelectionTypes" :key="departmentSelectionType">
        <label class="form-check-label">
          <input class="form-check-input" type="radio" :value="departmentSelectionType" v-model="state.setup.departmentSelectionType">
          {{t(`departmentSelectionType.${departmentSelectionType}`)}}
        </label>
      </div>

    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import DepartmentSelectionType from '@/services/enum/DepartmentSelectionType'

export default defineComponent({
  name: 'DepartmentSelection',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    departmentSelectionTypes() : DepartmentSelectionType[] {
      return Object.values(DepartmentSelectionType)
    }
  }
})
</script>
