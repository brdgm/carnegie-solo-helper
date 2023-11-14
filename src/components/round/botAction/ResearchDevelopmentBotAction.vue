<template>
  <p>
    <span v-html="t('actionBot.researchIncreaseTransportLevel',{count:transportSteps})"></span><br/>
    <span class="transportRegion ms-3" v-if="region">
      <AppIcon name="transportation" class="icon"/>
      <RegionBadge :region="region"/>
    </span>
  </p>
  <p class="mt-4">
    <span class="me-2">{{t('actionBot.transportDiskMovedSteps')}}</span>
    <ActionStepsRadioGroup v-model="diskStepsMoved" :count="transportSteps" @change="diskStepsMovedSelected"/>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BotActions from '@/services/BotActions'
import ActionStepsRadioGroup from '@/components/structure/ActionStepsRadioGroup.vue';
import { useI18n } from 'vue-i18n';
import Region from '@/services/enum/Region';
import AppIcon from '@/components/structure/AppIcon.vue';
import RegionBadge from '@/components/structure/RegionBadge.vue';

export default defineComponent({
  name: 'ResearchDevelopmentBotAction',
  components: {
    ActionStepsRadioGroup,
    AppIcon,
    RegionBadge
  },
  emits: {
    actionCompleted: (_actionStepsFailed: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  props: {
    botActions: {
      type: BotActions,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      diskStepsMoved: undefined as number|undefined
    }
  },
  computed: {
    transportSteps() : number {
      return this.botActions.transportSteps
    },
    region() : Region|undefined {
      return this.botActions.transportRegion
    }
  },
  methods: {
    diskStepsMovedSelected() : void {
      const actionStepsFailed = this.transportSteps - (this.diskStepsMoved ?? 0)
      this.$emit('actionCompleted', actionStepsFailed)
    }
  }
})
</script>

<style lang="scss" scoped>
.transportRegion {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}
.icon {
  width: 50px;
  margin-bottom: -10px;
  z-index: -10;
}
</style>
