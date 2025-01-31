import type {Coach} from "@/models/Coach.ts";
import type {CoachState} from "@/store/coach/index.ts";

export default {
  addCoach(state: CoachState, payload: Coach) {
    state.coaches.push(payload);
  },
  removeCoach(state: CoachState, payload: string) {
    const index = state.coaches.findIndex(coach => coach.id === payload);
    state.coaches.splice(index, 1);
  },
  setCoaches(state: CoachState, payload: Coach[]) {
    state.coaches = payload;
  },
  setFetchTimestamp(state: CoachState) {
    state.fetchTimestamp = new Date().getTime();
  }
}
