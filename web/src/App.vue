
<template>
  <div id="app" ref="container">
    <NavBar />
    <transition name="fade">
      <router-view />
    </transition>
    <FooterBar />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import NavBar from "./components/NavBar.vue"
import FooterBar from "./components/FooterBar.vue"
import { BComponent } from "buefy/types/components"

export default Vue.extend({
  name: "AppView",
  components: {
    FooterBar,
    NavBar
  },
  data() {
    return {
      dialog: null as BComponent | null
    }
  },
  async mounted() {
    console.log(this.$store.state.user)
    console.log(this.$store.state.googletoken)

    // Sync Dark Mode
    this.$store.dispatch("syncDarkMode")
  },
  computed: {
    darkMode() {
      return this.$store.state.isDarkMode
    }
  },
  watch: {
    darkMode(newValue) {
      this.$store.dispatch("syncDarkMode", newValue)
    }
  },
  errorCaptured(err: Error) {
    if (this.dialog) {
      this.dialog.close()
    }

    this.dialog = this.$buefy.dialog.alert({
      title: err.name,
      message: err.message,
      type: "is-danger",
      onConfirm: () => {
        this.dialog = null
      }
    })
  }
})
</script>
