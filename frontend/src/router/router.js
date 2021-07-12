import { createRouter, createWebHistory } from 'vue-router'

import home from "../components/home/home"
import vlender from "../components/vLender/vlender"
import objectAdmin from "../components/objectAdmin/objectAdmin"
import inventoryManager from "../components/inventoryManager/inventoryManager"


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
            icon: "pi pi-user-edit"
        },

    },
    {
        path: "/inventory",
        name: "Inventory Manager",
        component: inventoryManager,
        meta: {
            icon: "pi pi-book"
        },

    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router