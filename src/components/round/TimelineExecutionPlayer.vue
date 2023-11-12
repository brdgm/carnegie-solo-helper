<template>
  <li v-for="event of events" :key="event" v-html="t(`timelineSelection.playerEvent.${event}`)"></li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Event from '@/services/enum/Event'

export default defineComponent({
  name: 'TimelineExecutionPlayer',
  props: {
    events: {
      type: Array as PropType<Event[]>,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
