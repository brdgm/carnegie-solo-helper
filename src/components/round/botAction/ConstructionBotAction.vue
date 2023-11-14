<template>
  <p>
    <span v-html="t('actionBot.constructionCities')"></span><br/>
    <span v-for="city of cities" :key="city">
      <CityBadge :city="city" class="me-2 mt-1"/>
    </span>
  </p>
  <p>
    <span class="me-2">{{t('actionBot.disksPlaced')}}</span>
    <ActionStepsRadioGroup v-model="disksPlaced" :count="cities.length" @change="disksPlacedSelected"/>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BotActions from '@/services/BotActions'
import CityBadge from '@/components/structure/CityBadge.vue';
import City from '@/services/enum/City';
import ActionStepsRadioGroup from '@/components/structure/ActionStepsRadioGroup.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ConstructionBotAction',
  components: {
    CityBadge,
    ActionStepsRadioGroup
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
      disksPlaced: undefined as number|undefined
    }
  },
  computed: {
    cities() : readonly City[] {
      return this.botActions.cities
    }
  },
  methods: {
    disksPlacedSelected() : void {
      const actionStepsFailed = this.cities.length - (this.disksPlaced ?? 0)
      this.$emit('actionCompleted', actionStepsFailed)
    }
  }
})
</script>
