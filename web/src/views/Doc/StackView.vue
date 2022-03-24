<template>
  <div class="doc-stack">
    <div class="title">Tech Stack</div>
    <div class="subtitle">A stack of technologies used to build this project, and why we use specific technologies. We use specific technologies to make this project possible.</div>

    <Tiles :maxPerRow="3">
      <MediaCard tag="router-link" to="/doc/stack/firebase" title="Firebase" subtitle="Alphabet Inc" :image="require('../../assets/img/logos/Firebase.png')"></MediaCard>
      <MediaCard tag="router-link" to="/doc/stack/github" title="GitHub" subtitle="GitHub Inc" :image="require('../../assets/img/logos/GitHub.png')"></MediaCard>
      <MediaCard tag="router-link" to="/doc/stack/fontawesome" title="Font Awesome" subtitle="Font Awesome Team" :image="require('../../assets/img/logos/FontAwesome.png')"></MediaCard>
      <MediaCard tag="router-link" to="/doc/stack/vuejs" title="Vue.js" subtitle="Evan You" :image="require('../../assets/img/logos/VueJS.png')"></MediaCard>
      <MediaCard tag="router-link" to="/doc/stack/googleanalytics" title="Google Analytics" subtitle="Alphabet Inc" :image="require('../../assets/img/logos/GoogleAnalytics.png')"></MediaCard>
    </Tiles>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Tiles from "../../components/Tiles.vue"
import MediaCard from "../../components/MediaCard.vue"

export default Vue.extend({
  name: "StackView",
  components: {
    Tiles,
    MediaCard
  }
})
</script>
