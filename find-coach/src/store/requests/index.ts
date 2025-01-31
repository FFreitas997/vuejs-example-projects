import type {Module} from "vuex";
import mutations from "@/store/requests/mutations.ts";
import actions from "@/store/requests/actions.ts";
import getters from "@/store/requests/getters.ts";
import type {Request} from "@/store/requests/Request.ts";

const requestsModule: Module<RequestsState, any> = {
  namespaced: true,
  state() {
    return {
      requests: [],
      fetchTimestamp: 0
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters
}

export default requestsModule;

export interface RequestsState {
  requests: Request[];
  fetchTimestamp: number;
}

