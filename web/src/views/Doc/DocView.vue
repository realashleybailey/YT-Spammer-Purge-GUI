<template>
  <div class="doc-view">
    <!-- Back Button -->
    <section v-if="!currentRoute" class="section" style="padding: 0rem 1.5rem; padding-top: 1rem">
      <div class="level" style="margin-bottom: 0px">
        <div class="left">
          <b-button size="is-small" tag="router-link" to="/doc">Back</b-button>
        </div>
      </div>
    </section>

    <!-- Title Bar -->
    <TitleBar :title-stack="['YT Spammer Purge', 'Documentation']"></TitleBar>

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
  name: "DocView",
  components: {
    TitleBar
  },
  computed: {
    // eslint-disable-next-line @typescript-eslint/space-before-function-paren
    currentRoute() {
      // If route matches /doc or /doc/ return false if route match /doc/{anything} return true
      return this.$route.path === "/doc" || this.$route.path === "/doc/"
    }
  }
})
</script>
