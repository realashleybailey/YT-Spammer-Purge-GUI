<template>
  <section class="hero seperator-bottom">
    <div class="hero-body front-body-hero">
      <div :class="centered ? 'container has-text-centered' : 'container'">
        <div class="title">{{ title }}</div>
        <div class="subtitle pt-2">
          <slot name="subtitle-extra-top"></slot>
          {{ subtitle }}
          <slot name="subtitle-extra-bottom"></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@media screen and (min-width: 769px) {
  .front-body-hero {
    padding: 3rem 10rem !important;
  }
}
</style>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "HeroComponent",
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    centered: {
      type: Boolean,
      default: false,
      required: false
    }
  }
})
</script>
