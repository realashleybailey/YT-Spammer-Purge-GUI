<template>
  <div class="dashboard-home">
    <!-- Profile View Component -->
    <ProfileCard />
    <VerifyEmail />
    <GetStarted />

    <!-- Statistics and charts -->
    <Tiles :maxPerRow="3">
      <CardWidget v-if="totalComments > 0" label="Total Comments" :number="totalComments" pack="fa" icon="comment-dots">
        <div class="buttons is-flex is-justify-content-flex-start" style="width: 100%">
          <b-button tag="router-link" to="/view/comments" class="button is-primary is-small">View Comments</b-button>
        </div>
      </CardWidget>
      <CardWidget v-if="totalComments > 0" label="Total Spam" :number="totalComments" pack="fa" icon="comment-slash">
        <div class="buttons is-flex is-justify-content-flex-start" style="width: 100%">
          <b-button tag="router-link" to="/view/spam" class="button is-primary is-small">View Spam</b-button>
        </div>
      </CardWidget>
      <MediaCard v-if="mostPopularComment != null" :title="mostPopularComment.snippet.authorDisplayName" subtitle="Most popular comment" :image="mostPopularComment.snippet.authorProfileImageUrl" :isMobile="true" :rounded="true">
        <p style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; width: 100%">
          {{ decodeHTMLString(mostPopularComment.snippet.textDisplay) }}
        </p>
        <div class="buttons is-flex is-justify-content-space-between pt-3" style="width: 100%">
          <b-tag icon="thumbs-up" icon-pack="fa">{{ mostPopularComment.snippet.likeCount }}</b-tag>
          <b-button tag="a" target="_blank" :href="`https://www.youtube.com/watch?v=${mostPopularComment.snippet.videoId}&lc=${mostPopularComment.id}`" class="button is-primary is-small">View Comment</b-button>
        </div>
      </MediaCard>
    </Tiles>

    <div v-if="totalComments <= 0" class="empty-state has-text-centered">
      <div class="subtitle has-text-muted">Run your first scan now to get started.</div>
    </div>

    <CardComponent v-if="chartData !== null" title="Most Commented Videos" icon="finance" header-icon="reload" @header-icon-click="updateChartData()">
      <div v-if="chartData" class="chart-area">
        <LineChart :chartData="chartData" :extraOptions="chartOptions" />
      </div>
    </CardComponent>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

import ProfileCard from "../../components/ProfileCard.vue"
import VerifyEmail from "../../components/Settings/VerifyEmail.vue"
import GetStarted from "../../components/GetStarted.vue"
import CardComponent from "../../components/CardComponent.vue"
import CardWidget from "../../components/CardWidget.vue"
import LineChart from "../../components/Charts/LineChart.vue"
import Tiles from "../../components/Tiles.vue"
import MediaCard from "../../components/MediaCard.vue"

import { ChartData, ChartOptions } from "chart.js"
import { Comment } from "@/types/comment.type"

import he from "he"

export default Vue.extend({
  name: "DashboardHome",
  components: {
    ProfileCard,
    VerifyEmail,
    GetStarted,
    CardComponent,
    CardWidget,
    LineChart,
    Tiles,
    MediaCard
  },
  data() {
    return {
      chartData: null as ChartData | null,
      chartOptions: null as ChartOptions | null,
      chartSettings: { datasets: [{ label: "Total" }] },
      mostPopularComment: null as Comment | null
    }
  },
  methods: {
    async startNow() {
      this.$store.dispatch("startNow")
    },
    async fetchChartData() {
      return await this.$store.dispatch("getCommentsChartData", this.chartSettings)
    },
    async fetchMostPopularComment() {
      return await this.$store.dispatch("getMostPopularComment")
    },
    decodeHTMLString(html: string) {
      return he.decode(html)
    }
  },
  computed: {
    totalComments() {
      return this.$store.state.comments.length || 0
    }
  },
  async mounted() {
    const [chartData, chartOptions] = await this.fetchChartData()
    console.log(chartOptions)
    this.chartData = chartData
    this.chartOptions = chartOptions

    this.mostPopularComment = await this.fetchMostPopularComment()
  }
})
</script>
