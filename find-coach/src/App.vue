<script lang="ts">

import AppHeader from "@/components/layout/AppHeader.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {CoachFilter, AppHeader},
  computed: {
    ...mapGetters('auth', ['hasAutoLogout'])
  },
  created() {
    console.log('App created');
    this.$store.dispatch('auth/tryLogin');
  },
  watch: {
    hasAutoLogout(current, oldValue) {
      if (current && current !== oldValue)
        this.$router.replace('/auth');
    }
  }
}

</script>

<template>
  <app-header></app-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
