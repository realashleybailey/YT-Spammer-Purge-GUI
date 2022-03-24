
<template>
  <div id="app">
    <NavBar />
    <router-view />
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
  }
}
</script>
