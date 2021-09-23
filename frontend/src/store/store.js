import { createStore } from 'vuex'
import axios from "axios"
const store = createStore({
    state() {
        return {
            eventFilters: null,
            events: null,
            objects: null,
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

        }
    },
    getters: {
        eventGetter(state) {
            return state.events
        },
        objectGetter(state) {
            return state.objects
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
                    this.$toast.add({
                        severity: "error",
                        summary: "Error while fetching events",
                    });
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
                });
        },
        getObjects(context, payload) {
            axios
                .get("http://localhost:3000/vloanapi/objects/getobject", { params: payload })
                .then((res) => {

                    context.commit("setObjects", res.data.objects)


                })
                .catch((err) => {
                    console.log(err);
                    this.$toast.add({
                        severity: "error",
                        summary: err.response.data.message,
                    });
                });
        }
    }
})

export default store