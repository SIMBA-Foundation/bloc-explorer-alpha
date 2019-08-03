import BoxedLayout from "Container/BoxedV2";

// Blockcloud Explorer components
const Home = () => import("Views/Home");
const Block = () => import("Views/blockchain/Block");
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
        },
        {
            component: Block,
            path: "/Blockchain/Block/:hash",
            meta: {
                title: "message.block",
                breadcrumb: "Home / Block"
            }
        }
    ]
};
