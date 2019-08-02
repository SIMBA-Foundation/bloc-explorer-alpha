/**
 * Settings Module
 */
import { languages, sidebarFilters, routerAnimations, themes, headerFilters } from "./data";

const state = {
    darkMode: true, // dark mode
    collapseSidebar: false, // mini sidevar
    horizontalLayoutSidebar: false, // horizontal layout sidebar
    languages, // languages
    selectedLocale: languages[0], // selected locale
    sidebarFilters, // sidebar filters
    sidebarSelectedFilter: sidebarFilters[0], // selected sidebar filter
    routerAnimations, // router animations
    selectedRouterAnimation: routerAnimations[0], // selected router animation
    themes, // themes
    selectedTheme: themes[0], // selected theme
    activeHeaderFilter: headerFilters[1], // selected header filter
    headerFilters, // header filters
    mobileSearchForm: false // Is Mobile Search Form Open
};

// getters
const getters = {
    darkMode: state => {
        return state.darkMode;
    },
    collapseSidebar: state => {
        return state.collapseSidebar;
    },
    boxLayout: state => {
        return state.boxLayout;
    },
    horizontalLayoutSidebar: state => {
        return state.horizontalLayoutSidebar;
    },
    selectedLocale: state => {
        return state.selectedLocale;
    },
    languages: state => {
        return state.languages;
    },
    sidebarFilters: state => {
        return state.sidebarFilters;
    },
    sidebarSelectedFilter: state => {
        return state.sidebarSelectedFilter;
    },
    selectedRouterAnimation: state => {
        return state.selectedRouterAnimation;
    },
    routerAnimations: state => {
        return state.routerAnimations;
    },
    themes: state => {
        return state.themes;
    },
    selectedTheme: state => {
        return state.selectedTheme;
    },
    activeHeaderFilter: state => {
        return state.activeHeaderFilter;
    },
    headerFilters: state => {
        return state.headerFilters;
    },
    mobileSearchForm: state => {
        return state.mobileSearchForm;
    }
};

// actions
const actions = {
    darkModeHandler(context) {
        context.commit("darkModeHandler");
    },
    collapseSidebar(context) {
        context.commit("collapseSidebarHandler");
    },
    boxLayout(context) {
        context.commit("boxLayoutHandler");
    },
    changeLanguage(context, payload) {
        context.commit("changeLanguageHandler", payload);
    },
    changeSidebarFilter(context, payload) {
        context.commit("changeSidebarFilterHandler", payload);
    },
    changeRouterAnimation(context, payload) {
        context.commit("changeRouterAnimationHandler", payload);
    },
    changeTheme(context, payload) {
        context.commit("changeThemeHandler", payload);
    },
    toggleHorizontalLayoutSidebar(context, payload) {
        context.commit("toggleHorizontalLayoutSidebarHandler", payload);
    },
    changeHeaderFilter(context, payload) {
        context.commit("changeHeaderFilterHandler", payload);
    },
    toggleSearchForm(context) {
        context.commit("toggleSearchFormHandler");
    }
};

// mutations
const mutations = {
    darkModeHandler(state) {
        state.darkMode = !state.darkMode;
    },
    collapseSidebarHandler(state) {
        state.collapseSidebar = !state.collapseSidebar;
    },
    boxLayoutHandler(state) {
        state.boxLayout = !state.boxLayout;
    },
    changeSidebarFilterHandler(state, filter) {
        state.sidebarSelectedFilter = filter;
    },
    changeRouterAnimationHandler(state, animation) {
        state.selectedRouterAnimation = animation;
    },
    toggleHorizontalLayoutSidebarHandler(state, value) {
        state.horizontalLayoutSidebar = value;
    },
    changeThemeHandler(state, theme) {
        state.selectedTheme = theme;
    },
    changeHeaderFilterHandler(state, filter) {
        state.activeHeaderFilter = filter;
    },
    toggleSearchFormHandler(state) {
        state.mobileSearchForm = !state.mobileSearchForm;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
