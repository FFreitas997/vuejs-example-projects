<script lang="ts">
import {defineComponent} from 'vue'
import BaseCard from "@/components/ui/BaseCard.vue";
import CoachForm from "@/components/coaches/CoachForm.vue";
import {Coach} from "@/models/Coach.ts";
import {mapGetters} from "vuex";
import BaseSpinner from "@/components/BaseSpinner/BaseSpinner.vue";
import BaseDialog from "@/components/BaseDialog/BaseDialog.vue";

export default defineComponent({
  name: "CoachRegistration",
  components: {BaseDialog, BaseSpinner, CoachForm, BaseCard},
  data() {
    return {error: null, isLoading: false}
  },
  computed: {
    ...mapGetters('auth', ['user', "isAuthenticated"])
  },
  methods: {
    async registerCoach(coach: Coach) {
      try {
        if (!this.isAuthenticated)
          throw new Error('You need to login to register as a coach')
        this.isLoading = true
        await this.$store.dispatch('coaches/registerCoach', {coach: coach, user: this.user})
        this.$router.replace({name: 'coaches'})
      } catch (e) {
        this.error = e.message || 'An error occurred while registering coach'
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
    <base-card v-else>
      <h2>Register as a coach now !</h2>
      <coach-form @register="registerCoach"></coach-form>
    </base-card>
  </div>
</template>
