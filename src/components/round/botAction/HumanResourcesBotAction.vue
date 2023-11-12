<script lang="ts">
import { defineComponent } from 'vue'
import BotActions from '@/services/BotActions'

export default defineComponent({
  name: 'HumanResourcesBotAction',
  props: {
    botActions: {
      type: BotActions,
      required: true
    }
  }
})
</script>
