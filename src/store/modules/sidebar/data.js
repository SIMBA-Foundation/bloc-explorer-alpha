// Sidebar Routers
export const menus = {
    "message.home": {
        action: "zmdi-home",
        title: "message.home",
        active: false,
        path: "/Home",
        exact: true,
        items: null
    },
    "message.blockchain": {
        action: "zmdi-widgets",
        title: "message.blockchain",
        active: false,
        exact: true,
        items: [
            {
                title: "message.chainLevels",
                path: "/blockchain/levels",
                exact: true
            },
            {
                title: "message.blocks",
                path: "/blockchain/blocks",
                exact: true
            },
            {
                title: "message.transactions",
                path: "/blockchain/transactions",
                exact: true
            }
        ]
    }
};
