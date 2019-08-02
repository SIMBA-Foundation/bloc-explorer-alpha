import Vue from "vue";
import Vuex from "vuex";
// modules
import settings from "./modules/settings";
import blockchain from "./modules/blockchain";
import sidebar from "./modules/sidebar";
import socket from "./modules/socket";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        socket,
        settings,
        blockchain,
        sidebar
    }
});
