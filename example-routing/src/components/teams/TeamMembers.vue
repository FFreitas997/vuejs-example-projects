<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
          v-for="member in members"
          :key="member.id"
          :name="member.fullName"
          :role="member.role"
      ></user-item>
    </ul>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  components: {UserItem},
  inject: ['teams', 'users'],
  props: ['teamId'],
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  methods: {
    loadTeamMembers(teamId) {
      try {
        const selectedTeam = this.teams.find(team => team.id === teamId);
        if (!selectedTeam) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error('Team not found with id: ' + teamId);
        }
        this.teamName = selectedTeam.name;
        this.members = selectedTeam
            .members
            .map(memberId => this.users.find(user => user.id === memberId));
      } catch (e) {
        console.error(e);
      }
    }
  },
  created() {
    this.loadTeamMembers(this.teamId);
  },
  watch: {
    teamId(newID) {
      this.loadTeamMembers(newID);
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>