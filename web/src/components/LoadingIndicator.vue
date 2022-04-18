<template>
  <div class="loading-indicator">
    <div class="progress-bar" style="width: 0%"></div>
  </div>
</template>

<style lang="scss">
.loading-indicator {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 5px;
  z-index: 1000;
  opacity: 0.8;
  transition: opacity 0.5s ease-out;
}

.loading-indicator .progress-bar {
  height: 100%;
  background: #6939ea;
  transition: width 0.5s ease-in-out;
}
</style>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "LoadingIndicator",
  data() {
    return {
      width: 0
    }
  },
  methods: {
    beginLoading() {
      // Show the loading indicator
      this.showLoading()

      const interval = setInterval(() => {
        // Increment the width of the progress bar
        this.width = this.width + 10

        // Reset the interval if the width is greater than 100
        if (this.width > 100) {
          clearInterval(interval)
          this.hideLoading()
        }
      }, 500)
    },
    endLoading() {
      if (this.width > 100) {
        this.hideLoading()
        return
      }

      this.width = 95
    },
    showLoading() {
      const loadingIndicator = this.$el
      const progressBar = loadingIndicator.querySelector(".progress-bar")

      loadingIndicator.style.opacity = "1"
      progressBar.style.width = "0%"
    },
    hideLoading() {
      const loadingIndicator = this.$el
      const progressBar = loadingIndicator.querySelector(".progress-bar")

      loadingIndicator.style.opacity = "0"
      progressBar.style.width = "0%"
    }
  },
  watch: {
    width(width) {
      const loadingIndicator = this.$el
      const progressBar = loadingIndicator.querySelector(".progress-bar")

      const newWidth = parseInt(width) + "%"
      progressBar.style.width = newWidth
    }
  },
  mounted() {
    Vue.prototype.$beginLoading = this.beginLoading
    Vue.prototype.$endLoading = this.endLoading
    this.beginLoading()
  }
})
</script>
