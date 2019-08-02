import "babel-polyfill";
import Vue from "vue";
import Vuetify from "vuetify";
import VueBreadcrumbs from "vue2-breadcrumbs";
import VueResource from "vue-resource";
import velocity from "velocity-animate";
import Nprogress from "nprogress";
import VueI18n from "vue-i18n";
import fullscreen from "vue-fullscreen";
import VueNativeSock from "vue-native-websocket";

// global components
import GlobalComponents from "./globalComponents";

// app.vue
import App from "./App";

// router
import router from "./router";

// themes
import primaryTheme from "./themes/primaryTheme";

// store
import { store } from "./store/store";

// include script file
import "./lib/RockScript";

// include all css files
import "./lib/RockCss";

// messages
import messages from "./lang";
import serviceConfig from "./config";

router.beforeEach((to, from, next) => {
    Nprogress.start();
    if (to.path.toLocaleLowerCase() === "/home") {
        Vue.use(VueNativeSock, serviceConfig.ws_api, {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 3000,
            store: store
        });
    }
    next();
});

router.afterEach((to, from) => {
    Nprogress.done();
    setTimeout(() => {
        const contentWrapper = document.querySelector(".v-content__wrap");
        if (contentWrapper !== null) {
            contentWrapper.scrollTop = 0;
        }
        const boxedLayout = document.querySelector(".app-boxed-layout .app-content");
        if (boxedLayout !== null) {
            boxedLayout.scrollTop = 0;
        }
        const miniLayout = document.querySelector(".app-mini-layout .app-content");
        if (miniLayout !== null) {
            miniLayout.scrollTop = 0;
        }
    }, 200);
});

// plugins
Vue.use(Vuetify, {
    theme: store.getters.selectedTheme.theme
});
Vue.use(VueI18n);
Vue.use(VueResource);
Vue.use(VueBreadcrumbs);
Vue.use(fullscreen);
Vue.use(GlobalComponents);

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: store.getters.selectedLocale.locale, // set locale
    messages
});

new Vue({
    store,
    i18n,
    router,
    render: h => h(App),
    components: { App }
}).$mount("#app");
