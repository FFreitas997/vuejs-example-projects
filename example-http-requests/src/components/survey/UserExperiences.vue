<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button :disabled="loading" @click="loadResults">Load Submitted Experiences</base-button>
      </div>
      <p v-if="loading">Loading...</p>
      <p v-else-if="error">An error occurred: {{ error }}</p>
      <p v-else-if="!results || results.length <= 0">No stored experiences found.</p>
      <ul v-else>
        <survey-result
            v-for="result in results"
            :key="result.id"
            :name="result.name"
            :rating="result.rating"
        ></survey-result>
      </ul>


    </base-card>
  </section>
</template>

<script>
import SurveyResult from './SurveyResult.vue';

export default {
  components: {
    SurveyResult,
  },
  mounted() { this.loadResults() },
  data() {
    return {
      results: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async loadResults() {
      console.log('Loading results...');
      this.loading = true;
      try {
        let response = await fetch("https://vue-http-example-21ca0-default-rtdb.europe-west1.firebasedatabase.app/surveys.json");
        if (!response.ok) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error('Failed to fetch data:: Status ' + response.status + ' ' + response.statusText);
        }
        let data = await response.json();
        const results = [];
        for (let key in data) {
          const result = {
            id: key,
            name: data[key].name,
            rating: data[key].rating,
          };
          results.push(result);
        }
        this.results = results;
        console.log('Results loaded with ' + results.length + ' entries');
      } catch (error) {
        console.error(error);
        this.error = "Failed to load data: " + error.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

button :disabled {
  cursor: not-allowed;
  background-color: #ccc;
  color: #666;
}
</style>