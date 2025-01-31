<script lang="ts">
import {defineComponent} from 'vue'
import BaseCard from "@/components/ui/BaseCard.vue";

export default defineComponent({
  name: "NotFound",
  components: {BaseCard}
})
</script>

<template>
  <div>
    <base-card>
      <h2>Page not found!</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
    </base-card>
  </div>
</template>
