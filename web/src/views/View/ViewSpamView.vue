<template>
  <div class="spamview">
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <b-tag>Results {{ total }}</b-tag>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <b-tag>Page {{ current }} / {{ Math.ceil(total / perPage) }}</b-tag>
        </div>
      </div>
    </div>
    <template v-for="comment in comments">
      <MediaCard :title="comment.snippet.topLevelComment.snippet.authorDisplayName" :subtitle="formatDate(comment.snippet.topLevelComment.snippet.publishedAt)" :image="comment.snippet.topLevelComment.snippet.authorProfileImageUrl" :isMobile="true" :rounded="true" :key="comment.id">
        <p style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; width: 100%">
          {{ decodeHTMLString(comment.snippet.topLevelComment.snippet.textDisplay) }}
        </p>
        <div class="buttons is-flex is-justify-content-space-between pt-3" style="width: 100%">
          <b-tag icon="thumbs-up" icon-pack="fa">{{ comment.snippet.topLevelComment.snippet.likeCount }}</b-tag>
          <b-button tag="a" target="_blank" :href="`https://www.youtube.com/watch?v=${comment.snippet.topLevelComment.snippet.videoId}&lc=${comment.id}`" class="button is-primary is-small">View Comment</b-button>
        </div>
      </MediaCard>
    </template>
    <hr />
    <b-pagination :total="total" v-model="current" :range-before="rangeBefore" :range-after="rangeAfter" :order="order" :size="size" :simple="isSimple" :rounded="isRounded" :per-page="perPage" :change="callback()" aria-next-label="Next page" aria-previous-label="Previous page" aria-page-label="Page" aria-current-label="Current page"> </b-pagination>
  </div>
</template>

<script>
import Vue from "vue"
import MediaCard from "../../components/MediaCard.vue"

import chunk from "lodash/chunk"
import he from "he"

export default Vue.extend({
  name: "ViewSpamView",
  components: {
    MediaCard
  },
  data() {
    return {
      current: this.$route.query.p || 1,
      rangeBefore: 2,
      rangeAfter: 2,
      order: "desc",
      size: "is-small",
      isSimple: false,
      isRounded: false,
      perPage: 20
    }
  },
  computed: {
    total() {
      return this.$store.state.spam.length
    },
    comments() {
      // Get all comments from the store
      const comments = []

      this.$store.state.comments.forEach((comment) => {
        this.$store.state.spam.forEach((spam) => {
          if (comment.id === spam.id) {
            comments.push(comment)
          }
        })
      })

      // Sort the comments by date
      comments.sort(function (a, b) {
        return new Date(b.snippet.topLevelComment.snippet.publishedAt).valueOf() - new Date(a.snippet.topLevelComment.snippet.publishedAt).valueOf()
      })

      // Split the comments into chunks by the number of comments per page and return the current page
      const chunky = chunk(comments, this.perPage)[this.current - 1]

      // Return the current page of comments
      return chunky
    }
  },
  watch: {
    current(newVal) {
      this.$router.push({
        query: {
          p: newVal
        }
      })
    }
  },
  methods: {
    decodeHTMLString(html) {
      return he.decode(html)
    },
    formatDate(date) {
      return new Date(date).toLocaleString()
    },
    callback() {
      // window.scrollTo(0, 0)
    }
  }
})
</script>
