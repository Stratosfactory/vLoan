import { createApp } from 'vue'
import App from './App.vue'



const app = createApp(App)



import store from "./store/store"
import router from "./router/router"
import PrimeVue from 'primevue/config';

import "primevue/resources/themes/bootstrap4-light-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

app.use(router)
app.use(store)
app.use(PrimeVue);

app.mount('#app')