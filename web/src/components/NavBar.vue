<template>
  <b-navbar :active.sync="barActive">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/img/robot-logo.svg" alt="YT Spammer Purge" />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item v-if="!isLoggedIn" tag="router-link" to="/"> Home </b-navbar-item>
      <b-navbar-item v-if="isLoggedIn" tag="router-link" to="/dashboard"> Dashboard </b-navbar-item>
      <b-navbar-item tag="router-link" to="/pricing"> Pricing </b-navbar-item>
      <b-navbar-item tag="router-link" to="/documentation"> Documentation </b-navbar-item>
      <b-navbar-item v-if="isLoggedIn" tag="router-link" to="/settings"> Settings </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons" v-if="!isLoggedIn">
          <b-button tag="router-link" to="/register" type="is-primary" size="is-small">
            <strong>Sign up</strong>
          </b-button>
          <b-button tag="router-link" to="/login" :type="isDark ? 'is-light' : 'is-dark'" size="is-small">Login</b-button>
        </div>
        <div class="buttons" v-if="isLoggedIn">
          <b-button class="button is-light is-small" @click="logout()">
            <span class="icon">
              <i class="fas fa-sign-out-alt"></i>
            </span>
            <span>Logout</span>
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "NavBar",
  data() {
    return {
      barActive: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    isDark() {
      return this.$store.getters.isDarkMode
    }
  },
  watch: {
    $route() {
      this.barActive = false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout")
    }
  }
})
</script>
