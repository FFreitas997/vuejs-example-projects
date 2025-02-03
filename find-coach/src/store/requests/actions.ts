import {v4 as uuidv4} from 'uuid';
import type {ActionContext} from "vuex";
import type {RequestsState} from "@/store/requests/index.ts";
import {Request} from "@/store/requests/Request.ts";
import type {User} from "@/store/auth/User.ts";

export default {
  async contactCoach(context: ActionContext<RequestsState, any>, payload: Request) {
    const request = new Request(
      uuidv4(),
      payload.coachId,
      payload.userEmail,
      payload.message
    )
    const response = await fetch(`https://find-coach-a805e-default-rtdb.europe-west1.firebasedatabase.app/requests/${request.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(request),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request!');
      console.error(error.message);
      throw error;
    }
    context.commit('addRequest', request);
  },

  async fetchRequests(context: ActionContext<RequestsState, any>, user: User) {
    if (!context.getters['shouldUpdate']) {
      return;
    }
    const response = await fetch(`https://find-coach-a805e-default-rtdb.europe-west1.firebasedatabase.app/requests/${user.userId}.json?auth=${user.token}`);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests!');
      console.error(error.message);
      throw error;
    }

    const requests = [];
    for (const key in responseData) {
      const request = new Request(
        responseData[key].id,
        responseData[key].coachId,
        responseData[key].userEmail,
        responseData[key].message
      );
      requests.push(request);
    }
    context.commit('setRequests', requests);
    context.commit('setFetchTimestamp');
  }
}
