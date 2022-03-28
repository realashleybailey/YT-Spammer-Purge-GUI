<template>
  <div class="card" :style="styles">
    <header v-if="title" class="card-header">
      <p class="card-header-title">
        <b-icon v-if="icon" :pack="pack" :icon="icon" custom-size="default" />
        {{ title }}
      </p>
      <a v-if="headerIcon" href="#" class="card-header-icon" aria-label="more options" @click.prevent="headerIconClick">
        <b-icon :pack="pack" :icon="headerIcon" custom-size="default" />
      </a>
    </header>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
  name: "CardComponent",
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    headerIcon: {
      type: String,
      default: null
    },
    pack: {
      type: String,
      default: null
    },
    styles: {
      type: String,
      default: ""
    }
  },
  emits: ["header-icon-click"],
  methods: {
    headerIconClick() {
      this.$emit("header-icon-click")
    }
  }
})
</script>
