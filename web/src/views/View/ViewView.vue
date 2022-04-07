<template>
  <div class="view-view">
    <!-- Title Bar -->
    <TitleBar :title-stack="[currentRouteName]" :isMobile="true">
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
  name: "ViewView",
  components: {
    TitleBar,
    DarkModeButton
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  }
})
</script>
