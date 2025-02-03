import {Coach} from "@/models/Coach.ts";
import type {ActionContext} from "vuex";
import type {CoachState} from "@/store/coach/index.ts";
import {v4 as uuidv4} from 'uuid';
import type {User} from "@/store/auth/User.ts";

export default {

  async registerCoach(context: ActionContext<CoachState, any>, data: {
    coach: Coach,
    user: User
  }) {
    const coach = new Coach(
      uuidv4(),
      data.coach.firstName,
      data.coach.lastName,
      data.coach.areas,
      data.coach.description,
      data.coach.hourlyRate
    );
    const response = await fetch(`https://find-coach-a805e-default-rtdb.europe-west1.firebasedatabase.app/coaches/${data.user.userId}.json?auth=${data.user.token}`, {
      method: 'PUT',
      body: JSON.stringify(coach),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      console.error(error.message);
      throw error;
    }
    context.commit('addCoach', coach);
  },

  async loadCoaches(context: ActionContext<CoachState, any>, forceRefresh: boolean) {
    if (!context.getters['shouldUpdate'] && !forceRefresh) {
      return;
    }
    const response = await fetch(`https://find-coach-a805e-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`);
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      console.error(error.message);
      throw error;
    }
    const coaches = []
    for (const key in responseData) {
      const coach = new Coach(
        responseData[key].id,
        responseData[key].firstName,
        responseData[key].lastName,
        responseData[key].areas,
        responseData[key].description,
        responseData[key].hourlyRate
      );
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
}
