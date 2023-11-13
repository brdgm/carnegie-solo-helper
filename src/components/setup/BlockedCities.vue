<template>
  <div class="cities">
    <p v-html="t('setupPrepareGame.pickBlockingColor.placeCityDisks')"></p>
    <ul>
      <li v-for="cityCount of blockedCities" :key="cityCount.city">
        <CityBadge :city="cityCount.city"/>
        <AppIcon name="block-disk" class="icon" v-for="i of cityCount.count" :key="i"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { CityCount, useStateStore } from '@/store/state'
import AppIcon from '@/components/structure/AppIcon.vue'
import CityBadge from '../structure/CityBadge.vue'

export default defineComponent({
  name: 'BlockedCities',
  components: {
    AppIcon,
    CityBadge
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    blockedCities() : readonly CityCount[] {
      return this.state.setup.blockedCities ?? []
    }
  }
})
</script>

<style lang="scss" scoped>
.cities {
  margin-top: 5px;
}
.cityBadge {
  margin-right: 10px;
}
.icon {
  height: 40px;
}
</style>
