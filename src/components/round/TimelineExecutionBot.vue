<template>
  <li v-if="isDonation">
    <template v-if="failed">
      <span v-html="t('timelineSelection.botEventDonation.failed')"></span><br/>
    </template>
    <template v-else>
      <span v-html="t('timelineSelection.botEventDonation.title')"></span><br/>
      <AppIcon type="donation" :name="donation" class="icon mb-2"/><br/>
      <template v-if="!completed">
        <button class="btn btn-success mb-2" @click="donationDone">{{t('timelineSelection.botEventDonation.done')}}</button>
        <button class="btn btn-danger ms-2 mb-2" @click="donationNotPossible">{{t('timelineSelection.botEventDonation.notPossible')}}</button>
      </template>
    </template>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/structure/AppIcon.vue'
import Event from '@/services/enum/Event'
import Donation from '@/services/enum/Donation'

export default defineComponent({
  name: 'TimelineExecutionBot',
  components: {
    AppIcon
  },
  emits: {
    eventCompleted: (_donationFailed: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  props: {
    events: {
      type: Array as PropType<Event[]>,
      required: true
    },
    donation: {
      type: String as PropType<Donation>,
      required: true
    }
  },
  data() {
    return {
      completed: false,
      failed: false
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  mounted() {
    if (!this.isDonation) {
      this.$emit('eventCompleted', false)
    }
  },
  computed: {
    isDonation() : boolean {
      return this.events.includes(Event.DONATION)
    }
  },
  methods: {
    donationDone() {
      this.completed = true
      this.$emit('eventCompleted', this.failed)
    },
    donationNotPossible() {
      this.completed = true
      this.failed = true
      this.$emit('eventCompleted', this.failed)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 100px;
}
</style>