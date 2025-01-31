import type {Module} from 'vuex'
import getters from "@/store/auth/getters.ts";
import mutations from "@/store/auth/mutations.ts";
import actions from "@/store/auth/actions.ts";
import type {User} from "@/store/auth/User.ts";

const authModule: Module<AuthState, any> = {
  namespaced: true,
  state() {
    return {
      user: null,
    }
  },
  getters: getters,
  mutations: mutations,
  actions: actions
}

export default authModule

export interface AuthState {
  user: User | null;
}
