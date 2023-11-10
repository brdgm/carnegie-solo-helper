<template>
  <div class="donations">
    <div class="donation-column" v-for="column of 4" :key="column">
      <div class="donation-row" v-for="row of 5" :key="row">
        <div class="icon-box">
          <AppIcon type="donation" :name="donationGroups[column-1][row-1]" class="icon"/>
        </div>
        <div class="disk-box">
          <AppIcon v-if="isBlocked(donationGroups[column-1][row-1])" name="block-disk" class="icon"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import AppIcon from '@/components/structure/AppIcon.vue'
import Donation from '@/services/enum/Donation'
import getDonationMetadata from '@/util/getDonationMetadata'

export default defineComponent({
  name: 'BlockedDonations',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    donationGroups() : Donation[][] {
      const result : Donation[][] = [[],[],[],[]]
      const donations = Object.values(Donation)
      donations.forEach(donation => {
        const metadata = getDonationMetadata(donation)
        result[metadata.column-1][metadata.row-1] = donation
      })
      return result
    }
  },
  methods: {
    isBlocked(donation : Donation) {
      return this.state.setup.blockedDonations?.includes(donation)
    }
  }
})
</script>

<style lang="scss" scoped>
.donation-column {
  display: inline-block;
  margin-top: 5px;
}
.donation-row {
  display: flex;
  align-items: center;
  justify-content: end;
  background-image: url('@/assets/donation-slot.jpg');
  background-size: cover;
  width: 136px;
  height: 43px;
}
.icon-box {
  display: inline-block;
  .icon {
    height: 30px;
  }
}
.disk-box {
  display: inline-block;
  width: 50px;
  .icon {
    height: 40px;
    margin-left: 9px;
  }
}
</style>
