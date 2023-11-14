<template>
  <div class="department">
    <AppIcon type="department" :name="department" extension="jpg"
        class="icon" :title="t(`department.${department}.title`)"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'DepartmentTile',
  components: {
    AppIcon
  },
  props: {
    department: {
      type: String,
      required: true
    },
    clickable: {
      type: Boolean,
      required: false
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    cursor() : string|undefined {
      if (this.clickable) {
        return 'pointer'
      }
      return undefined
    }
  }
})
</script>

<style lang="scss" scoped>
.department {
  display: inline-block;
  height: 140px;
  width: 180px;
  cursor: v-bind(cursor);
  .icon {
    height: 130px;
    border-radius: 10px;
    border: 1px solid #888;
    filter: drop-shadow(#333 3px 3px 3px);
  }
}
</style>
