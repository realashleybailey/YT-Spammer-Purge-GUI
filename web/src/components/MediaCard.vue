<template>
  <div class="card" style="width: 100%">
    <component :is="tag" :to="to">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <img :src="image" class="image is-48x48" style="object-fit: contain" />
          </div>
          <div class="media-content">
            <p class="title is-5">{{ title }}</p>
            <p class="subtitle is-6">{{ subtitle }}</p>
          </div>
        </div>
      </div>
      <div class="content">
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
    tag: {
      type: String,
      default: "div"
    },
    to: {
      type: String,
      default: ""
    }
  }
})
</script>
