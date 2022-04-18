import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Buefy from "buefy"

import "./registerServiceWorker"
import "./scss/main.scss"

import VueTour from "./plugin/VueTour/main"
import VueFirebase from "./plugin/VueFirebase"

import { convertComments, importComments, importSpamMarkers } from "./ts/importComments"
import { predictSpam } from "./ts/tensorflow"
import "./ts/brain"

const config = {
  projectId: "yt-spammer-purge-ae77e",
  appId: "1:451656004495:web:e96d3e091a3790d62591fa",
  storageBucket: "yt-spammer-purge-ae77e.appspot.com",
  locationId: "europe-west",
  apiKey: "AIzaSyABD1VkFV_gMVxhQGVNlME_yVv-djBZw4w",
  authDomain: "yt-spammer-purge-ae77e.firebaseapp.com",
  messagingSenderId: "451656004495"
}

gapi.load("client", () => {
  gapi.client.init({
    apiKey: "AIzaSyABD1VkFV_gMVxhQGVNlME_yVv-djBZw4w",
    clientId: "451656004495-nt01u5u1ep6e641qrto3gugna1e711u3.apps.googleusercontent.com",
    discoveryDocs: ["https://youtube.googleapis.com/$discovery/rest?version=v3", "https://youtubeanalytics.googleapis.com/$discovery/rest?version=v2"],
    scope: "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/yt-analytics.readonly"
  })
})

Vue.use(VueTour)
Vue.use(VueFirebase, { app: config, emulator: true })
Vue.use(Buefy)

store.dispatch("createAuthWatcher")

Vue.config.productionTip = false
;(window as any).convertComments = convertComments
;(window as any).importComments = importComments
;(window as any).importSpamMarkers = importSpamMarkers
;(window as any).predictSpam = predictSpam
;(window as any).start = async () => {
  const comments = {}

  store.state.spam.forEach((spam: any) => {
    comments[spam.id] = true
  })

  const good: any[] = []
  const bad: any[] = []

  for (const comment of store.state.comments) {
    const result = await predictSpam(comment.snippet?.topLevelComment?.snippet?.textDisplay || "")
    const spam = await (result as any).data()

    const isSpam = comments[comment.id || ""] || false
    const matched = spam[0] >= 0.9967515239246206
    console.log(comment.snippet?.topLevelComment?.snippet?.textDisplay)
    console.log("SPAM: %c" + (isSpam ? "TRUE" : "FALSE"), "background: #" + (isSpam ? "ff0000" : "00ff00") + "; color: #" + (isSpam ? "ffffff" : "000000") + "")
    console.log("ACCURACY: " + spam[0])
    console.log("MATCHED: %c" + (matched ? "TRUE" : "FALSE"), "background: #" + (matched ? "ff0000" : "00ff00") + "; color: #" + (matched ? "ffffff" : "000000") + "")
    console.log("\n")

    if (isSpam && matched) {
      good.push(spam[0])
    }
    if (!isSpam && !matched) {
      bad.push(spam[0])
    }
  }

  // Get the mean of the good and bad arrays
  const goodMean = good.reduce((a, b) => a + b, 0) / good.length
  const badMean = bad.reduce((a, b) => a + b, 0) / bad.length

  // Get the standard deviation of the good and bad arrays
  const goodStd = Math.sqrt(good.reduce((a, b) => a + Math.pow(b - goodMean, 2), 0) / good.length)
  const badStd = Math.sqrt(bad.reduce((a, b) => a + Math.pow(b - badMean, 2), 0) / bad.length)

  // Get the average difference between the good and bad arrays
  const goodBadDiff = good.reduce((a, b) => a + Math.abs(b - badMean), 0) / good.length
  const badGoodDiff = bad.reduce((a, b) => a + Math.abs(b - goodMean), 0) / bad.length

  console.log(goodMean, badMean)
  console.log(goodStd, badStd)
  console.log(goodBadDiff, badGoodDiff)

  console.log(good, bad)
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
