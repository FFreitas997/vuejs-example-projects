<script lang="ts">
import {defineComponent} from 'vue'
import BaseCard from "@/components/ui/BaseCard.vue";

export default defineComponent({
  name: "CoachFilter",
  components: {BaseCard},
  emits: ['changeFilter'],
  data() {
    return {
      filters: ['frontend', 'backend', 'career']
    }
  },
})
</script>

<template>
  <base-card>
    <h2>Find your Coach</h2>
    <span class="filter-option">
      <input id="frontend" name="frontend" value="frontend" type="checkbox" v-model="filters"
             @change="$emit('changeFilter', filters)" checked>
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input id="backend" name="backend" value="backend" type="checkbox" v-model="filters"
             @change="$emit('changeFilter', filters)" checked>
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input id="career" name="career" value="career" type="checkbox" v-model="filters"
             @change="$emit('changeFilter', filters)" checked>
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
