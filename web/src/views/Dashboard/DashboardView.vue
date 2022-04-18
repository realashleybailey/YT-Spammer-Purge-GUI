<template>
  <div class="dashboard-view">
    <!-- Title Bar -->
    <TitleBar :title-stack="['Dashboard']" :isMobile="true">
      <DarkModeButton />
    </TitleBar>

    <!-- Content -->
    <section class="section">
      <router-view></router-view>
    </section>

    <!-- OnBoarding Tour -->
    <v-tour name="homepagetour" :steps="steps" :options="{ debug: true, highlight: true }" :callbacks="{ onFinish: onFinishCB(), onSkip: onSkipCB() }"></v-tour>
  </div>
</template>

<script>
import Vue from "vue"

import TitleBar from "../../components/TitleBar.vue"
import DarkModeButton from "../../components/DarkModeButton.vue"

export default Vue.extend({
  name: "DashboardView",
  components: {
    TitleBar,
    DarkModeButton
  },
  data() {
    return {
      steps: [
        {
          target: "#homepage-tour-step-1",
          content: "Select your prefered color scheme.",
          params: {
            placement: "left"
          }
        },
        {
          target: "#homepage-tour-step-2",
          content: "Quickly access your account settings.",
          params: {
            placement: "bottom"
          }
        }
      ]
    }
  },
  methods: {
    onFinishCB() {
      this.$store.commit("setLocalTour", true)
    },
    onSkipCB() {
      this.$store.commit("setLocalTour", true)
    }
  },
  mounted() {
    if (!this.$store.getters.localTour) {
      this.$tours.homepagetour.start()
    }
  }
})
</script>
