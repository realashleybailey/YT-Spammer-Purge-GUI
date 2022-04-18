<template>
  <div class="dashboard-view">
    <!-- Title Bar -->
    <TitleBar :title-stack="['Settings']" :isMobile="true">
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
  name: "SettingsView",
  components: {
    TitleBar,
    DarkModeButton
  }
})
</script>
