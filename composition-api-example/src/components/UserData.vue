<script setup lang="ts">
const props = defineProps({
  userName: {type: String, required: true},
  age: {type: Number, required: true}
});

const emit = defineEmits(['submit'])

function onClick(event: Event): void {
  event.preventDefault();
  console.log('Button clicked');
  emit('submit', 'Button clicked');
}
</script>

<template>
  <div>
    <h2> {{ userName }} </h2>
    <h3> {{ age }} </h3>
    <button @click="onClick">Click Here please!</button>
  </div>
</template>

<style scoped>

</style>
