import { createRouter, createWebHistory } from 'vue-router'

import home from "../components/home/home"
import vlender from "../components/vLender/vlender"
import objectAdmin from "../components/objectAdmin/objectAdmin"
import insights from "../components/insights/insights"
import myTasks from "../components/loantasks/myTasks"
import profile from "../components/profile/profileInfo.vue"

const routes = [{
        path: "/",
        name: "Home",
        component: home,
        meta: {
            icon: "pi pi-home"
        },

    },
    {
        path: "/objects",
        name: "Object Administrator",
        component: objectAdmin,
        meta: {
            icon: "pi pi-list"
        },

    },
    {
        path: "/loan",
        name: "Lending Platform",
        component: vlender,
        meta: {
            icon: "pi pi-reply"
        },
        props: { payload: null },

    },
    {
        path: "/insights",
        name: "Object Insights",
        component: insights,
        meta: {
            icon: "pi pi-eye"
        },

    },

    {
        path: "/mytasks",
        name: "My Assigned Loan Tasks",
        component: myTasks,
        meta: {
            icon: "pi pi-check-square"
        },

    },
    {
        path: "/profile",
        name: "Profile Info",
        component: profile,
        meta: {
            icon: "pi pi-user"
        },

    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router