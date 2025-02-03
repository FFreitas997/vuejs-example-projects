<script lang="ts">
import {Coach} from "@/models/Coach";
import {mapActions, mapGetters} from "vuex";
import CoachItem from "@/components/coaches/CoachItem.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton, {ButtonMode} from "@/components/ui/BaseButton.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import BaseSpinner from "@/components/BaseSpinner/BaseSpinner.vue";
import BaseDialog from "@/components/BaseDialog/BaseDialog.vue";

export default {
  name: 'CoachList',
  components: {BaseDialog, BaseSpinner, CoachFilter, BaseButton, BaseCard, CoachItem},
  data() {
    return {
      isLoading: false,
      error: null,
      filters: ['frontend', 'backend', 'career']
    }
  },
  created() {
    this.isLoading = true;
    try {
      this.loadCoaches();
    } catch (e) {
      this.error = e.message || 'An error occurred while loading coaches';
    } finally {
      this.isLoading = false;
    }
  },
  computed: {
    ButtonMode() {
      return ButtonMode
    },
    ...mapGetters('coaches', ['coaches', 'hasCoaches']),
    ...mapGetters('auth', ['user', 'isAuthenticated']),
    filterCoaches(): Array<Coach> {
      return this.coaches.filter((coach: Coach) => {
        return this.filters.some((filter: string) => coach.areas.includes(filter))
      });
    },
    isCoachAuthenticatedUser(): boolean {
      return this.coaches.some((coach: Coach) => coach.id === this.user.userId);
    }
  },
  methods: {
    ...mapActions('coaches', ['loadCoaches']),
    searchCoachesByArea(filters: Array<string>): void {
      this.filters = filters;
    },
    handleError(): void {
      this.error = null;
    }
  }
}
</script>

<template>
  <div>
    <base-dialog title="An error occurred!" :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <coach-filter @change-filter="searchCoachesByArea"></coach-filter>
    <section>
      <base-card>
        <div class="controls">
          <base-button @click="loadCoaches(true)" :mode="ButtonMode.Outline">Refresh</base-button>
          <base-button v-show="!isAuthenticated" :link="true" :to="'/auth?redirect=register'">Login to Register as Coach</base-button>
          <base-button v-if="!isCoachAuthenticatedUser && !isLoading && isAuthenticated"
                       :link="true" :to="'/register'">
            Register as Coach
          </base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filterCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"></coach-item>
        </ul>
        <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
