<template>
  <CardComponent v-if="totalComments <= 0">
    <div class="title">Begin Scan</div>
    <div class="subtitle">
      <p>Start your comment scan now and get started with eliminating spam from your channel.</p>
    </div>
    <div class="buttons is-flex is-justify-content-flex-end">
      <b-button :disabled="disabledReasons" v-if="getGoogleToken" class="button is-primary is-small" @click="startNow()">
        <span class="icon">
          <i class="fas fa-play"></i>
        </span>
        <span>Start Now</span>
      </b-button>
      <b-button v-else class="button is-light is-small" @click="connectGoogle()">
        <span class="icon">
          <i class="fas fa-sign-in-alt"></i>
        </span>
        <span>Connect Google Account</span>
      </b-button>
    </div>
  </CardComponent>
</template>

<script lang="ts">
import Vue from "vue"
import CardComponent from "./CardComponent.vue"

export default Vue.extend({
  name: "BeginScan",
  components: {
    CardComponent
  },
  data() {
    return {
      inc: 1
    }
  },
  computed: {
    getGoogleToken() {
      return this.$store.getters.getGoogleToken
    },
    disabledReasons() {
      return this.$store.getters.disabledReasons.requiresEmailVerification
    },
    totalComments() {
      return this.$store.state.comments.length
    }
  },
  methods: {
    startNow() {
      this.$store.dispatch("startFirstScan", this.$refs)
    },
    connectGoogle() {
      this.$store.dispatch("connectWithGoogleAuthProvider")
    }
  }
})
</script>
