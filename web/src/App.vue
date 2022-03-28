
<template>
  <div id="app">
    <NavBar />
    <transition name="fade">
      <router-view />
    </transition>
    <FooterBar />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue"
import FooterBar from "./components/FooterBar.vue"

export default {
  name: "AppView",
  components: {
    FooterBar,
    NavBar
  },
  async mounted() {
    console.log(this.$store.state.user)
    console.log(this.$store.state.googletoken)

    // Sync Dark Mode
    this.$store.dispatch("syncDarkMode")
  }
}
</script>
