<template>
  <CardComponent headerIcon="comment" pack="fas" title="2FA">
    <b-field>
      <b-input type="text" :value="phone" placeholder="Your phone" required> </b-input>
    </b-field>
    <p style="font-size: 10px; padding: 0px 5px 0px 5px">
      This site is protected by reCAPTCHA and the Google
      <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </p>
    <div class="buttons pt-3 is-flex is-justify-content-flex-end">
      <b-button :disabled="disabledReasons" class="button is-primary is-small" @click="$store.dispatch('enable2FA', phone)">
        <span class="icon">
          <i class="fas fa-check"></i>
        </span>
        <span>Enable 2FA</span>
      </b-button>
    </div>
  </CardComponent>
</template>

<script lang="ts">
import Vue from "vue"
import CardComponent from "../../components/CardComponent.vue"

export default Vue.extend({
  name: "Enable2FAView",
  components: {
    CardComponent
  },
  data() {
    return {
      phone: ""
    }
  },
  computed: {
    disabledReasons() {
      return this.$store.getters.disabledReasons.requiresEmailVerification
    }
  }
})
</script>
