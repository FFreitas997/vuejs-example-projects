import type {RequestsState} from "@/store/requests/index.ts";
import type {Request} from "@/store/requests/Request.ts";

export default {
  requests(state: RequestsState): Array<Request> {
    return state.requests;
  },
  hasRequests(state: RequestsState): boolean {
    return state.requests.length > 0;
  },
  shouldUpdate(state: RequestsState): boolean {
    const lastFetch = state.fetchTimestamp;
    if (!lastFetch) {
      return true;
    }
    const currentTimestamp = new Date().getTime();
    return (currentTimestamp - lastFetch) / 1000 > 60;
  }
}
