import {createStore} from "vuex";
import authModule from "@/store/auth";
import counterModule from "@/store/counter";


const store = createStore({
    modules: {
        counter: counterModule,
        auth: authModule
    }
});

export default store;