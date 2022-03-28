<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/img/robot-logo.svg" alt="YT Spammer Purge" />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" to="/"> Home </b-navbar-item>
      <b-navbar-item tag="router-link" to="/doc"> Documentation </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item v-if="!isLoggedIn" tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light"> Log in </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "NavBar",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  }
})
</script>
