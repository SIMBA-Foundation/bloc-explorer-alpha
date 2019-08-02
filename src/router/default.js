import BoxedLayout from "Container/BoxedV2";

// Blockcloud Explorer components
const Home = () => import("Views/Home");
export default {
    path: "/",
    component: BoxedLayout,
    redirect: "/Home",
    children: [
        {
            component: Home,
            path: "/Home",
            meta: {
                requiresAuth: true,
                title: "message.home",
                breadcrumb: "Home"
            }
        }
    ]
};
