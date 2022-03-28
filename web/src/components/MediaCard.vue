<template>
  <div class="card" style="width: 100%">
    <component :is="tag" :to="to">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <img :src="image" rel="noreferrer" :class="'image is-48x48 '" :style="'object-fit: ' + (isFit ? 'fill' : 'contains') + '; ' + (rounded ? 'border-radius: 6px;' : '')" />
          </div>
          <div class="media-content" style="overflow: hidden">
            <p :class="'title text-nooverflow is-' + titleSize">{{ title }}</p>
            <p :class="'subtitle is-6 text-nooverflow is-' + subtitleSize">{{ subtitle }}</p>
          </div>
        </div>
      </div>
      <div v-if="hasDefaultSlot" class="card-content" style="padding-top: 0px">
        <slot></slot>
      </div>
    </component>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "MediaCard",
  props: {
    image: {
      type: String,
      default: "https://bulma.io/images/placeholders/96x96.png"
    },
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    titleSize: {
      type: Number,
      default: 5
    },
    subtitleSize: {
      type: Number,
      default: 6
    },
    tag: {
      type: String,
      default: "div"
    },
    to: {
      type: String,
      default: ""
    },
    rounded: {
      type: Boolean,
      default: false
    },
    isFit: {
      type: Boolean,
      default: false
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
