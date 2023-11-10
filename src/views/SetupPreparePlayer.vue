<template>
  <h1>{{t('setupPreparePlayer.title')}}</h1>

  <ol>
    <li v-html="t('setupPreparePlayer.placeHousingDisk')"></li>    
    <li>
      <span v-html="t('setupPreparePlayer.pickDepartmentTileInfo')"></span><br/>
      <button class="btn btn-primary mt-2 mb-2" data-bs-toggle="modal" data-bs-target="#departmentShopModal">{{t('setupPreparePlayer.pickDepartmentTile')}}</button>
    </li>
    <li v-html="t('setupPreparePlayer.moveEmployees')"></li>
    <li v-html="t('setupPreparePlayer.activateEmployees')"></li>
  </ol>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()" v-if="department">
    {{t('action.startGame')}}
  </button>

  <DepartmentShop :departments="initialDepartments"/>

  <FooterButtons endGameButtonType="abortGame" backButtonRouteTo="/setupPrepareGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DepartmentShop from '@/components/structure/DepartmentShop.vue'

export default defineComponent({
  name: 'SetupPreparePlayer',
  components: {
    FooterButtons,
    DepartmentShop
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      department: undefined as string|undefined
    }
  },
  computed: {
    initialDepartments() : string[] {
      return (this.state.setup.initialDepartments ?? []) as string[]
    }
  },
  methods: {
    startGame() : void {
      this.$router.push('/round/1/selectPhase')
    }
  }
})
</script>

<style lang="scss" scoped>
ol > li {
  margin-top: 10px;
}
</style>
