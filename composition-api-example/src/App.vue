<script setup lang="ts">
import {computed, onMounted, reactive, watch} from "vue";
import {User} from "@/models/User.ts";
import UserData from "@/components/UserData.vue";

const initialUser = new User('Maximilian', 'Freitas', 30);
// Any type of data: const user = ref<User>(initialUser);
// Object only: const user = reactive<User>(initialUser);
const user = reactive<User>(initialUser);
const fullName = computed(displayUserName);
watch(user, watchUser);

onMounted(() => (console.log('Component mounted')));

/*setTimeout(() => {
  //user.value = new User('Anna', 28);
  user.name = 'Anna';
  user.age = 28;
}, 2000);*/

function changeAgeHandler(event: Event, age?: number): void {
  event.preventDefault();
  user.age = age || user.age + 1;
}

/*function onChangeFirstName(event: Event): void {
  user.firstName = (event.target as HTMLInputElement).value;
}

function onChangeLastName(event: Event): void {
  user.lastName = (event.target as HTMLInputElement).value;
}*/

function displayUserName(): string {
  return `${user.firstName} ${user.lastName}`;
}

function watchUser(newValue: User, oldValue: User): void {
  console.log('User old:', oldValue);
  console.log('User new:', newValue);

}

function onClick(params: string): void {
  alert(params);
}

/**
 * Composition API features:
 *
 * - ref: for primitive types
 * - reactive: for objects
 * - computed: for computed properties
 * - watch: for watching changes
 * - lifecycle hooks: onMounted, onUpdated, onUnmounted // created or beforeCreated are not available because before setup
 * - provide/inject: for passing data between components
 * - template refs: for accessing DOM elements
 * - Create Components:
 *            - defineComponent: for creating components
 *            - defineAsyncComponent: for async components
 *            - defineProps: for defining props
 *            - defineEmits: for defining emits
 * - Teleport: for rendering content in a different place
 * - Suspense: for handling loading states
 * - v-model: for two-way binding
 * - Router:
 *        - useRouter: for accessing the router
 *        - useRoute: for accessing the current route
 *        - useLink: for creating links
 * - Vuex:
 *        - useStore: for accessing the store
 *        - mapState: for mapping state
 *        - mapGetters: for mapping getters
 *        - mapActions: for mapping actions
 *        - mapMutations: for mapping mutations
 */

</script>

<template>

  <section class="container">
    <h2>{{ fullName }}</h2>
    <h3>{{ user.age }}</h3>
    <button @click="args => changeAgeHandler(args, 70)">Change Age</button>
    <div>
<!--  <input @input="onChangeFirstName" id="firstname" type="text" placeholder="First Name" />
      <input @input="onChangeLastName" id="lastname" type="text" placeholder="Last Name" /> -->
      <input v-model="user.firstName" id="firstname" type="text" placeholder="First Name"/>
      <input v-model="user.lastName" id="lastname" type="text" placeholder="Last Name"/>
    </div>
    <user-data @submit="onClick" :age="user.age" :user-name="user.firstName"></user-data>
  </section>

</template>

<style scoped>

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}

</style>
