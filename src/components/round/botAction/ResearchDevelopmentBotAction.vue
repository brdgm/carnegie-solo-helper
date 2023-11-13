<template>
  <p>Research & Development...</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import BotActions from '@/services/BotActions'

export default defineComponent({
  name: 'ResearchDevelopmentBotAction',
  components: {
    AppIcon
  },
  emits: {
    actionCompleted: (_actionStepsFailed: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  props: {
    botActions: {
      type: BotActions,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
