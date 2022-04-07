<template>
  <div class="doc-stack">
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <div class="title">Tech Stack</div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <b-button size="is-small" tag="router-link" to="/documentation">Back</b-button>
        </div>
      </div>
    </div>

    <div class="subtitle">A stack of technologies used to build this project, and why we use specific technologies. We use specific technologies to make this project possible.</div>

    <Tiles :maxPerRow="3">
      <MediaCard tag="router-link" to="/documentation/stack/firebase" title="Firebase" subtitle="Alphabet Inc" :image="require('../../assets/img/logos/Firebase.png')"></MediaCard>
      <MediaCard tag="router-link" to="/documentation/stack/github" title="GitHub" subtitle="GitHub Inc" :image="require('../../assets/img/logos/GitHub.png')"></MediaCard>
      <MediaCard tag="router-link" to="/documentation/stack/fontawesome" title="Font Awesome" subtitle="Font Awesome Team" :image="require('../../assets/img/logos/FontAwesome.png')"></MediaCard>
      <MediaCard tag="router-link" to="/documentation/stack/vuejs" title="Vue.js" subtitle="Evan You" :image="require('../../assets/img/logos/VueJS.png')"></MediaCard>
      <MediaCard tag="router-link" to="/documentation/stack/googleanalytics" title="Google Analytics" subtitle="Alphabet Inc" :image="require('../../assets/img/logos/GoogleAnalytics.png')"></MediaCard>
    </Tiles>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Tiles from "../../components/Tiles.vue"
import MediaCard from "../../components/MediaCard.vue"

export default Vue.extend({
  name: "DocStackView",
  components: {
    Tiles,
    MediaCard
  }
})
</script>
