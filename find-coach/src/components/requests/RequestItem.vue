<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "RequestItem",
  props: {
    id: {type: String, required: true},
    email: {type: String, default: 'No email provided'},
    message: {type: String, default: 'No message provided'},
  },
  computed: {
    contactEmail(): string {
      return `mailto:${this.email}`
    }
  }
})
</script>

<template>
  <li>
    <div>
      <a :href="contactEmail">{{ email }}</a>
    </div>
    <p>{{ message }}</p>
  </li>
</template>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
