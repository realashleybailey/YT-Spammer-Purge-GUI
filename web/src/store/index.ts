import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls"
import router from "@/router"
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, User, UserCredential } from "firebase/auth"
import { LoadingProgrammatic, ToastProgrammatic } from "buefy"
import { Comment } from "@/types/comment.type"
import getComments from "@/ts/getComments"

const ls = new SecureLS({ isCompression: false })
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null as User | null,
    googletoken: null as string | null,
    comments: [] as Comment[],
    isDarkMode: "auto" as string
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setGoogleToken(state, token) {
      state.googletoken = token
    },
    setComments(state, comments) {
      state.comments = comments
    },
    setDarkMode(state, isDarkMode) {
      if (isDarkMode === "auto" || isDarkMode === "dark" || isDarkMode === "light") {
        state.isDarkMode = isDarkMode
      } else {
        state.isDarkMode = "auto"
      }
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.user !== null
    }
  },
  actions: {
    async updateDarkMode({ commit, dispatch }, isDarkMode) {
      commit("setDarkMode", isDarkMode)
      dispatch("syncDarkMode", isDarkMode)
      dispatch("darkModeNotification", isDarkMode)
    },
    async syncDarkMode({ state }, isDarkMode = null) {
      if (isDarkMode === null) {
        isDarkMode = state.isDarkMode
      }

      if (isDarkMode === "dark") {
        document.querySelector("html")?.classList.add("dark")
      }

      if (isDarkMode === "light") {
        document.querySelector("html")?.classList.remove("dark")
      }

      if (isDarkMode === "auto") {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.querySelector("html")?.classList.add("dark")
        } else {
          document.querySelector("html")?.classList.remove("dark")
        }
      }
    },
    async darkModeNotification({ state }, isDarkMode = null) {
      if (isDarkMode === null) {
        isDarkMode = state.isDarkMode
      }

      if (isDarkMode === "auto") {
        let toastColor = "is-dark"
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          toastColor = "is-light"
        }

        ToastProgrammatic.open({
          message: "Dark mode is set to auto. You can change it in the settings.",
          type: toastColor,
          position: "is-bottom-right"
        })
      }

      if (isDarkMode === "dark") {
        ToastProgrammatic.open({
          message: "Dark mode is set to dark. You can change it in the settings.",
          type: "is-light",
          position: "is-bottom-right"
        })
      }

      if (isDarkMode === "light") {
        ToastProgrammatic.open({
          message: "Dark mode is set to light. You can change it in the settings.",
          type: "is-dark",
          position: "is-bottom-right"
        })
      }
    },
    async getComments({ commit, state }) {
      // Check if user is logged in
      if (!state.user) {
        throw new Error("No user logged in")
      }

      // Get the comments
      const comments = await getComments(state.user.uid)
      console.log(comments)

      // Return the comments
      commit("setComments", comments)
    },
    async runOnLogin({ dispatch }) {
      dispatch("getComments")
    },
    async signInWithEmailAndPassword({ dispatch, commit }, { email, password }) {
      // Create loading indicator
      const loading = LoadingProgrammatic.open({ container: null })

      // Get the auth instance
      const auth = getAuth()

      // Sign in with email and password
      let result: UserCredential

      try {
        result = await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        console.log(error)
        loading.close()
        return
      }

      // Get user from result
      const user = result.user

      // Log user in
      console.log(user)

      // Set to store
      commit("setUser", user)

      // Close loading indicator
      loading.close()
      dispatch("runOnLogin")

      // Redirect to dashboard
      router.push("/dashboard")
    },
    async signInWithGoogleAuthProvider({ dispatch, commit }) {
      // Create loading indicator
      const loading = LoadingProgrammatic.open({ container: null })

      // Get Google Auth provider instance and auth instance
      const auth = getAuth()
      const provider = new GoogleAuthProvider()

      // Add scopes to provider
      provider.addScope("email")
      provider.addScope("profile")
      provider.addScope("https://www.googleapis.com/auth/youtube")
      provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl")
      provider.addScope("https://www.googleapis.com/auth/yt-analytics.readonly")

      // Sign in with popup
      let result: UserCredential

      try {
        result = await signInWithPopup(auth, provider)
      } catch (error) {
        loading.close()
        console.log(error)
        return
      }

      // Retrive Google Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken

      // Get user from result
      const user = result.user

      // Log user in
      console.log(user, token)

      // Set to store
      commit("setUser", user)
      commit("setGoogleToken", token)

      // Close loading indicator
      loading.close()
      dispatch("runOnLogin")

      // Redirect to dashboard
      router.push("/dashboard")
    },
    logout({ commit }) {
      commit("setUser", null)
      commit("setGoogleToken", null)
      router.push("/")
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    })
  ]
})

export default store

export function useStore() {
  return store
}
