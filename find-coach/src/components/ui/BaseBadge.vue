<script lang="ts">
import {defineComponent, type PropType} from 'vue'

export enum BadgeType {
  Frontend = 'frontend',
  Backend = 'backend',
  Career = 'career'
}

export default defineComponent({
  name: "BaseBadge",
  props: {
    badgeType: {type: String as PropType<BadgeType>, default: BadgeType.Frontend},
    text: {type: String, default: ''}
  },
  computed: {
    upperCaseText(): string {
      return this.text.toUpperCase()
    }
  }
})
</script>

<template>
  <span class="badge" :class="badgeType">
    {{ upperCaseText }}
  </span>
</template>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.frontend {
  background-color: #3d008d;
  color: white;
}

.backend {
  background-color: #71008d;
  color: white;
}

.career {
  background-color: #8d006e;
  color: white;
}
</style>
