<template>
  <template v-if="departments.length > 0">
    <p v-html="t('actionBot.managementBuildDepartments',departments.length)"></p>
    <p>
      <DepartmentTile v-for="(department, index) of departments" :key="index" :department="department"/>
    </p>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BotActions from '@/services/BotActions'
import DepartmentTile from '@/components/structure/DepartmentTile.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ManagementBotAction',
  components: {
    DepartmentTile
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    botActions: {
      type: BotActions,
      required: true
    }
  },
  computed: {
    departments() : readonly string[] {
      return this.botActions.botNewDepartments
    }
  }
})
</script>
