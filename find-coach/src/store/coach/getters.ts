import type {CoachState} from "@/store/coach/index.ts";

export default {
  coaches(state: CoachState) {
    return state.coaches;
  },

  hasCoaches(state: CoachState) {
    return state.coaches && state.coaches.length > 0;
  },
  shouldUpdate(state: CoachState) {
    const lastFetch = state.fetchTimestamp;
    if (!lastFetch) {
      return true;
    }
    const currentTimestamp = new Date().getTime();
    return (currentTimestamp - lastFetch) / 1000 > 60;
  }
}
