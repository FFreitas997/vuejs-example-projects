<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Header",
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<template>
  <header :title="title">
    <h1>{{title}}</h1>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #640032;
  display: flex;
  justify-content: center;
  align-items: center;
}

header h1 {
  color: white;
  margin: 0;
}
</style>
