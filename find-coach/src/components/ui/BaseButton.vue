<script lang="ts">
import {defineComponent, type PropType} from 'vue'

export enum ButtonMode {
  Flat = 'flat',
  Outline = 'outline'
}

export default defineComponent({
  name: "BaseButton",
  props: {
    mode: {type: String as PropType<ButtonMode>, default: ButtonMode.Flat},
    link: {type: Boolean, default: false},
    to: {type: String, default: '/'}
  }
})
</script>

<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to">
    <slot></slot>
  </router-link>
</template>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
