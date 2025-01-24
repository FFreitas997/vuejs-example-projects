<script>
import {mapGetters} from "vuex";

export default {
  name: "CounterDisplay",
  computed: {
    ...mapGetters('counter', ['finalCounter']),
    counter() {
      //return this.$store.state.counter;
      //return this.$store.getters.finalCounter;
    },
  },
}
</script>

<template>
  <h3>{{ finalCounter }}</h3>
</template>

