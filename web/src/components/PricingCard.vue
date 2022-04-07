<template>
  <div class="card">
    <div class="card-content is-flex is-justify-content-center" style="max-height: 150px">
      <img :src="imageLink" width="100px" />
    </div>
    <hr style="margin: 0px" />
    <div class="card-content">
      <div class="title">{{ title }}</div>
      <div class="subtitle">{{ subtitle }}</div>
      <div class="content">{{ description }}</div>
      <div class="buttons">
        <b-button tag="router-link" :to="buttonLink" type="is-primary" size="is-small" expanded>
          <strong>{{ buttonText }}</strong>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "PricingCard",
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    buttonLink: {
      type: String,
      required: true
    },
    imageLink: {
      type: String,
      required: true
    }
  }
})
</script>
