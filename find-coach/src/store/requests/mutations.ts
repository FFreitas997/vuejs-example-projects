import type {RequestsState} from "@/store/requests/index.ts";
import type {Request} from "@/store/requests/Request.ts";

export default {
  addRequest(state: RequestsState, payload: Request) {
    state.requests.push(payload);
  },
  setRequests(state: RequestsState, payload: Array<Request>) {
    state.requests = payload;
  },
  removeRequest(state: RequestsState, payload: string) {
    const index = state.requests.findIndex((request) => request.id === payload);
    state.requests.splice(index, 1);
  },
  setFetchTimestamp(state: RequestsState) {
    state.fetchTimestamp = new Date().getTime();
  }
}
