<template>
  <div class="auth-view">
    <!-- Title Bar -->
    <TitleBar :title-stack="['YT Spammer Purge', currentRoute]"></TitleBar>

    <!-- Content -->
    <section class="section">
      <router-view></router-view>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import TitleBar from "../../components/TitleBar.vue"

export default Vue.extend({
  name: "AuthView",
  components: {
    TitleBar
  },
  computed: {
    // eslint-disable-next-line @typescript-eslint/space-before-function-paren
    currentRoute() {
      // If route matches /login return 'Login' else if route matches /register return 'Register'
      return this.$route.path === "/login" || this.$route.path === "/login/" ? "Login" : "Register"
    }
  }
})
</script>
