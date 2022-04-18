<template>
  <div class="settings-view">
    <!-- Verify Email -->
    <VerifyEmail v-if="!this.$store.getters.emailVerified" style="margin-bottom: 0.75rem" />

    <!-- Settings -->
    <Tiles :maxPerRow="3">
      <Enable2FA />
    </Tiles>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Tiles from "../../components/Tiles.vue"

export default Vue.extend({
  name: "SettingsView",
  components: {
    Tiles,
    VerifyEmail: () => import("../../components/Settings/VerifyEmail.vue"),
    Enable2FA: () => import("../../components/Settings/Enable2FA.vue")
  }
})
</script>
