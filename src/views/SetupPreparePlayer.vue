<template>
  <h1>{{t('setupPreparePlayer.title')}}</h1>

  <ol>
    <li v-html="t('setupPreparePlayer.placeHousingDisk')"></li>    
    <li>
      <span v-html="t('setupPreparePlayer.pickDepartmentTileInfo')"></span><br/>
      <p v-if="department" class="mt-3">
        <AppIcon type="department" :name="department.id" extension="jpg" class="department-icon"
            :title="t(`department.${department.id}.title`)"
            data-bs-toggle="modal" data-bs-target="#departmentShopModal"/>
      </p>
      <button v-else class="btn btn-primary mt-2 mb-2" data-bs-toggle="modal" data-bs-target="#departmentShopModal">{{t('setupPreparePlayer.pickDepartmentTile')}}</button>
    </li>
    <li v-html="t('setupPreparePlayer.moveEmployees')"></li>
    <li v-html="t('setupPreparePlayer.activateEmployees')"></li>
  </ol>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()" v-if="department">
    {{t('action.startGame')}}
  </button>

  <DepartmentShop id="departmentShopModal" :departments="initialDepartments" :select="true" @selected="selectDepartment"/>

  <FooterButtons endGameButtonType="abortGame" backButtonRouteTo="/setupPrepareGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DepartmentShop from '@/components/structure/DepartmentShop.vue'
import Department from '@/services/Department'
import AppIcon from '@/components/structure/AppIcon.vue'
import CardDeck from '@/services/CardDeck'
import Timeline from '@/services/Timeline'
import removeDepartment from '@/util/removeDepartment'

export default defineComponent({
  name: 'SetupPreparePlayer',
  components: {
    FooterButtons,
    DepartmentShop,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      department: undefined as Department|undefined
    }
  },
  computed: {
    initialDepartments() : string[] {
      return (this.state.setup.initialDepartments ?? []) as string[]
    }
  },
  methods: {
    startGame() : void {
      // prepare 1st round
      if (this.department) {
        this.state.storeRound({
          round: 1,
          cardDeck: CardDeck.new(this.state.setup.difficultyLevel).toPersistence(),
          timeline: Timeline.new().toPersistence(),
          departments: removeDepartment(this.state.setup.initialDepartments, this.department.id),
          playerReserveDepartments: [this.department.id],
          playerDepartments: [],
          botDepartments: []
        })
        this.$router.push('/round/1/timelineSelection/player')
      }
    },
    selectDepartment(department : Department) : void {
      this.department = department
    }
  }
})
</script>

<style lang="scss" scoped>
ol > li {
  margin-top: 10px;
}

.department-icon {
  height: 130px;
  border-radius: 10px;
  border: 1px solid #888;
  filter: drop-shadow(#333 3px 3px 3px);
  cursor: pointer;
}
</style>
