import type {ActionContext} from "vuex";
import type {AuthState} from "@/store/auth/index.ts";
import {User} from "@/store/auth/User.ts";

let timer: any;

export default {

  async login(context: ActionContext<AuthState, any>, payload: {
    email: string,
    password: string
  }) {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
      console.error(error.message);
      throw error;
    }

    const expireIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expireIn;

    const user = new User(responseData.localId, responseData.idToken, responseData.email, expirationDate, responseData.refreshToken);
    context.commit('setUser', user);

    localStorage.setItem('user', JSON.stringify(user));

    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expireIn);
  },

  async signup(context: ActionContext<AuthState, any>, payload: {
    email: string,
    password: string
  }) {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
      console.error(error.message);
      throw error;
    }

    const expireIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expireIn;

    const user = new User(responseData.localId, responseData.idToken, responseData.email, expirationDate, responseData.refreshToken);
    context.commit('setUser', user);

    localStorage.setItem('user', JSON.stringify(user));

    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expireIn);
  },

  tryLogin(context: ActionContext<AuthState, any>): boolean {
    const userData = localStorage.getItem('user');
    if (!userData)
      return false;

    const user = JSON.parse(userData) as User;
    context.commit('setUser', user);

    const expireIn = user.expiration - new Date().getTime();
    if (expireIn < 0) {
      context.dispatch('logout');
      return false;
    }

    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expireIn);

    return true;
  },

  logout(context: ActionContext<AuthState, any>) {
    if (localStorage.getItem('user') === null)
      localStorage.removeItem('user');
    if (timer)
      clearTimeout(timer);
    context.commit('setUser', null);
  },

  autoLogout(context: ActionContext<AuthState, any>) {
    context.dispatch('logout');
    context.commit('setAutoLogout', true);
  }
}
