<template>
  <div class="login-view">
    <div class="card">
      <div class="card-content">
        <form>
          <b-field label="Email">
            <b-input type="email"> </b-input>
          </b-field>
          <b-field label="Password">
            <b-input type="password" password-reveal> </b-input>
          </b-field>
          <div class="is-flex is-justify-content-flex-end">
            <b-button type="is-primary" @click="emailSignin()">Login</b-button>
          </div>
        </form>
      </div>
    </div>
    <div @click="googleSignin()" class="google-signin">
      <SigninWithGoogle></SigninWithGoogle>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import SigninWithGoogle from "../../components/SigninWithGoogle.vue"
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth"

export default Vue.extend({
  name: "LoginView",
  components: {
    SigninWithGoogle
  },
  methods: {
    async emailSignin() {
      console.log("emailSignin")
    },
    async googleSignin() {
      // Get Google Auth provider instance and auth instance
      const auth = getAuth()
      const provider = new GoogleAuthProvider()

      // Add scopes to provider
      provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl")

      // Sign in with popup
      let result: UserCredential

      try {
        result = await signInWithPopup(auth, provider)
      } catch (error) {
        console.log(error)
        return
      }

      // Retrive Google Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken

      // Get user from result
      const user = result.user

      // Log user in
      console.log(user, token)
    },
    async signInWithPopupHandler(promise: () => Promise<UserCredential>): Promise<[Error | null, UserCredential | null]> {
      try {
        const result = await promise()
        return [null, result]
      } catch (error) {
        return [error, null]
      }
    }
  }
})
</script>
