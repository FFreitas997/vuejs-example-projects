<template>
  <base-container title="Vuex">
    <counter-display></counter-display>
    <button @click="increase({value: 5})">Increment 5</button>
    <button @click="decrease({value: 5})">Decrement 5</button>
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import CounterDisplay from "@/components/CounterDisplay.vue";
import {mapActions} from "vuex";

export default {
  components: {CounterDisplay, BaseContainer},
  methods: {
    ...mapActions('counter', ['increase', 'decrease']),
    incrementCounter() {
      //this.$store.commit('increment');
      //this.$store.commit('increase', {value: 5});
      //this.$store.dispatch('increase', {value: 5});
    },
    decrementCounter() {
      //this.$store.commit('decrement');
      //this.$store.commit('increase', {value: -5});
      //this.$store.dispatch('decrease', {value: 5});
    }
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>