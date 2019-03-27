<template lang="pug">
  .container
    .row
      .col-sm-12
        .jumbotron
          .container
            span.display-4.h1 珂想而知
            p.lead
              | 在线视频教育
            //- ul(v-if='recentPostsLoaded')
            //-   li(v-for='post in recentPosts(limit)', :key='post.id')
            //-     router-link(:to="'/posts/' + post.slug") {{ post.title }}
            //- div(v-else='') Loading...
            div(v-if='recentPostsLoaded')
              section(v-for='post in recentPosts(limit)')
                h2 {{ post.title }}
                router-link.btn.btn-primary(:to="'/posts/' + post.slug") read more
                hr
            div(v-else='') Loading...
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
      recentPostsLoaded: "recentPostsLoaded"
    })
  },
  mounted() {
    // console.log(this.$router.app);
    this.$store.dispatch("GET_POSTS", { limit: this.limit /* could other value */});
  }
}
</script>

<style>

</style>



