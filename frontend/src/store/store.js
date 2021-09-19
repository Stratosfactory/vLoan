import { createStore } from 'vuex'
import axios from "axios"
const store = createStore({
    state() {
        return {
            eventFilters: null,
            events: null,
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

        }
    },
    getters: {
        getEvents(state) {
            return state.events
        }
    },
    actions: {
        getEvents(context, payload) {
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
        }
    }
})

export default store