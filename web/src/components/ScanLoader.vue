<template>
  <CustomLoading :active="step" :darkMode="true">
    <div class="is-flex is-justify-content-center is-align-items-center is-flex-direction-column" style="padding: 40px; text-align: center">
      <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin"> </b-icon>
      <p class="title is-6 pt-3">Please wait while we gather data...</p>
    </div>
    <div class="is-flex is-justify-content-center is-align-items-center is-flex-direction-column" style="padding: 40px; text-align: center">
      <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin"> </b-icon>
      <p class="title is-6 pt-3">We are almost done...</p>
    </div>
    <div class="is-flex is-justify-content-center is-align-items-center is-flex-direction-column" style="padding: 40px; text-align: center">
      <p class="title is-6 pt-3">We have finished gathering data!</p>
      <p class="subtitle">Please wait up to a hour for the data to be processed.</p>
      <b-button class="button is-primary is-small" @click="$emit('done')">Done</b-button>
    </div>
  </CustomLoading>
</template>

<script lang="ts">
import Vue from "vue"
import CustomLoading from "./CustomLoading.vue"

export default Vue.extend({
  name: "ScanLoader",
  components: {
    CustomLoading
  },
  props: {
    step: {
      type: Number,
      default: 1
    }
  }
})
</script>
