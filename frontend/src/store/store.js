import { createStore } from 'vuex'
import axios from "axios"
const store = createStore({
    state() {
        return {
            eventFilters: null,
            events: null,
            objects: null,
            toast: {
                type: null,
                message: null,
            },
            login: {
                visible: false,
                loggedIn: false,
                token: null,
                role: null,
            }
        }

    },
    mutations: {
        setEvents(state, payload) {
            for (let item of payload) {
                item["clicked"] = false;
                item["objectsArray"] = [];
                item.loanStartDate = new Date(item.loanStartDate).toLocaleString(
                    "de-DE", { year: "numeric", month: "2-digit", day: "2-digit" }
                );
                item.loanEndDate = new Date(item.loanEndDate).toLocaleString(
                    "de-DE", { year: "numeric", month: "2-digit", day: "2-digit" }
                );
            }
            state.events = payload

        },
        setEventObjects(state, payload) {
            for (let item of state.events) {
                if (item._id === payload.eventId) {
                    item.objectsArray = payload.objects

                }
            }
            console.log(payload)
        },
        setObjects(state, payload) {


            for (let object of payload) {
                object.timeStamp = new Date(object.timeStamp).toLocaleString();
            }
            state.objects = payload

        },
        toastServiceHandler(state, payload) {
            console.log(payload)
            state.toast.type = payload.type
            state.toast.message = payload.message
        },
        toggleLogin(state) {

            state.login.visible ? state.login.visible = false : state.login.visible = true

        },
        setToken(state, payload) {
            localStorage.setItem("token", payload.token);
            const validTime = 60 * 120 * 1000;
            const expiryDate = new Date(new Date().getTime() + validTime);
            localStorage.setItem("expiryDate", expiryDate.toISOString());
            state.login.visible = false;
            state.login.role = payload.role;
        },
        validateLogin(state) {
            const token = localStorage.getItem("token");
            const expiryDate = localStorage.getItem("expiryDate");
            if (!token || !expiryDate) {
                state.login.loggedIn = false
            } else if (new Date(expiryDate) < new Date()) {
                state.login.loggedIn = false;
                localStorage.removeItem("token");
                localStorage.removeItem("expiryDate");
            } else {
                state.login.loggedIn = true
            }
        }

    },
    getters: {
        eventGetter(state) {
            return state.events
        },
        objectGetter(state) {
            return state.objects
        },
        getToast(state) {
            return state.toast
        },
        getLoginVisibility(state) {
            return state.login.visible
        },
        getLoginData(state) {
            return state.login
        }
    },
    actions: {
        getEvents(context, payload) {

            if (!payload) {
                payload = { loanStartDate: new Date().toISOString().substr(0, 10) }
            }
            axios
                .get("http://localhost:3000/vloanapi/events/getevents", { params: payload })
                .then((res) => {
                    context.commit("setEvents", res.data.events)


                })
                .catch((err) => {
                    console.log(err);
                    context.commit("toastServiceHandler", {
                        type: "error",
                        message: "Error while fetching events"
                    })
                });
        },
        getEventObjects(context, payload) {

            axios.get("http://localhost:3000/vloanapi/objects/getobject", { params: payload })
                .then((res) => {
                    let response = {
                        eventId: payload.eventId,
                        objects: res.data.objects
                    }
                    context.commit("setEventObjects", response)
                })
                .catch((err) => {
                    context.commit("toastServiceHandler", {
                        type: "error",
                        message: err.response.data.message
                    })
                });
        },
        getObjects(context, payload) {
            axios
                .get("http://localhost:3000/vloanapi/objects/getobject", { params: payload })
                .then((res) => {

                    context.commit("setObjects", res.data.objects)


                })
                .catch((err) => {

                    context.commit("toastServiceHandler", {
                        type: "error",
                        message: err.response.data.message
                    })

                });
        },
        login(context, payload) {
            axios.post("http://localhost:3000/vloanapi/user/login", { email: payload.email, password: payload.password })
                .then((res) => {
                    context.commit("setToken", {
                            token: res.data.token,
                            role: res.data.role
                        }),
                        context.commit("validateLogin")
                })
                .catch((err) => {

                    context.commit("toastServiceHandler", {
                        type: "error",
                        message: err.response.data.message
                    })
                })
        }
    }
})

export default store