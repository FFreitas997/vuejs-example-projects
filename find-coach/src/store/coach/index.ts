import type {Module} from "vuex";
import mutations from "@/store/coach/mutations.ts";
import actions from "@/store/coach/actions.ts";
import getters from "@/store/coach/getters.ts";
import {Coach} from "@/models/Coach.ts";

const coachModule: Module<CoachState, any> = {
  namespaced: true,
  state() {
    return {
      coaches: [],
      fetchTimestamp: 0
    }
  },
  mutations: mutations,
  actions: actions,
  getters: getters
}

export default coachModule

export interface CoachState {
  coaches: Coach[];
  fetchTimestamp: number;
}

/*const dummyData: Coach[] = [
  new Coach('c1', 'Maximilian', 'Schwarzmüller', ['frontend', 'backend', 'career'], "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!", 30),
  new Coach('c2', 'Julie', 'Jones', ['frontend', 'career'], "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.", 30)
]*/
