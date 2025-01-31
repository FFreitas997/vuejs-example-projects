import type {AuthState} from "@/store/auth/index.ts";
import type {User} from "@/store/auth/User.ts";

export default {
  setUser(state: AuthState, payload: User) {
    state.user = payload;
  }
}
