<template>
  <CardComponent v-if="!this.$store.getters.emailVerified" headerIcon="email" pack="fas" title="Verify Email">
    <div class="subtitle mb-3">Verify your email address to access all of your account settings.</div>
    <div class="buttons is-flex is-justify-content-flex-end">
      <b-button @click="$store.dispatch('verifyEmail')" class="button is-primary is-small">
        <span class="icon">
          <i class="fas fa-envelope"></i>
        </span>
        <span>Verify Email</span>
      </b-button>
    </div>
  </CardComponent>
</template>

<script lang="ts">
import Vue from "vue"
import CardComponent from "../../components/CardComponent.vue"

export default Vue.extend({
  name: "VerifyEmailView",
  components: {
    CardComponent
  }
})
</script>
