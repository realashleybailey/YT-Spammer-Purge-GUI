<template>
  <div class="login-view">
    <div class="level">
      <div class="level-item">
        <div class="content" style="width: 500px">
          <div class="card">
            <div class="card-content">
              <form>
                <b-field label="Email">
                  <b-input id="email" type="email" v-model="email"> </b-input>
                </b-field>
                <b-field label="Password">
                  <b-input id="password" type="password" v-model="password" password-reveal> </b-input>
                </b-field>
                <div class="is-flex is-justify-content-flex-end">
                  <b-button id="loginbtn" type="is-primary" @click="emailSignin()">Login</b-button>
                </div>
              </form>
            </div>
          </div>
          <div @click="googleSignin()" class="google-signin">
            <SigninWithGoogle></SigninWithGoogle>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import SigninWithGoogle from "../../components/SigninWithGoogle.vue"

export default Vue.extend({
  name: "LoginView",
  components: {
    SigninWithGoogle
  },
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    async emailSignin() {
      this.$store.dispatch("signInWithEmailAndPassword", { email: this.email, password: this.password })
    },
    async googleSignin() {
      this.$store.dispatch("signInWithGoogleAuthProvider")
    }
  }
})
</script>
