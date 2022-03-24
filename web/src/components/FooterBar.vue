<template>
  <footer v-show="isFooterBarVisible" class="footer">
    <div class="container-fluid">
      <div class="footer-copyright">
        <b>
          <a
            href="https://github.com/vikdiesel/admin-one-vue-bulma-dashboard"
            target="_blank"
            >Ashley Bailey</a
          >
        </b>
        <span style=""> &bull; </span>
        <span>&copy; {{ year }} </span>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "FooterBar",
  data() {
    return {
      year: new Date().getFullYear()
    }
  },
  computed: {
    ...mapState(["isFooterBarVisible"])
  }
}
</script>
