<template>
  <div class="doc-view">
    <!-- Title Bar -->
    <TitleBar :title-stack="currentRouteName" :hiddenRight="!isLoggedIn" :isMobile="isLoggedIn">
      <DarkModeButton />
    </TitleBar>

    <!-- Content -->
    <section class="section">
      <router-view></router-view>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

import TitleBar from "../../components/TitleBar.vue"
import DarkModeButton from "../../components/DarkModeButton.vue"

export default Vue.extend({
  name: "DocView",
  components: {
    TitleBar,
    DarkModeButton
  },
  computed: {
    currentRouteName() {
      if (this.$store.getters.isLoggedIn) {
        return [this.$route.name]
      } else {
        return ["YT Spammer Purge", this.$route.name]
      }
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  }
})
</script>
