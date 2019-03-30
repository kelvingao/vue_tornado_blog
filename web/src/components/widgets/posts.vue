<template lang="pug">
  .container
    .row
      .col-sm-12
        .jumbotron
          .container
            span.display-4.h1 珂想而知
            p.lead
              | 在线视频教育
            section(v-for='post in recentPosts(limit)')
              h2 {{ post.title }}
              router-link.btn.btn-primary(:to="'/posts/' + post.slug") read more
              hr
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      limit: '',
    }
  },
  computed: {
    ...mapGetters({
      recentPosts: "recentPosts",
    })
  },
  beforeMount() {
    this.$store.dispatch("GET_POSTS", { limit: this.limit /* could other value */});
  }
}
</script>

<style>

</style>



