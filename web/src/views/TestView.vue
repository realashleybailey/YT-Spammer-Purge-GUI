<template>
  <div class="page-filler">
    <div class="swipe-card-page">
      <transition name="fady">
        <h1 v-if="!empty" class="is-size-4-touch is-size-2-desktop" style="text-align: center; position: absolute; padding: 8vh; width: 100%; text-transform: uppercase; font-weight: bolder">Spam Swiper</h1>
      </transition>
      <transition name="fady">
        <div v-if="empty" style="width: 100%; height: 100%" class="d-flex is-justify-content-center is-align-items-center">
          <div class="pulsating-circle"></div>
          <div style="position: absolute; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; flex-direction: column">
            <b-icon pack="fa" icon="comment-slash" custom-size="fa-5x"></b-icon>
            <p class="is-size-4 pt-6">Try again later...</p>
          </div>
        </div>
      </transition>
      <div class="swipe-card-container">
        <SwipeCards v-for="(card, index) in cards.results" :key="index" v-bind:current="index === cards.index" v-bind:comment="decodeHTMLString(card.comment) | stripHTML" v-bind:approved="card.approved" v-on:draggedThreshold="setApproval"> </SwipeCards>
      </div>
      <transition name="fady">
        <div v-if="!empty" class="swipe-labels">
          <div class="spam" @click="setApproval(false)">
            <b-icon custom-size="fa-2x" pack="fa" icon="trash"></b-icon>
          </div>
          <div class="not-spam" @click="setApproval(true)">
            <b-icon custom-size="fa-2x" pack="fa" icon="heart"></b-icon>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
.swipe-labels {
  position: absolute;
  bottom: 0px;

  display: flex;
  justify-content: space-between;

  flex-direction: row;

  width: 100%;

  .spam {
    background: #1e1f24;
    color: #fff;
    padding: 50px 50px 30px 30px;
    border-top-right-radius: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 15vh;
    width: 15vh;

    max-height: 200px;
    max-width: 200px;

    .icon > i {
      font-weight: bolder;
      transform: rotate(45deg);
      text-align: center;
      color: #f14668;
      color: #4a4a4a;
    }
  }

  .not-spam {
    background: #1e1f24;
    color: #fff;
    padding: 50px 30px 30px 50px;
    border-top-left-radius: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 15vh;
    width: 15vh;

    max-height: 200px;
    max-width: 200px;

    .icon > i {
      font-weight: bolder;
      transform: rotate(-45deg);
      text-align: center;
      color: #f14668;
    }
  }
}
</style>
<script>
import Vue from "vue"
import SwipeCards from "../components/SwipeCards.vue"
import he from "he"

export default Vue.extend({
  name: "HelloWorld",
  components: {
    SwipeCards
  },
  data() {
    return {
      empty: false,
      cards: {
        results: [],
        index: 0
      }
    }
  },
  filters: {
    decodeHTMLString(str) {
      return he.decode(str)
    },
    stripHTML(str) {
      const div = document.createElement("div")
      div.innerHTML = str
      const text = div.textContent || div.innerText || ""
      return text
    }
  },
  methods: {
    setApproval(approval) {
      console.log(approval)
      this.cards.results[this.cards.index].approved = approval
      this.cards.index++

      if (this.cards.index >= this.cards.results.length) {
        this.empty = true
      }
    },
    decodeHTMLString(html) {
      return he.decode(html)
    }
  },
  mounted() {
    const comments = this.$store.state.comments.slice(0, 5).map((comment) => {
      return {
        comment: comment.snippet.topLevelComment.snippet.textDisplay,
        approved: null
      }
    })
    this.cards.results = comments
  }
})
</script>
