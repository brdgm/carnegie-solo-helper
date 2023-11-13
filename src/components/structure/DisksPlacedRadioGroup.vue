<template>
  <div>
    <span class="me-2">{{t('disksPlaced.disksPlaced')}}</span>
    <div class="btn-group" role="group">
      <template v-for="index of count + 1" :key="index">
        <input type="radio" class="btn-check" :id="`disksPlaceOption${index}`" autocomplete="off"
            :value="index-1" v-model="value" @input="changed">
        <label class="btn btn-outline-primary" :for="`disksPlaceOption${index}`">
          <span v-if="index == count + 1">{{t('disksPlaced.all',{count:index-1})}}</span>
          <span v-else>{{index-1}}</span>
        </label>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DisksPlacedRadioGroup',
  emits: {
    'update:modelValue': (_modelValue: number|undefined) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  props: {
    modelValue: {
      type: Number
    },
    count: {
      type: Number,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      value: this.modelValue
    }
  },
  methods: {
    changed(event : Event) {
      const newValue = parseInt((event.target as HTMLInputElement).value)
      this.$emit('update:modelValue', newValue)
    }
  }
})
</script>

<style lang="scss" scoped>
label {
  min-width: 50px;
}
</style>
