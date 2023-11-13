<template>
  <p><!-- gains only VP --></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BotActions from '@/services/BotActions'

export default defineComponent({
  name: 'HumanResourcesBotAction',
  emits: {
    actionCompleted: (_actionStepsFailed: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  props: {
    botActions: {
      type: BotActions,
      required: true
    }
  },
  mounted() {
    this.$emit('actionCompleted', 0)
  }
})
</script>
