import type {AuthState} from "@/store/auth/index.ts";

export default {
  user(state: AuthState) {
    return state.user;
  },
  isAuthenticated(state: AuthState) {
    return state.user !== null;
  },
  hasAutoLogout(state: AuthState) {
    return state.hasAutoLogout;
  }
}
