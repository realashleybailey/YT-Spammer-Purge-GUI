/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls"
import router from "@/router"
import { getAuth, GoogleAuthProvider, linkWithCredential, multiFactor, onAuthStateChanged, PhoneAuthProvider, sendEmailVerification, signInWithCredential, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth"
import { LoadingProgrammatic, ToastProgrammatic } from "buefy"
import { Comment } from "@/types/comment.type"
import getComments from "@/ts/getComments"
import { ChartData, ChartOptions } from "chart.js"
import chartOptions from "@/assets/json/chartOptions.json"
import ScanLoader from "../components/ScanLoader.vue"
import { collection, doc, getDoc, getFirestore, writeBatch } from "firebase/firestore"
import { CommentThreadRequest } from "@/types/commentThreadRequest.type"
import { GetCommentsThread } from "@/types/getCommentsThread.type"
import { findMostLikedReply, reduceCommentLikeCount, reduceCommentLikeCountTopLevel } from "@/ts/commentsHelpers"
import getSpam from "@/ts/getSpam"

const ls = new SecureLS({ isCompression: false })
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null as User | null,
    userDocument: null as null,
    googletoken: null as string | null,
    comments: [] as gapi.client.youtube.CommentThread[],
    spam: [] as [],
    isDarkMode: "auto" as string,
    localTour: false as boolean
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setUserDocument(state, userDocument) {
      state.userDocument = userDocument
    },
    setGoogleToken(state, token) {
      state.googletoken = token
    },
    setComments(state, comments) {
      state.comments = comments
    },
    setSpam(state, spam) {
      state.spam = spam
    },
    setDarkMode(state, isDarkMode) {
      if (isDarkMode === "auto" || isDarkMode === "dark" || isDarkMode === "light") {
        state.isDarkMode = isDarkMode
      } else {
        state.isDarkMode = "auto"
      }
    },
    setLocalTour(state, localTour) {
      state.localTour = localTour
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.user !== null
    },
    isDarkMode(state) {
      if (state.isDarkMode === "auto") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
      } else if (state.isDarkMode === "dark") {
        return true
      } else if (state.isDarkMode === "light") {
        return false
      }
    },
    chartOptions() {
      const options = chartOptions as unknown as ChartOptions
      return options
    },
    getGoogleToken(state) {
      return state.googletoken
    },
    emailVerified(state) {
      return state.user !== null && state.user.emailVerified
    },
    disabledReasons(state) {
      return {
        requiresEmailVerification: state.user !== null && state.user.emailVerified === false
      }
    },
    localTour(state) {
      return state.localTour
    }
  },
  actions: {
    async getUserDocument({ state, commit }) {
      // Get firestore instance
      const db = getFirestore()

      // Get the current user id
      const userId = state.user?.uid

      // Check if userId is set
      if (!userId) {
        throw new Error("No user logged in")
      }

      // Get the current user document
      const users = collection(db, "users")

      // Get the user document
      const usersRef = doc(users, userId)

      // Get the user document
      const userDoc = await getDoc(usersRef)

      if (!userDoc.exists) {
        throw new Error("User does not exist")
      }

      // Get the user data
      const userData = userDoc.data()

      // Set the user data
      commit("setUserDocument", userData)

      // Return the user data
      return userData
    },
    async updateDarkMode({ commit, dispatch }, isDarkMode) {
      commit("setDarkMode", isDarkMode)
      // dispatch("syncDarkMode", isDarkMode) // Don't need to sync because it's already synced
      dispatch("darkModeNotification", isDarkMode)
    },
    async syncDarkMode({ state }, isDarkMode = null) {
      // If isDarkMode is null, use the provided state
      if (isDarkMode === null) {
        isDarkMode = state.isDarkMode
      }

      // If isDarkMode is dark set to dark
      if (isDarkMode === "dark") {
        document.querySelector("html")?.classList.add("dark")
      }

      // If isDarkMode is light set to light
      if (isDarkMode === "light") {
        document.querySelector("html")?.classList.remove("dark")
      }

      // If isDarkMode is auto set to current mode
      if (isDarkMode === "auto") {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.querySelector("html")?.classList.add("dark")
        } else {
          document.querySelector("html")?.classList.remove("dark")
        }
      }
    },
    async darkModeNotification({ state }, isDarkMode = null) {
      // If isDarkMode is null, use the provided state
      if (isDarkMode === null) {
        isDarkMode = state.isDarkMode
      }

      // If isDarkMode is auto give a auto mode notification
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

      // If isDarkMode is dark give a dark mode notification
      if (isDarkMode === "dark") {
        ToastProgrammatic.open({
          message: "Dark mode is set to dark. You can change it in the settings.",
          type: "is-light",
          position: "is-bottom-right"
        })
      }

      // If isDarkMode is light give a light mode notification
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

      // Return the comments
      commit("setComments", comments)
    },
    async getSpam({ commit, state }) {
      // Check if user is logged in
      if (!state.user) {
        throw new Error("No user logged in")
      }

      // Get the comments
      const spam = await getSpam(state.user.uid)

      // Return the comments
      commit("setSpam", spam)
    },
    async getMostPopularComment({ state }): Promise<gapi.client.youtube.Comment | null> {
      // Check if user is logged in
      if (!state.user) {
        throw new Error("No user logged in")
      }

      // Get the comments
      if (state.comments.length === 0) {
        return null
      }

      // Return the most popular comment
      const mostLikedComment = state.comments.reduce(reduceCommentLikeCountTopLevel)
      const mostLikedReply = findMostLikedReply(state.comments)

      if (!mostLikedComment || !mostLikedReply) {
        return null
      }

      if (mostLikedComment.snippet && mostLikedComment.snippet.topLevelComment && mostLikedComment.snippet.topLevelComment.snippet && mostLikedComment.snippet.topLevelComment.snippet.likeCount && mostLikedReply.snippet && mostLikedReply.snippet.likeCount) {
        return mostLikedComment.snippet.topLevelComment.snippet.likeCount > mostLikedReply.snippet.likeCount ? mostLikedComment : mostLikedReply
      }

      return null
    },
    async getCommentsChartData({ state, dispatch, getters }, options: ChartData): Promise<[ChartData, ChartOptions] | void> {
      // Check if user is logged in
      if (!state.user) {
        dispatch("logout")
        return
      }

      // Check if comments are loaded
      if (state.comments.length === 0) {
        return
      }

      // Define the chart data
      const defaultOptions: ChartData = {
        datasets: [
          {
            backgroundColor: "rgb(140 103 239 / 20%)",
            borderColor: "rgb(140 103 239 / 100%)",
            borderWidth: 1,
            hoverBackgroundColor: "rgb(140 103 239 / 40%)",
            hoverBorderColor: "rgb(140 103 239 / 100%)",
            data: []
          }
        ]
      }

      // Sort the comments
      const sortedComments = await dispatch("sortCommentsByID", state.comments)

      // Define the titles by video id
      const videoTitles: { [key: string]: string } = {}

      await sortedComments.forEach(async (commentData: { videoID: string; totalComments: number }) => {
        const videoData = await dispatch("getViewInfoFromID", commentData.videoID)
        videoTitles[commentData.videoID] = videoData.title
      })

      // Define the chart options
      const defaultChartOptions: ChartOptions = {
        tooltips: {
          callbacks: {
            title: function (t) {
              if (t[0] && t[0].label) {
                return videoTitles[t[0].label]
              } else {
                return ""
              }
            }
          }
        }
      }

      // Merge the data and options
      const newChartData: ChartData = { ...options, ...defaultOptions }
      const newChartOptions: ChartOptions = { ...getters.chartOptions, ...defaultChartOptions }

      // Generate the chart data labels and data
      const labels: string[] = []
      const data: number[] = []

      await sortedComments.forEach((commentData: { videoID: string; totalComments: number }) => {
        labels.push(commentData.videoID)
        data.push(commentData.totalComments)
      })

      // Set the chart data
      newChartData.labels = labels
      newChartData.datasets![0].data = data

      // Return the chart data and options
      return [newChartData, newChartOptions]
    },
    async sortCommentsByID(_, comments: gapi.client.youtube.CommentThread[]) {
      // Store the comments
      const commentsByID: Array<{ videoID: string; totalComments: number }> | [] = []

      comments.forEach((comment) => {
        // If the video ID is not found skip the comment
        if (!comment.snippet?.videoId) {
          return
        }

        // Set constatnts for the video ID
        const videoID = comment.snippet.videoId

        // Find the video ID in the commentsByID array
        const obj = commentsByID.find((item) => item.videoID === videoID)

        // If the video ID is found in the commentsByID array, increment the count
        if (obj) {
          const index = (commentsByID as [{ videoID: string; totalComments: number }]).indexOf(obj)
          commentsByID[index].totalComments++
          return
        }

        // If the video ID is not found in the commentsByID array, add it and set the count to 1
        (commentsByID as [{ videoID: string; totalComments: number }]).push({
          videoID: videoID,
          totalComments: 1
        })

        comment.replies?.comments?.forEach((reply) => {
          // If the video ID is not found skip the comment
          if (!reply.snippet?.videoId) {
            return
          }

          // Set constatnts for the video ID
          const videoID = reply.snippet.videoId

          // Find the video ID in the commentsByID array
          const obj = commentsByID.find((item) => item.videoID === videoID)

          // If the video ID is found in the commentsByID array, increment the count
          if (obj) {
            const index = (commentsByID as [{ videoID: string; totalComments: number }]).indexOf(obj)
            commentsByID[index].totalComments++
            return
          }

          // If the video ID is not found in the commentsByID array, add it and set the count to 1
          (commentsByID as [{ videoID: string; totalComments: number }]).push({
            videoID: videoID,
            totalComments: 1
          })
        })
      })

      return commentsByID.sort((a, b) => b.totalComments - a.totalComments).slice(0, 10)
    },
    async createAuthWatcher() {
      const auth = getAuth()

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          store.commit("setUser", user)
        } else if (store.state.user !== null) {
          store.dispatch("logout")
        }
      })
    },
    async runOnLogin({ dispatch }) {
      dispatch("getUserDocument")
      dispatch("getComments")
      dispatch("getSpam")
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
      const googleAuth = gapi.auth2.getAuthInstance()

      // Sign in with popup
      let result: gapi.auth2.GoogleUser

      try {
        result = await googleAuth.signIn()
      } catch (error) {
        loading.close()
        console.log(error)
        return
      }

      // Retrive Google Access Token
      const response = result.getAuthResponse()
      const credential = GoogleAuthProvider.credential(response.id_token)
      const token = response.access_token

      // Get user from result
      let user: UserCredential

      try {
        user = await signInWithCredential(auth, credential)
      } catch (error) {
        loading.close()
        console.log(error)
        return
      }

      // Log user in
      console.log("USER: ", user)
      console.log("TOKEN: ", token)

      // Set to store
      commit("setUser", user.user)
      commit("setGoogleToken", token)

      // Close loading indicator
      loading.close()
      dispatch("runOnLogin")

      // Redirect to dashboard
      router.push("/dashboard")
    },
    async connectWithGoogleAuthProvider({ dispatch, commit }) {
      // Create loading indicator
      const loading = LoadingProgrammatic.open({ container: null })

      // Get Google Auth provider instance and auth instance
      const auth = getAuth()
      const googleAuth = gapi.auth2.getAuthInstance()

      // Sign in with popup
      let result: gapi.auth2.GoogleUser

      try {
        result = await googleAuth.signIn()
      } catch (error) {
        loading.close()
        console.log(error)
        return
      }

      // Retrive Google Access Token
      const response = result.getAuthResponse()
      const credential = GoogleAuthProvider.credential(response.id_token)
      const token = response.access_token

      const currentUser = auth.currentUser

      if (!currentUser) {
        loading.close()
        return
      }

      // Get user from result
      let user: UserCredential

      try {
        user = await linkWithCredential(currentUser, credential)
      } catch (error) {
        loading.close()
        console.log(error)
        return
      }

      // Log user in
      console.log(user, token)

      // Set to store
      commit("setUser", user.user)
      commit("setGoogleToken", token)

      // Close loading indicator
      loading.close()
      dispatch("runOnLogin")

      // Redirect to dashboard
      router.push("/dashboard")
    },
    async verifyEmail() {
      // Get the auth instance
      const auth = getAuth()

      // Get the current user
      const currentUser = auth.currentUser

      if (!currentUser) {
        return
      }

      // Verify the email
      try {
        await sendEmailVerification(currentUser)
      } catch (error) {
        ToastProgrammatic.open({
          message: "Error sending verification email",
          type: "is-danger"
        })
        return
      }

      ToastProgrammatic.open({
        message: "Verification email sent",
        type: "is-success"
      })
    },
    async enable2FA(_, phoneNumber) {
      // Get the auth instance
      const auth = getAuth()

      // Get the current user
      const user = auth.currentUser

      // Check if user is logged in
      if (!user) {
        throw new Error("No user logged in")
      }

      // Get MFA session
      const session = await multiFactor(user).getSession()

      // Create options
      const options = {
        phoneNumber,
        session
      }

      // Get phone auth instance
      const phoneAuthProvider = new PhoneAuthProvider(auth)

      // Verify phone number and set prototype
      Vue.prototype.$verificationID = await phoneAuthProvider.verifyPhoneNumber(options, Vue.prototype.$recaptcha)

      console.log(Vue.prototype.$verificationID)
    },
    async startFirstScan({ state }) {
      // Create the component
      const ScanComponent = Vue.extend(ScanLoader)

      // Create the component instance
      const instance = new ScanComponent({
        propsData: {
          step: 3
        }
      })

      // Create the component
      instance.$mount()

      document.getElementById("app")?.appendChild(instance.$el)

      instance.$on("done", () => {
        // Remove the component
        instance.$el.remove()
      })
    },
    async getCommentsFromGoogle({ state, dispatch }, liveCallback) {
      // User max
      const max = 200

      // Declare the parameters
      const maxResults = 100
      const part = ["snippet", "replies"]

      // Store loop variables
      let nextPageToken: string | null = null

      // Get the comments
      const comments: gapi.client.youtube.CommentThread[] = []

      // Make first request
      const payload = {
        queryLocation: {
          allThreadsRelatedToChannelId: "UC_aE0rQ1_9rsTo4Iwb2rbwQ"
        },
        query: {
          part,
          maxResults
        }
      } as GetCommentsThread

      // Get the comments
      const initialResponse = (await dispatch("getCommentsThread", payload)) as gapi.client.youtube.CommentThreadListResponse

      if (initialResponse.items) {
        comments.push(...initialResponse.items)
        liveCallback(initialResponse.items.length, initialResponse.items)
      }

      if (initialResponse.nextPageToken) {
        nextPageToken = initialResponse.nextPageToken
      }

      // Loop through the pages
      while (nextPageToken) {
        // Check we have not reached the max results
        if (comments.length >= max) {
          nextPageToken = null
          break
        }

        // Update the payload
        payload.pageToken = nextPageToken

        // Get the comments
        const response = (await dispatch("getCommentsThread", payload)) as gapi.client.youtube.CommentThreadListResponse

        // Check if there are comments to add to the list
        if (response.items) {
          comments.push(...response.items)
          liveCallback(response.items.length, response.items)
        }

        // Check if there are more comments and set next page token
        if (response.nextPageToken) {
          nextPageToken = response.nextPageToken
        } else {
          nextPageToken = null
        }
      }

      // Save the comments to the firestore
      await dispatch("saveCommentsToFirestore", comments)
      state.comments = comments
    },
    async getCommentsThread(_, payload: GetCommentsThread) {
      // Make checks for payload.queryLocation
      if (!payload.queryLocation.videoId && !payload.queryLocation.channelId && !payload.queryLocation.allThreadsRelatedToChannelId) {
        throw new Error("No videoId or channelId or allThreadsRelatedToChannelId provided")
      }

      // Make checks for gapi
      if (!gapi.client.youtube) {
        throw new Error("No gapi.client.youtube")
      }

      // Declare the parameters
      const request = {
        part: payload.query.part,
        maxResults: payload.query.maxResults
      } as CommentThreadRequest

      // Add the video id if it exists
      if (payload.queryLocation.videoId) {
        request.videoId = payload.queryLocation.videoId
      }

      // Add the channel id if it exists
      if (payload.queryLocation.channelId) {
        request.channelId = payload.queryLocation.channelId
      }

      // Add the allThreadsRelatedToChannelId if it exists
      if (payload.queryLocation.allThreadsRelatedToChannelId) {
        request.allThreadsRelatedToChannelId = payload.queryLocation.allThreadsRelatedToChannelId
      }

      // Add the page token if it exists
      if (payload.pageToken) {
        request.pageToken = payload.pageToken
      }

      // Make the request
      const response = await gapi.client.youtube.commentThreads.list(request)

      // Return the response
      return response.result
    },
    async saveCommentsToFirestore({ state }, comments: gapi.client.youtube.CommentThread[]) {
      // Get the firestore instance
      const db = getFirestore()

      // Get the current user
      const userId = state.user?.uid

      // Check if user is logged in
      if (!userId) {
        throw new Error("No user logged in")
      }

      // Start a batch
      const batch = writeBatch(db)

      // Get the user document
      comments.forEach((comment) => {
        // Get the comment id
        const commentId = comment.id

        // Get the comment document and reference
        const commentRef = collection(db, "users", userId, "comments")
        const commentDoc = doc(commentRef, commentId)

        // Set the comment data
        batch.set(commentDoc, comment)
      })

      // Commit the batch
      await batch.commit()
    },
    async getViewInfoFromID(_, id: string) {
      // Fetch the video info
      const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`)

      // Return the response
      return response.json()
    },
    async shortenString(_, payload) {
      const sections = []
      const words = payload.str.split(" ")
      let temp = ""

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      words.forEach(function (item: string, index: number) {
        if (temp.length > 0) {
          const concat = temp + " " + item

          if (concat.length > payload.maxwidth) {
            sections.push(temp as never)
            temp = ""
          } else {
            if (index === words.length - 1) {
              sections.push(concat as never)
              return
            } else {
              temp = concat
              return
            }
          }
        }

        if (index === words.length - 1) {
          sections.push(item as never)
          return
        }

        if (item.length < payload.maxwidth) {
          temp = item
        } else {
          sections.push(item as never)
        }
      })

      return sections
    },
    logout({ commit }) {
      // Get auth instance
      const auth = getAuth()

      // Logout
      signOut(auth)

      // Remove user from store and other data
      commit("setUser", null)
      commit("setGoogleToken", null)

      commit("setComments", [])
      commit("setSpam", [])

      // Redirect to home
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
