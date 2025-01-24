import actions from "@/store/auth/actions";
import getters from "@/store/auth/getters";
import mutations from "@/store/auth/mutations";

const authModule = {
    namespaced: true,
    state() {
        return {
            isLoggedIn: false
        }
    },
    actions: actions,
    getters: getters,
    mutations: mutations
}

export default authModule;