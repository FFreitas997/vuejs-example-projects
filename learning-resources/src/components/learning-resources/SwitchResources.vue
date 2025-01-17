<script lang="ts">
import {defineComponent} from 'vue'
import BaseButton, {ButtonMode} from "@/ui/BaseButton.vue";
import BaseCard from "@/ui/BaseCard.vue";
import StoredResources from './StoredResources.vue';
import CreateResource from "@/components/learning-resources/CreateResource.vue";
import {storedResources} from "@/models/learning-resources/StoredResources.ts";
import {Resource} from "@/models/learning-resources/Resource.ts";
import {v4 as uuidv4} from "uuid";

export enum ResourceView {
  StoredResources = 'stored-resources',
  CreateResource = 'create-resource'
}


export default defineComponent({
  name: "SwitchResources",
  components: {BaseCard, BaseButton, StoredResources, CreateResource},
  data() {
    return {
      currentView: ResourceView.StoredResources,
      resource: storedResources
    }
  },
  computed: {
    ButtonMode() {
      return ButtonMode
    },
    ResourceView() {
      return ResourceView
    },
    storedResButtonMode() {
      return this.currentView === ResourceView.StoredResources ? ButtonMode.RAISED : ButtonMode.FLAT
    },
    createdResButtonMode() {
      return this.currentView === ResourceView.CreateResource ? ButtonMode.RAISED : ButtonMode.FLAT
    }
  },
  provide() {
    return {
      resources: this.resource,
      createResource: this.createResource,
      deleteResource: this.deleteResource
    }
  },
  methods: {
    setView(view: ResourceView) {
      this.currentView = view
    },
    createResource(title: string, description: string, url: string) {
      const resource = new Resource(uuidv4(), title, description, url)
      this.resource.unshift(resource)
      this.setView(ResourceView.StoredResources)
    },
    deleteResource(id: string) {
      const resourceIndex = this.resource.findIndex(resource => resource.id === id)
      this.resource.splice(resourceIndex, 1)
    }
  }

})
</script>

<template>
  <base-card>
    <base-button :mode="storedResButtonMode" @clickButton="setView(ResourceView.StoredResources)">Stored Resources
    </base-button>
    <base-button :mode="createdResButtonMode" @clickButton="setView(ResourceView.CreateResource)">Create Resource
    </base-button>
  </base-card>
  <keep-alive>
    <component :is="currentView.valueOf()"></component>
  </keep-alive>
</template>
