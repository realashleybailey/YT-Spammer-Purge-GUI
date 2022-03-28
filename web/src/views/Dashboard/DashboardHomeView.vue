<template>
  <div class="dashboard-home-view">
    <!-- Profile View Component -->
    <ProfileCard />

    <!-- More buttons -->
    <!-- <CardComponent>
      <div class="buttons is-flex is-justify-content-space-between">
        <b-button tag="router-link" :to="{ path: '/comments' }" class="button is-primary is-small">
          <span>Scan Comments</span>
        </b-button>
      </div>
    </CardComponent> -->

    <!-- Statistics and charts -->
    <Tiles :maxPerRow="3">
      <CardWidget label="Total Comments" :number="totalComments" pack="fa" icon="comment-dots" />
      <CardWidget label="Total Spam" :number="totalComments" pack="fa" icon="comment-slash" />
      <MediaCard v-if="mostPopularComment != null" :title="mostPopularComment.commentAuthor" subtitle="Most popular comment" :image="mostPopularComment.commentAuthorProfilePicture" :isMobile="true" :rounded="true">
        <p style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis">
          {{ mostPopularComment.commentText }}
        </p>
        <div class="buttons is-flex is-justify-content-flex-end pt-3">
          <b-button tag="a" target="_blank" :href="`https://www.youtube.com/watch?v=${mostPopularComment.videoId}&lc=${mostPopularComment.commentId}`" class="button is-primary is-small">View Comment</b-button>
        </div>
      </MediaCard>
    </Tiles>

    <Tiles :maxPerRow="2">
      <CardComponent v-if="chartData !== null" title="Video with Most Comments" icon="finance" header-icon="reload" @header-icon-click="updateChartData()">
        <div v-if="chartData" class="chart-area">
          <LineChart :chartData="chartData" :extraOptions="chartOptions" />
        </div>
      </CardComponent>
    </Tiles>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue"
import CardComponent from "../../components/CardComponent.vue"
import CardWidget from "../../components/CardWidget.vue"
import * as chartConfig from "../../components/Charts/chart.config.js"
import LineChart from "../../components/Charts/LineChart.vue"
import ProfileCard from "../../components/ProfileCard.vue"
import Tiles from "../../components/Tiles.vue"
import { Comment } from "../../types/comment.type"
import MediaCard from "../../components/MediaCard.vue"

export default Vue.extend({
  name: "DashboardHomeView",
  components: {
    ProfileCard,
    CardComponent,
    Tiles,
    CardWidget,
    MediaCard,
    LineChart
  },
  data() {
    return {
      chartData: null as any,
      chartOptions: chartConfig.chartOptionsMain,
      mostPopularComment: null as Comment | null
    }
  },
  methods: {
    updateChartData() {
      const commentsArray = this.$store.state.comments as Comment[]

      // If there are no comments, return null
      if (commentsArray.length === 0) {
        return null
      }

      // Group comments based on video id
      const groupedComments = commentsArray.reduce((acc: { [x: string]: any[] }, comment: { videoId: string | number }) => {
        if (!acc[comment.videoId]) {
          acc[comment.videoId] = []
        }

        acc[comment.videoId].push(comment)

        return acc
      }, {})

      const labels: string[] = []
      const data: number[] = []

      // Generate labels and data
      for (const [videoId, comments] of Object.entries(groupedComments)) {
        // Add label and data
        labels.push(videoId)
        data.push(comments.length)
      }

      // Set chart data
      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: "Comments",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: data
          }
        ]
      }
    },
    getMostPopularComment() {
      // Get all comments
      const commentsArray = this.$store.state.comments as Comment[]

      // If there are no comments, return null
      if (commentsArray.length === 0) {
        return null
      }

      // Find most popular comment based on commentTotalLikeCount
      const mostPopularComment = commentsArray.reduce((acc: Comment, comment: Comment) => (comment.commentTotalLikeCount > acc.commentTotalLikeCount ? comment : acc))

      console.log(mostPopularComment)

      // Set most popular comment
      this.mostPopularComment = mostPopularComment
    }
  },
  computed: {
    totalComments() {
      return this.$store.state.comments.length || 0
    }
  },
  mounted() {
    this.updateChartData()
    this.getMostPopularComment()
    console.log(((document as any).test = this))
  }
})
</script>
