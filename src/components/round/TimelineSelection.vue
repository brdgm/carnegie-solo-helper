<template>
  <div class="action" v-for="timelineAction of timelineActions" :key="timelineAction.action">
    <button class="btn"
        :class="{
          'btn-outline-primary':selectedAction && !(selectedAction==timelineAction.action),
          'btn-primary':selectedAction==timelineAction.action || !selectedAction
        }"        
        @click="selectAction(timelineAction.action)"
        :disabled="isReadOnly">
      <AppIcon type="action" :name="timelineAction.action" class="actionIcon"/>
    </button>

    <template v-for="(timelineEntry, index) of timelineAction.entries" :key="index">
      <div class="separator" v-if="index > 0">▸</div>
      <div class="entry">
        <template v-for="event of timelineEntry.events" :key="event">
          <div v-if="isTakeIncome(event) && timelineEntry.region" class="eventBackground income"
              :class="{
                selectable:isSelectable(timelineEntry),
                selected:isSelected(timelineEntry),
                inactive:isInactive(timelineEntry)
              }"
              :style="{'background-color':getRegionEventBackgroundColor(timelineEntry.region)}"
              @click="selectTimelineEntry(timelineEntry)">
            <AppIcon type="event" :name="event" class="eventIcon"/>
            <div class="region" :style="{'background-color':getRegionBackgroundColor(timelineEntry.region)}">{{timelineEntry.region}}</div>
          </div>
          <div v-else class="eventBackground donation"
              :class="{
                selectable:isSelectable(timelineEntry),
                selected:isSelected(timelineEntry),
                inactive:isInactive(timelineEntry)
              }"
              @click="selectTimelineEntry(timelineEntry)">
            <AppIcon type="event" :name="event" class="eventIcon"/>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Action from '@/services/enum/Action'
import TimelineAction from '@/services/TimelineAction'
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
    selected: (_action?: Action, _events?: Event[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  props: {
    timeline: {
      type: Timeline,
      required: true
    },
    preselectedAction: {
      type: String as PropType<Action>,
      required: false
    },
    readOnly: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      selectedAction: this.preselectedAction,
      selectedTimelineEntry: this.timeline.checkExecuteAction(this.preselectedAction)
    }
  },
  computed: {
    timelineActions() : readonly TimelineAction[] {
      if (this.selectedAction && !this.readOnly) {
        return this.timeline.actions.filter(item => item.action == this.selectedAction
            || item.entries.find(entry => entry.id == this.selectedTimelineEntry?.id))
      }
      else {
        return this.timeline.actions
      }
    },
    isReadOnly() : boolean {
      return this.readOnly || this.preselectedAction != undefined
    }
  },
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
      if (this.readOnly) {
        return
      }
      if (this.selectedAction == action) {
        this.selectedAction = undefined
        this.selectedTimelineEntry = undefined
      }
      else {
        this.selectedAction = action
        this.selectedTimelineEntry = this.timeline.checkExecuteAction(action)
      }
      this.$emit('selected', this.selectedAction, this.selectedTimelineEntry?.events)
    },
    isSelectable(timelineEntry : TimelineEntry) {
      return !this.isReadOnly && this.timeline.checkExecuteTimelineEntry(timelineEntry)
    },
    selectTimelineEntry(timelineEntry : TimelineEntry) {
      if (this.readOnly) {
        return
      }
      const action = this.timeline.checkExecuteTimelineEntry(timelineEntry)
      if (action) {
        this.selectAction(action)
      }
    },
    isSelected(timelineEntry : TimelineEntry) {
      if (this.readOnly) {
        return timelineEntry.active
      }
      else {
        return this.selectedTimelineEntry?.id == timelineEntry.id
      }
    },
    isInactive(timelineEntry : TimelineEntry) {
      if (this.readOnly) {
        return timelineEntry.executed && !timelineEntry.active
      }
      else {
        return timelineEntry.executed || (this.selectedTimelineEntry && !this.isSelected(timelineEntry))
      }
    }
  }
})
</script>

<style lang="scss" scoped>
$breakpoint-small: 800px;
$breakpoint-xsmall: 500px;
.action {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  .btn {
    width: 90px;
    height: 90px;
    margin-right: 15px;
    &.btn-outline-primary:not(:hover) {
      background-color: #fff;
    }
    @media (max-width: $breakpoint-small) {
      width: 55px;
      height: 55px;
      margin-right: 10px;
    }
    @media (max-width: $breakpoint-xsmall) {
      width: 50px;
      height: 50px;
      margin-right: 8px;
      margin-bottom: 5px;
    }
  }
  .actionIcon {
    width: 60px;
    @media (max-width: $breakpoint-small) {
      width: 30px;
    }
    @media (max-width: $breakpoint-xsmall) {
      width: 25px;
    }
  }
  @media (max-width: $breakpoint-small) {
    margin-bottom: 15px;
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
  @media (max-width: $breakpoint-small) {
    display: none;
  }
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
      @media (max-width: $breakpoint-small) {
        margin-left: -40px;
      }
      @media (max-width: $breakpoint-xsmall) {
        margin-left: -30px;
      }
    }
    &.selectable {
      cursor: pointer;
    }
    &.selected {      
      border: 6px solid #e86720;
      filter: drop-shadow(#e86720 4px 4px 3px);
    }
    &.inactive {
      opacity: 25%;
      filter: none;
    }
    @media (max-width: $breakpoint-small) {
      width: 60px;
      height: 60px;
      margin-right: 12px;
      margin-bottom: 10px;
    }
    @media (max-width: $breakpoint-xsmall) {
      width: 40px;
      height: 40px;
      margin-right: 12px;
      margin-bottom: 10px;
    }
  }
  .eventIcon {
    width: 35px;
    @media (max-width: $breakpoint-xsmall) {
      width: 25px;
    }
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
    @media (max-width: $breakpoint-small) {
      min-width: 55px;
    }
    @media (max-width: $breakpoint-xsmall) {
      min-width: 40px;
      font-size: 9px;
    }
  }
}
</style>
