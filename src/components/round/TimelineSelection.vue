<template>
  <div class="action" v-for="timelineAction of timeline.actions" :key="timelineAction.action">
    <button class="btn" :class="{'btn-outline-primary':!(selectedAction==timelineAction.action), 'btn-primary':selectedAction==timelineAction.action}"
        @click="selectAction(timelineAction.action)">
      <AppIcon type="action" :name="timelineAction.action" class="actionIcon"/>
    </button>

    <template v-for="(timelineEntry, index) of timelineAction.entries" :key="index">
      <div class="separator" v-if="index > 0">▸</div>
      <div class="entry">
        <template v-for="event of timelineEntry.events" :key="event">
          <div v-if="isTakeIncome(event) && timelineEntry.region" class="eventBackground income"
              :class="{selected:isSelected(timelineEntry),inactive:timelineEntry.executed || selectedTimelineEntry && !isSelected(timelineEntry)}"
              :style="{'background-color':getRegionEventBackgroundColor(timelineEntry.region)}">
            <AppIcon type="event" :name="event" class="eventIcon"/>
            <div class="region" :style="{'background-color':getRegionBackgroundColor(timelineEntry.region)}">{{timelineEntry.region}}</div>
          </div>
          <div v-else class="eventBackground donation"
              :class="{selected:isSelected(timelineEntry),inactive:timelineEntry.executed || selectedTimelineEntry && !isSelected(timelineEntry)}">
            <AppIcon type="event" :name="event" class="eventIcon"/>
          </div>
        </template>
      </div>
    </template>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Action from '@/services/enum/Action'
import TimelineEntry from '@/services/TimelineEntry'
import Timeline from '@/services/Timeline'
import AppIcon from '@/components/structure/AppIcon.vue'
import Region from '@/services/enum/Region'
import Event from '@/services/enum/Event'
import getRegionMetadata from '@/util/getRegionMetadata'

export default defineComponent({
  name: 'TimelineSelection',
  components: {
    AppIcon
  },
  emits: {
    selected: (_action: Action) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  props: {
    timeline: {
      type: Timeline,
      required: true
    }
  },
  data() {
    return {
      selectedAction: undefined as Action|undefined,
      selectedTimelineEntry: undefined as TimelineEntry|undefined
    }
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  /*
  computed: {
    timelineActions() : readonly TimelineAction[] {
      if (this.selectedAction) {
        return this.timeline.actions.filter(item => item.action == this.selectedAction
            || item.entries.find(entry => entry.id == this.selectedTimelineEntry?.id))
      }
      else {
        return this.timeline.actions
      }
    }
  },
  */
  methods: {
    getRegionBackgroundColor(region : Region) {
      return getRegionMetadata(region).backgroundColor
    },
    getRegionBorderColor(region : Region) {
      return getRegionMetadata(region).borderColor
    },
    getRegionEventBackgroundColor(region : Region) {
      return getRegionMetadata(region).eventBackgroundColor
    },
    isTakeIncome(event : Event) {
      return event == Event.TAKE_INCOME
    },
    selectAction(action : Action) {
      this.selectedAction = action
      this.selectedTimelineEntry = this.timeline.checkExecute(action)
      if (this.selectAction != undefined) {
        this.$emit('selected', this.selectedAction)
      }
    },
    isSelected(timelineEntry : TimelineEntry) {
      return this.selectedTimelineEntry?.id == timelineEntry.id
    }
  }
})
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  align-items: center;
  margin-top: 10px;
  .btn {
    width: 90px;
    height: 90px;
    margin-right: 15px;
    &.btn-outline-primary:not(:hover) {
      background-color: #fff;
    }
  }
  .actionIcon {
    width: 60px;
  }
}
.separator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  color: #e86720;
  font-size: 30px;
  font-weight: bold;
}
.entry {
  display: inline-flex;
  .eventBackground {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    z-index: 50;
    filter: drop-shadow(#666 3px 3px 3px);
    &.donation {
      background-color: #f3eada;
    }
    &:nth-child(2) {
      margin-left: -15px;
      z-index: 40;
    }
    &.selected {      
      border: 5px solid #e86720;
      filter: drop-shadow(#e86720 3px 3px 3px);
    }
    &.inactive {
      opacity: 25%;
      filter: none;
    }
  }
  .eventIcon {
    width: 35px;    
  }
  .income .eventIcon {
    margin-top: 8px;
  }
  .region {
    text-transform: uppercase;
    padding: 1px;
    min-width: 65px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    margin-top: 4px;
  }
}
</style>
