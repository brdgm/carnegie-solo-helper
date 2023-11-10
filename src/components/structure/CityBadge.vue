<template>
  <div class="cityBadge" :style="{'background-color':backgroundColor,'border-color':borderColor}">{{cityName}}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import City from '@/services/enum/City'
import getCityMetadata from '@/util/getCityMetadata'
import getRegionMetadata from '@/util/getRegionMetadata'
import RegionMetadata from '@/services/RegionMetadata'

export default defineComponent({
  name: 'CityBadge',
  props: {
    city: {
      type: String as PropType<City>,
      required: true
    }
  },
  computed: {
    regionMetadata() : RegionMetadata {
      return getRegionMetadata(getCityMetadata(this.city).region)
    },
    backgroundColor() : string {
      return this.regionMetadata.backgroundColor
    },
    borderColor() : string {
      return this.regionMetadata.borderColor
    },
    cityName() : string {
      return this.city.toUpperCase().replace('-', ' ')
    }
  }
})
</script>

<style lang="scss" scoped>
.cityBadge {
  display: inline-block;
  padding: 3px 8px 3px 8px;
  border-radius: 5px;
  border: 2px solid;
  font-size: small;
  font-weight: bold;
  color: #fff;
}
</style>
