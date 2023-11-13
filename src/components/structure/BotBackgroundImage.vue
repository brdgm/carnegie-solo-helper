<template>
  <img src="@/assets/andrew.png" class="botImage" alt=""/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BotBackgroundImage'
})
</script>

<style lang="scss" scoped>
.botImage {
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 80%;
  max-width: 500px;
  opacity: 25%;
  overflow: hidden;
  z-index: -50;
}
</style>
