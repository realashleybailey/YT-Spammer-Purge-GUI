<template>
  <MediaCard :title="displayName" :subtitle="email" :titleSize="6" :subtitleSize="7" :image="image" :errorImage="errorImage" :isMobile="true" :rounded="true" :isFit="true">
    <div class="buttons is-flex is-justify-content-space-between" style="width: 100%">
      <div>
        <!-- View Profile -->
        <b-button tag="router-link" :to="{ path: '/profile' }" class="button is-primary is-small">
          <span class="icon">
            <i class="fas fa-user"></i>
          </span>
          <span>Profile</span>
        </b-button>
        <!-- View Profile End -->

        <!-- View Settings -->
        <b-button tag="router-link" :to="{ path: '/settings' }" class="button is-primary is-small" id="homepage-tour-step-2">
          <span class="icon">
            <i class="fas fa-cog"></i>
          </span>
          <span>Settings</span>
        </b-button>
        <!-- View Settings End -->
      </div>

      <!-- Logout -->
      <b-button class="button is-light is-small" @click="logout()">
        <span class="icon">
          <i class="fas fa-sign-out-alt"></i>
        </span>
        <span>Logout</span>
      </b-button>
      <!-- Logout End -->
    </div>
  </MediaCard>
</template>

<script lang="ts">
import Vue from "vue"
import MediaCard from "./MediaCard.vue"

export default Vue.extend({
  name: "ProfileCard",
  components: {
    MediaCard
  },
  computed: {
    displayName() {
      return this.$store.state.user.displayName || "Anonymous"
    },
    email() {
      return this.$store.state.user.email
    },
    image() {
      return this.$store.state.user.photoURL || "https://ui-avatars.com/api/?name=" + this.$store.state.user.displayName
    },
    errorImage() {
      return "https://ui-avatars.com/api/?name=" + this.$store.state.user.displayName
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout")
    }
  }
})
</script>
