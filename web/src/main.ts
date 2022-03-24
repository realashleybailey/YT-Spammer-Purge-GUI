import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Buefy from "buefy"

import "./registerServiceWorker"
import "./scss/main.scss"

import VueFirebase from "./plugin/VueFirebase"

const config = {
  projectId: "yt-spammer-purge-ae77e",
  appId: "1:451656004495:web:e96d3e091a3790d62591fa",
  storageBucket: "yt-spammer-purge-ae77e.appspot.com",
  locationId: "europe-west",
  apiKey: "AIzaSyABD1VkFV_gMVxhQGVNlME_yVv-djBZw4w",
  authDomain: "yt-spammer-purge-ae77e.firebaseapp.com",
  messagingSenderId: "451656004495"
}

Vue.use(VueFirebase, { app: config, emulator: true })
Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
