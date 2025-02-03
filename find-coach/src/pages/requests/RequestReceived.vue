<script lang="ts">
import {defineComponent} from 'vue'
import {mapGetters} from "vuex";
import BaseCard from "@/components/ui/BaseCard.vue";
import RequestItem from "@/components/requests/RequestItem.vue";
import {Request} from "@/store/requests/Request.ts";
import BaseSpinner from "@/components/BaseSpinner/BaseSpinner.vue";
import BaseDialog from "@/components/BaseDialog/BaseDialog.vue";

export default defineComponent({
  name: "RequestReceived",
  components: {BaseDialog, BaseSpinner, RequestItem, BaseCard},
  data() {
    return {
      error: null,
      isLoading: false
    }
  },
  async created() {
    try {
      if (!this.isAuthenticated)
        throw new Error('You need to login to view requests')
      this.isLoading = true
      await this.$store.dispatch('requests/fetchRequests', this.user)
    } catch (e) {
      this.error = e.message || 'An error occurred while loading requests'
    } finally {
      this.isLoading = false
    }
  },
  computed: {
    ...mapGetters('requests', ['requests', "hasRequests"]),
    ...mapGetters('auth', ['user', 'isAuthenticated']),
    Request() {
      return Request
    }
  },
  methods: {
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
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests">
        <request-item v-for="request in requests as Array<Request>"
                      :key="request.id"
                      :id="request.id"
                      :email="request.userEmail"
                      :message="request.message">
        </request-item>
      </ul>
      <h3 v-else>You haven't received any request yet!</h3>
    </base-card>
  </div>
</template>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
