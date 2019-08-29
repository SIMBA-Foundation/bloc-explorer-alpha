import Vue from "vue";
import Router from "vue-router";

//routes
import defaultRoutes from "./default";

const LoadedCallback = () => import("Components/LoadedCallback/LoadedCallback");
const Started = () => import("Views/Started");

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        defaultRoutes,
        {
            path: "/callback",
            component: LoadedCallback
        },
        {
            path: "/started",
            component: Started,
            meta: {
                title: "Get Started",
                breadcrumb: "Home / Get Started"
            }
        }
    ]
});
