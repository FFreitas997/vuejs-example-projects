<script>
export const RATING_POOR = 'poor';
export const RATING_AVERAGE = 'average';
export const RATING_GREAT = 'great';

export default {
  name: "RatingControl",
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    RatingPoor() {
      return RATING_POOR;
    },
    RatingAverage() {
      return RATING_AVERAGE;
    },
    RatingGreat() {
      return RATING_GREAT;
    }
  },
  methods: {
    setRating(rating) {
      this.$emit('update:modelValue', rating);
    }
  }
}
</script>

<template>
  <ul>
    <li :class="{active: modelValue === RatingPoor}">
      <button @click="setRating(RatingPoor)" type="button">Poor</button>
    </li>
    <li :class="{active: modelValue === RatingAverage}">
      <button @click="setRating(RatingAverage)" type="button">Average</button>
    </li>
    <li :class="{active: modelValue === RatingGreat}">
      <button @click="setRating(RatingGreat)" type="button">Great</button>
    </li>
  </ul>
</template>

<style scoped>
.active {
  border-color: #a00078;
}

.active button {
  color: #a00078;
}

ul {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
  display: flex;
}

li {
  margin: 0 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  font: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>