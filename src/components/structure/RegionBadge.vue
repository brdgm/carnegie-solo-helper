<template>
  <div class="regionBadge" :style="{'background-color':backgroundColor,'border-color':borderColor}">{{region}}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import getRegionMetadata from '@/util/getRegionMetadata'
import RegionMetadata from '@/services/RegionMetadata'
import Region from '@/services/enum/Region'

export default defineComponent({
  name: 'RegionBadge',
  props: {
    region: {
      type: String as PropType<Region>,
      required: true
    }
  },
  computed: {
    regionMetadata() : RegionMetadata {
      return getRegionMetadata(this.region)
    },
    backgroundColor() : string {
      return this.regionMetadata.backgroundColor
    },
    borderColor() : string {
      return this.regionMetadata.borderColor
    }
  }
})
</script>

<style lang="scss" scoped>
.regionBadge {
  display: inline-block;
  padding: 3px 8px 3px 8px;
  border-radius: 5px;
  border: 2px solid;
  font-size: small;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
}
</style>
