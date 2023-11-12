<template>
  <p>Construction...</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import BotActions from '@/services/BotActions'

export default defineComponent({
  name: 'ConstructionBotAction',
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
