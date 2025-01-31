<script lang="ts">
import {defineComponent} from 'vue'
import BaseButton from "@/components/ui/BaseButton.vue";
import {Request} from "@/store/requests/Request.ts";
import BaseSpinner from "@/components/BaseSpinner/BaseSpinner.vue";
import BaseDialog from "@/components/BaseDialog/BaseDialog.vue";

export default defineComponent({
  name: "ContactCoach",
  components: {BaseDialog, BaseSpinner, BaseButton},
  data() {
    return {
      isLoading: false,
      error: null,
      email: {val: '', valid: true},
      message: {val: '', valid: true}
    }
  },
  methods: {
    verifyEmail() {
      this.email.valid = this.isEmailValid()
    },
    verifyMessage() {
      this.message.valid = this.isMessageValid()
    },
    isEmailValid() {
      return this.email.val.length > 0 && this.email.val.includes('@gmail.com')
    },
    isMessageValid() {
      return this.message.val.length > 0 && this.message.val.length < 100
    },
    async contactSubmit() {
      this.verifyEmail()
      this.verifyMessage()
      if (!this.email.valid || !this.message.valid)
        return
      const request = new Request(
        '',
        // @ts-ignore
        this.$route.params.id,
        this.email.val,
        this.message.val
      )
      try {
        this.isLoading = true
        await this.$store.dispatch('requests/contactCoach', request)
        this.$router.replace({name: 'requests'})
      } catch (e) {
        this.error = e.message || 'An error occurred while sending message'
      } finally {
        this.isLoading = false
      }
    },
    handleError() {
      this.error = null
    }
  }
})
</script>

<template>
  <div>
    <base-dialog title="An error occurred!" :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-spinner v-if="isLoading"></base-spinner>
    <form v-else>
      <div class="form-control">
        <label for="email">Your E-Mail</label>
        <input @blur="verifyEmail" v-model="email.val" type="email" id="email">
        <span v-show="!email.valid" class="errors">Please provide a valid email</span>
      </div>
      <div class="form-control">
        <label for="message">Your Message</label>
        <textarea @blur="verifyMessage" v-model="message.val" id="message" rows="5"></textarea>
        <span v-show="!message.valid" class="errors">Please provide a message</span>
      </div>
      <div class="actions">
        <base-button type="submit" @click.prevent="contactSubmit">Send Message</base-button>
      </div>
    </form>
  </div>
</template>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
