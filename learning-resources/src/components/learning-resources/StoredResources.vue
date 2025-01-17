<script lang="ts">
import {defineComponent} from 'vue'
import LearningResources from "@/components/learning-resources/LearningResources.vue";
import BaseCard from "@/ui/BaseCard.vue";
import {Resource} from "@/models/learning-resources/Resource.ts";

export default defineComponent({
  name: "StoredResources",
  components: {BaseCard, LearningResources},
  inject: ['resources'],
  computed: {
    resourcesList(): Array<Resource> {
      return this.resources as Array<Resource>
    }
  }
})
</script>

<template>
  <ul>
    <li v-for="item in resourcesList" :key="item.id">
      <base-card #default>
        <learning-resources
          :resource-id="item.id"
          :resource-title="item.title"
          :resource-description="item.description"
          :resource-url="item.url"/>
      </base-card>
    </li>
  </ul>
</template>

<style scoped>

ul {
  list-style: none;
  padding: 0;
  margin: auto;
  max-width: 40rem;
}

li {
  margin: auto;
  max-width: 40rem;
}

</style>
