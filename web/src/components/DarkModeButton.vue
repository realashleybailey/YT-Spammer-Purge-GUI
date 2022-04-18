<template>
  <b-dropdown :mobile-modal="true" position="is-bottom-left" id="homepage-tour-step-1">
    <template #trigger>
      <b-button :label="darkModeBtn" size="is-small" />
    </template>

    <b-dropdown-item @click="changeDarkMode('auto')" :disabled="isDarkMode === 'auto'" aria-role="listitem">Auto Detect</b-dropdown-item>
    <b-dropdown-item @click="changeDarkMode('dark')" :disabled="isDarkMode === 'dark'" aria-role="listitem">Dark Mode</b-dropdown-item>
    <b-dropdown-item @click="changeDarkMode('light')" :disabled="isDarkMode === 'light'" aria-role="listitem">Light Mode</b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "SettingsView",
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
