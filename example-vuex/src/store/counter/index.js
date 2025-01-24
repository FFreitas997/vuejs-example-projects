import getters from "@/store/counter/getters";
import mutations from "@/store/counter/mutations";
import actions from "@/store/counter/actions";

const counterModule = {
    namespaced: true,
    state() {
        return {
            counter: 0
        }
    },
    getters: getters,
    mutations: mutations,
    actions: actions
}

export default counterModule;