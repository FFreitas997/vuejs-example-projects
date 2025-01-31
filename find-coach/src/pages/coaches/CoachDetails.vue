<script lang="ts">
import {defineComponent} from 'vue'
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge, {BadgeType} from "@/components/ui/BaseBadge.vue";
import {Coach} from "@/models/Coach.ts";

export default defineComponent({
  name: "CoachDetails",
  props: ['id'],
  components: {BaseBadge, BaseButton, BaseCard},
  data() {
    return {
      selected: new Coach('', '', '', [], '', -1),
      fullName: '',
      description: '',
      areas: [''],
      rate: -1
    }
  },
  created() {
    this.selected = this.$store
      .getters['coaches/coaches']
      .find((coach: Coach) => coach.id === this.id) as Coach
    this.fullName = this.selected.fullName()
    this.description = this.selected.description
    this.areas = this.selected.areas
    this.rate = this.selected.hourlyRate
  },
  computed: {
    contactLink(): string {
      return `/coaches/${this.id}/contact`
    },
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
})
</script>

<template>
  <div>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button :link="true" :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
    <base-card>
      <base-badge v-for="area in areas" :key="area" :badge-type="badgeTypeFromArea(area)"
                  :text="area"></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </div>
</template>
