<template>
  <Tiles :maxPerRow="4">
    <template v-for="option in options">
      <PricingCard :key="option.title" :title="option.title" :subtitle="option.subtitle" :description="option.description" :buttonText="option.buttonText" :buttonLink="option.buttonLink" :imageLink="option.imageLink" />
    </template>
  </Tiles>
</template>

<script lang="ts">
import Vue from "vue"
import Tiles from "../../components/Tiles.vue"
import PricingCard from "../../components/PricingCard.vue"

export default Vue.extend({
  name: "PricingHomeView",
  components: {
    Tiles,
    PricingCard
  },
  data() {
    return {
      options: [
        {
          title: "Hobby",
          subtitle: "£0 per month",
          description: "For none commercial use, free to use. Scan up to 200 comments per month.",
          buttonText: "Get started",
          buttonLink: "/pricing/hobby",
          imageLink: require("../../assets/img/hobby.svg")
        },
        {
          title: "Standard",
          subtitle: "£10 per month",
          description: "For the small creator. Scan up to 1,000 comments per month.",
          buttonText: "Get started",
          buttonLink: "/pricing/standard",
          imageLink: require("../../assets/img/personal.svg")
        },
        {
          title: "Premium",
          subtitle: "£50 per month",
          description: "For the big creator. Scan up to 1,000,000 comments per month.",
          buttonText: "Get started",
          buttonLink: "/pricing/premium",
          imageLink: require("../../assets/img/creator.svg")
        },
        {
          title: "Enterprise",
          subtitle: "Speak to us",
          description: "We maybe able to help you, get in touch and we'll talk.",
          buttonText: "Contact us",
          buttonLink: "/contact",
          imageLink: require("../../assets/img/expert.svg")
        }
      ]
    }
  }
})
</script>
