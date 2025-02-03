<script lang="ts">
import {defineComponent} from 'vue'
import BaseButton, {ButtonMode} from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseSpinner from "@/components/BaseSpinner/BaseSpinner.vue";
import BaseDialog from "@/components/BaseDialog/BaseDialog.vue";

export enum SwitchMode {
  Login,
  Signup
}

export default defineComponent({
  name: "UserAuth",
  data() {
    return {
      email: {val: '', valid: true},
      password: {val: '', valid: true},
      isLoading: false,
      error: null,
      switchMode: SwitchMode.Login
    }
  },
  computed: {
    ButtonMode() {
      return ButtonMode
    },
    submitButtonCaption() {
      return this.switchMode === SwitchMode.Login ? 'Login' : 'Signup'
    },
    switchButtonCaption() {
      return this.switchMode === SwitchMode.Login ? 'Signup instead' : 'Login instead'
    }
  },
  components: {BaseDialog, BaseSpinner, BaseCard, BaseButton},
  methods: {
    verifyEmail() {
      this.email.valid = this.isEmailValid()
    },
    verifyPassword() {
      this.password.valid = this.isPasswordValid()
    },
    isEmailValid() {
      return this.email.val.length > 0 && this.email.val.includes('@')
    },
    isPasswordValid() {
      return this.password.val.length > 6
    },
    async onSubmitHandler() {
      this.verifyEmail()
      this.verifyPassword()
      if (!this.email.valid || !this.password.valid)
        return
      try {
        const payload = {email: this.email.val, password: this.password.val}
        this.isLoading = true
        if (this.switchMode === SwitchMode.Login)
          await this.$store.dispatch('auth/login', payload)
        else
          await this.$store.dispatch('auth/signup', payload)
        const redirect = '/' + this.$route.query.redirect
        if (redirect)
          this.$router.replace(redirect)
        else
          this.$router.replace({name: 'coaches'})
      } catch (e) {
        this.error = e.message || 'An error occurred during the authentication process'
      } finally {
        this.isLoading = false
      }
    },
    handleError() {
      this.error = null
    },
    switchModeHandler() {
      this.switchMode = this.switchMode === SwitchMode.Login ? SwitchMode.Signup : SwitchMode.Login
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
    <base-card v-else>
      <form>
        <div class="form-control">
          <label for="email">E-mail</label>
          <input @blur="verifyEmail" v-model.trim="email.val" id="email" type="email"
                 placeholder="Please enter your email">
          <span class="errors" v-show="!email.valid">Please enter a valid email</span>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input @blur="verifyPassword" v-model.trim="password.val" id="password" type="password"
                 placeholder="Please enter your password">
          <span class="errors" v-show="!password.valid">Please enter a valid password (must be at least 6 characters long)</span>
        </div>
        <base-button :mode="ButtonMode.Outline" type="submit" @click.prevent="onSubmitHandler">
          {{ submitButtonCaption }}
        </base-button>
        <base-button @click.prevent="switchModeHandler" type="button" :mode="ButtonMode.Flat">
          {{ switchButtonCaption }}
        </base-button>
      </form>
    </base-card>
  </div>
</template>

<style scoped>
form {
  margin: 1rem;
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

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}
</style>
