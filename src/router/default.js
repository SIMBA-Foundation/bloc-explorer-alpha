import BoxedLayout from "Container/BoxedV2";

// Blockcloud Explorer components
const Home = () => import("Views/Home");
const Block = () => import("Views/blockchain/Block");
const AllBlocks = () => import("Views/blockchain/Allblocks");
const Transaction = () => import("Views/blockchain/Transaction");
const AllTransactions = () => import("Views/blockchain/AllTransactions");
const Levels = () => import("Views/blockchain/Levels");
const Address = () => import("Views/blockchain/Address");
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
        },
        {
            component: AllBlocks,
            path: "/Blockchain/blocks",
            meta: {
                title: "message.blocks",
                breadcrumb: "Home / Blocks"
            }
        },
        {
            component: Transaction,
            path: "/Blockchain/Transaction/:hash",
            meta: {
                title: "message.transaction",
                breadcrumb: "Home / Transaction"
            }
        },
        {
            component: AllTransactions,
            path: "/Blockchain/Transactions/",
            meta: {
                title: "message.transactions",
                breadcrumb: "Home / Transactions"
            }
        },
        {
            component: Levels,
            path: "/Blockchain/Levels/",
            meta: {
                title: "message.chainLevels",
                breadcrumb: "Home / Levels"
            }
        },
        {
            component: Address,
            path: "/Blockchain/Address/:hash",
            meta: {
                title: "message.address",
                breadcrumb: "Home / Address"
            }
        }
    ]
};
