<template>
  <section class="section is-title-bar">
    <div class="level">
      <div class="level-left">
        <div class="level-item" :style="!centered ? 'justify-content: flex-start' : ''">
          <ul>
            <li v-for="(title, index) in titleStack" :key="index">
              {{ title }}
            </li>
          </ul>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <slot></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "TitleBar",
  props: {
    titleStack: {
      type: Array,
      default: () => []
    },
    centered: {
      type: Boolean,
      default: false
    }
  }
})
</script>
