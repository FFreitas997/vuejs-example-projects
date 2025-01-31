import {createStore} from "vuex";
import coachModule from "@/store/coach";
import requestsModule from "@/store/requests";
import authModule from "@/store/auth";

const store = createStore({
  modules: {
    coaches: coachModule,
    requests: requestsModule,
    auth: authModule
  }
})


export default store;
