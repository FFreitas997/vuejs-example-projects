<template>

  <Header :title="applicationName"/>

  <SwitchResources />

</template>

<script lang="ts">
import Header from "@/components/layout/Header.vue";
import SwitchResources from "@/components/learning-resources/SwitchResources.vue";

export default {
  components: {SwitchResources, Header},

  data() {
    return {applicationName: 'Remember Me'}
  }

}

</script>
