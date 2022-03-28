<template>
  <div class="dashboard-view">
    <!-- Title Bar -->
    <TitleBar :title-stack="['Dashboard']" :isMobile="true">
      <!-- <button class="button is-small is-primary" @click="logout()">Logout</button> -->
      <b-dropdown :mobile-modal="true" position="is-bottom-left">
        <template #trigger>
          <b-button :label="darkModeBtn" size="is-small" />
        </template>

        <b-dropdown-item @click="changeDarkMode('auto')" :disabled="isDarkMode === 'auto'" aria-role="listitem">Auto Detect</b-dropdown-item>
        <b-dropdown-item @click="changeDarkMode('dark')" :disabled="isDarkMode === 'dark'" aria-role="listitem">Dark Mode</b-dropdown-item>
        <b-dropdown-item @click="changeDarkMode('light')" :disabled="isDarkMode === 'light'" aria-role="listitem">Light Mode</b-dropdown-item>
      </b-dropdown>
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
import { getAuth, signOut } from "firebase/auth"

export default Vue.extend({
  name: "DashboardView",
  components: {
    TitleBar
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    },
    darkModeBtn() {
      const darkMode = this.$store.state.isDarkMode
      if (darkMode === "auto") {
        return "Auto Detect"
      } else if (darkMode === "dark") {
        return "Dark Mode"
      } else if (darkMode === "light") {
        return "Light Mode"
      } else {
        return "Unknown"
      }
    }
  },
  methods: {
    changeDarkMode(darkMode: string) {
      this.$store.dispatch("updateDarkMode", darkMode)
    }
  }
})
</script>
