import _Vue from "vue"
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app"
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"
import { getAuth, RecaptchaVerifier } from "firebase/auth"

interface PluginOptions {
  app: FirebaseOptions
  emulator: boolean
}

const VueFirebase = {
  // Install the plugin
  install: (Vue: typeof _Vue, options: PluginOptions) => {
    // Initialize Firebase
    const firebaseApp = initializeApp(options.app)

    // Register firebase app
    Vue.prototype.$firebase = firebaseApp

    // Set firebase services
    VueFirebase.setupFirestore(Vue, firebaseApp, options)
    VueFirebase.setupAuth(Vue, firebaseApp, options)
    VueFirebase.setupRecaptcha(Vue, firebaseApp)
  },

  setupFirestore: (Vue: typeof _Vue, app: FirebaseApp, options: PluginOptions) => {
    // Initialize Firebase
    const firestore = getFirestore(app)

    // If in development mode, connect to the emulator
    if (process.env.NODE_ENV === "development" && options.emulator === true) {
      console.log("Connecting to Firestore Emulator")
      connectFirestoreEmulator(firestore, "localhost", 8080)
    }

    // Register firestore
    Vue.prototype.$firestore = firestore
  },

  setupAuth: (Vue: typeof _Vue, app: FirebaseApp, options: PluginOptions) => {
    // Initialize Firebase
    const auth = getAuth(app)

    // If in development mode, connect to the emulator
    if (process.env.NODE_ENV === "development" && options.emulator === true) {
      // console.log("Connecting to Auth Emulator")
      // connectAuthEmulator(auth, "http://localhost:9099")
    }

    // Register firestore
    Vue.prototype.$fireauth = auth
  },

  setupRecaptcha: (Vue: typeof _Vue, app: FirebaseApp) => {
    // Initialize Firebase
    const auth = getAuth(app)

    // Initialize Recaptcha
    const recaptcha = new RecaptchaVerifier(
      "2fa-captcha",
      {
        size: "invisible",
        callback: (response: never) => {
          console.log("Response from reCAPTCHA:", response)
        }
      },
      auth
    )

    // Register recaptcha
    Vue.prototype.$recaptcha = recaptcha
  }
}

export default VueFirebase
