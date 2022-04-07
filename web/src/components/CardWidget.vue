<template>
  <div class="card" style="width: 100%">
    <div style="display: flex; flex-direction: column; justify-content: space-between; align-content: space-between; height: 100%">
      <div class="card-content">
        <div class="level is-mobile">
          <div class="level-item is-justify-content-flex-start">
            <div class="is-widget-label">
              <h3 class="subtitle is-spaced">
                {{ label }}
              </h3>
              <h1 class="title" style="padding-top: 4px">
                <growing-number :value="number" :prefix="prefix" :suffix="suffix" />
              </h1>
            </div>
          </div>
          <div v-if="icon" class="level-item is-justify-content-flex-end">
            <div class="is-widget-icon">
              <b-icon :icon="icon" size="is-large" :pack="pack" :type="type" custom-size="fa-3x" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="hasDefaultSlot" class="card-content" style="padding-top: 0px; justify-content: flex-end; align-items: flex-end; display: flex; width: 100%; flex-direction: column">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import GrowingNumber from "./GrowingNumber.vue"

export default Vue.extend({
  name: "CardWidget",
  components: { GrowingNumber },
  props: {
    icon: {
      type: String,
      default: null
    },
    number: {
      type: Number,
      default: 0
    },
    prefix: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    type: {
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
  computed: {
    hasDefaultSlot() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (this.$slots as any).default
    }
  }
})
</script>
