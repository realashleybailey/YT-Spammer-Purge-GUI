<template>
  <div class="homeview">
    <!-- Title Stack -->
    <TitleBar :title-stack="['YT Spammer Purge']" :centered="true">
      <div class="buttons is-hidden-desktop">
        <b-button tag="router-link" to="/login">Login</b-button>
        <b-button tag="router-link" to="/register">Signup</b-button>
      </div>
      <div class="buttons is-hidden-touch">
        <b-button tag="router-link" to="/doc">Read More</b-button>
      </div>
    </TitleBar>
    <!-- End Title Stack -->

    <!-- Hero Stack -->
    <HeroComponent title="Youtube Comments Made Easy" subtitle="This tool allows you to easily scan for and delete scam comments using several methods, a project branched off from the work done by" :centered="true">
      <template #subtitle-extra-bottom> <a class="has-text-primary" href="https://github.com/ThioJoe/YT-Spammer-Purge">ThioJoe</a>. </template>
    </HeroComponent>

    <HeroComponent title="Get Started" subtitle="To get started, click the button below to begin the setup.">
      <template #subtitle-extra-bottom>
        <br />
        <div class="pt-2">
          <b-button size="is-small">Get Started</b-button>
        </div>
      </template>
    </HeroComponent>

    <HeroComponent title="Tech Stack" subtitle="Checkout the tech stack used to build this project, and why we use specific technologies.">
      <template #subtitle-extra-bottom>
        <br />
        <div class="buttons pt-2">
          <b-button size="is-small" tag="router-link" to="/doc/stack">Read More</b-button>
          <b-button size="is-small" tag="a" target="_blank" href="https://stackshare.io/yt-spammer-purge/yt-spammer-purge#stack">View stackshare.io</b-button>
        </div>
      </template>
    </HeroComponent>

    <HeroComponent title="Github, Open Source" subtitle="This project is open source and free to use. You can find the source code on GitHub.">
      <template #subtitle-extra-bottom>
        <br />
        <div class="pt-2">
          <GithubButton href="https://github.com/realashleybailey/yt-spammer-purge-gui" data-color-scheme="no-preference: dark; light: light; dark: dark;" data-size="large" aria-label="View on GitHub">View on GitHub</GithubButton>
        </div>
      </template>
    </HeroComponent>

    <HeroComponent title="Your Data" subtitle="We understand that your data and security are important to you. We will never abuse the permission you give to us and you have the ability to revoke your permissions at any time.">
      <template #subtitle-extra-bottom>
        <br />
        <div class="pt-2">
          <GithubButton href="https://github.com/realashleybailey/yt-spammer-purge-gui/wiki/Your-Data" data-color-scheme="no-preference: dark; light: light; dark: dark;" data-size="large" aria-label="Read More">Read More</GithubButton>
        </div>
      </template>
    </HeroComponent>
    <!-- End Hero Stack -->
  </div>
</template>

<script>
import GithubButton from "vue-github-button"
import TitleBar from "../components/TitleBar.vue"
import HeroComponent from "../components/HeroComponent.vue"

export default {
  name: "HomeView",
  components: {
    GithubButton,
    TitleBar,
    HeroComponent
  }
}
</script>
