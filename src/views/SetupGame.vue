<template>
  <h1>{{t('setup.title')}}</h1>

  <DifficultyLevel/>
  <DepartmentSelection/>

  <button class="btn btn-primary btn-lg mt-4" @click="setupPrepareGame()">
    {{t('action.next')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import DepartmentSelection from '@/components/setup/DepartmentSelection.vue'
import BlockDonationCityRandomizer from '@/services/BlockDonationCityRandomizer'
import DepartmentSelectionRandomizer from '@/services/DepartmentSelectionRandomizer'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    DifficultyLevel,
    DepartmentSelection
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  methods: {
    setupPrepareGame() : void {
      this.state.resetGame()

      // prepare blocked donations and cities for solo play
      const blockRandomizer = new BlockDonationCityRandomizer(18)
      this.state.setup.blockedDonations = blockRandomizer.donationsDisks
      this.state.setup.blockedCities = blockRandomizer.cityDisks

      // prepare available departments
      const departmentRandomizer = new DepartmentSelectionRandomizer(16, this.state.setup.departmentSelectionType)
      this.state.setup.initialDepartments = departmentRandomizer.selected.map(dept => dept.id).sort()

      this.$router.push('/setupPrepareGame')
    }
  }
})
</script>
