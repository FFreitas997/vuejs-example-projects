<script lang="ts">
import {defineComponent, type PropType} from 'vue'

export enum ButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit'
}

export enum ButtonMode {
  RAISED = 'raised',
  FLAT = 'flat'
}

export default defineComponent({
  name: "BaseButton",
  emits: ['clickButton'],
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: ButtonType.BUTTON
    },
    mode: {
      type: String as PropType<ButtonMode>,
      default: ButtonMode.RAISED
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<template>
  <button :disabled="disabled" :type="type" :class="mode" @click="$emit('clickButton')">
    <slot name="default"></slot>
  </button>
</template>

<style scoped>
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
}

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

.flat:hover,
.flat:active {
  background-color: #edd2ff;
}
</style>
