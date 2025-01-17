<script lang="ts">
import {defineComponent} from 'vue'
import BaseButton, {ButtonMode, ButtonType} from "@/ui/BaseButton.vue";

export default defineComponent({
  name: "LearningResources",
  inject: ['deleteResource'],
  computed: {
    ButtonType() {
      return ButtonType
    },
    ButtonMode() {
      return ButtonMode
    },
    delete() {
      return this.deleteResource as (id: string) => void
    }
  },
  components: {BaseButton},
  props: {
    resourceId: {
      type: String,
      required: true
    },
    resourceTitle: {
      type: String,
      required: true
    },
    resourceDescription: {
      type: String,
      required: true
    },
    resourceUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    onDelete(id: string) {
      this.delete(id)
    }
  }
})
</script>

<template>
  <div>
    <header>
      <h3>{{ resourceTitle }}</h3>
      <base-button @clickButton="onDelete(resourceId)" :mode="ButtonMode.FLAT" :type="ButtonType.BUTTON">
        <img src="@/assets/delete.svg" alt="Delete Resource">
      </base-button>
    </header>
  </div>
  <p>{{ resourceDescription }}</p>
  <nav>
    <a target="_blank" :href="resourceUrl">View Resource</a>
  </nav>
</template>

<style scoped>

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

p {
  margin: 0.5rem 0;
}

a {
  text-decoration: none;
  color: #ce5c00;
}

a:hover,
a:active {
  color: #c89300;
}

</style>
