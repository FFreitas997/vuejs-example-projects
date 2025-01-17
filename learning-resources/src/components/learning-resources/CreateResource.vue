<script lang="ts">
import {defineComponent} from 'vue'
import BaseCard from "@/ui/BaseCard.vue";
import BaseButton, {ButtonType} from "@/ui/BaseButton.vue";
import BaseDialog from "@/ui/BaseDialog.vue";

export default defineComponent({
  name: "CreateResource",
  components: {BaseDialog, BaseButton, BaseCard},
  data() {
    return {
      inputInvalid: false
    }
  },
  inject: ['createResource'],
  computed: {
    ButtonType() {
      return ButtonType
    },
    result() {
      return this.createResource as (title: string, description: string, link: string) => void
    }
  },

  methods: {
    onConfirmInvalid () {
      this.inputInvalid = false
    },
    onSubmit() {
      const title = this.$refs.titleInput as HTMLInputElement
      const description = this.$refs.descInput as HTMLTextAreaElement
      const link = this.$refs.linkInput as HTMLInputElement
      if (title.value.trim() === '' || description.value.trim() === '' || link.value.trim() === '') {
        this.inputInvalid = true
        return
      }
      this.result(title.value.trim(), description.value.trim(), link.value.trim())
    }
  }
})
</script>

<template>

  <base-dialog @close="onConfirmInvalid" v-if="inputInvalid" title="Invalid Input">
    <template #content>
      <p>Unfortunately, at least one input value is invalid</p>
      <p>Please check all inputs and make sure you enter everything</p>
    </template>
    <template #actions>
      <base-button @clickButton="onConfirmInvalid">Okay</base-button>
    </template>
  </base-dialog>

  <base-card>
    <form @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="title">Title</label>
        <input ref="titleInput" id="title" name="title" type="text">
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea ref="descInput" id="description" name="description" rows="3"/>
      </div>
      <div class="form-control">
        <label for="link">Link</label>
        <input ref="linkInput" id="link" name="link" type="url"/>
      </div>
      <div>
        <base-button :type="ButtonType.SUBMIT">Create Resource</base-button>
      </div>
    </form>
  </base-card>
</template>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>
