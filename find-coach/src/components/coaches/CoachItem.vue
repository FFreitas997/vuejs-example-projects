<script lang="ts">
import {defineComponent} from 'vue'
import BaseButton, {ButtonMode} from "@/components/ui/BaseButton.vue";
import BaseBadge, {BadgeType} from "@/components/ui/BaseBadge.vue";

export default defineComponent({
  name: "CoachItem",
  components: {BaseBadge, BaseButton},
  props: {
    id: String,
    firstName: String,
    lastName: String,
    areas: Array<string>,
    rate: Number,
  },
  methods: {
    badgeTypeFromArea(area: string): BadgeType {
      switch (area) {
        case 'frontend':
          return BadgeType.Frontend
        case 'backend':
          return BadgeType.Backend
        case 'career':
          return BadgeType.Career
        default:
          return BadgeType.Frontend
      }
    }
  },
  computed: {
    ButtonMode() {
      return ButtonMode
    },

    contactLink(): string {
      return `/coaches/${this.id}/contact`
    },
    detailsLink(): string {
      return `/coaches/${this.id}`
    },
    fullName(): string {
      return `${this.firstName} ${this.lastName}`
    }
  }
})
</script>

<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :badge-type="badgeTypeFromArea(area)"
        :text="area"
        :key="area"></base-badge>
    </div>
    <div class="actions">
      <base-button :mode="ButtonMode.Outline" :link="true" :to="contactLink">Contact</base-button>
      <base-button :link="true" :to="detailsLink">View Details</base-button>
    </div>
  </li>
</template>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
