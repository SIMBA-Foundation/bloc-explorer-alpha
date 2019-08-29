/**
 * Sidebar Module
 */

import { menus } from "./data.js";

const state = {
    menus
};

const getters = {
    menus: state => {
        return state.menus;
    }
};

const actions = {
    setActiveMenuGroup(context, payload) {
        context.commit("setActiveMenuGroupHandler", payload);
    }
};

const mutations = {
    setActiveMenuGroupHandler(state, router) {
        let fullPath = router.history.current.fullPath;
        let matchedPath = fullPath;
        for (const category in state.menus) {
            if (state.menus[category].items !== null) {
                for (const matched in state.menus[category].items) {
                    if (
                        state.menus[category].items[matched].path ==
                            matchedPath ||
                        state.menus[category].items[matched].path == fullPath
                    ) {
                        state.menus[category].active = true;
                        state.menus[category].items[matched].active = true;
                    }
                }
            } else {
                if (state.menus[category].path == matchedPath) {
                    state.menus[category].active = true;
                }
            }
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
