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
