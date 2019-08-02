import primaryTheme from "Themes/primaryTheme";
import dangerTheme from "Themes/dangerTheme";
import warningTheme from "Themes/warningTheme";
import infoTheme from "Themes/infoTheme";
import accentTheme from "Themes/accentTheme";
import successTheme from "Themes/successTheme";

// languages
export const languages = [
    {
        name: "English",
        icon: "en",
        locale: "en"
    }
];

// router animations
export const routerAnimations = ["slideInUp", "fadeIn", "slideInRight", "bounce", "lightSpeedIn", "pulse"];

// themes
export const themes = [
    {
        id: 1,
        bgColor: "bg-primary",
        theme: primaryTheme
    },
    {
        id: 2,
        bgColor: "bg-warning",
        theme: warningTheme
    },
    {
        id: 3,
        bgColor: "bg-success",
        theme: successTheme
    },
    {
        id: 4,
        bgColor: "bg-danger",
        theme: dangerTheme
    },
    {
        id: 5,
        bgColor: "bg-info",
        theme: infoTheme
    },
    {
        id: 6,
        bgColor: "bg-secondary",
        theme: accentTheme
    }
];

// header filter
export const headerFilters = [
    {
        id: 1,
        class: "primary"
    },
    {
        id: 2,
        class: "light"
    },
    {
        id: 3,
        class: "warning"
    },
    {
        id: 4,
        class: "success"
    },
    {
        id: 5,
        class: "error"
    },
    {
        id: 6,
        class: "info"
    }
];

// sidebar filters
export const sidebarFilters = [
    {
        id: 1,
        class: "sidebar-overlay-dark",
        name: "message.dark"
    },
    {
        id: 2,
        class: "sidebar-overlay-light",
        name: "message.light"
    }
];
