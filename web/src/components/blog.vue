<template lang="pug">
  //- #blog(v-theme:column="'narrow'")
  #blog.container
    section.single-blog(v-for='post in recentPosts(limit)')
      h2 {{ post.title | to-uppercase }}
      //- h2(v-rainbow) {{ post.title }}
      //- article(v-html = "post.markdown")
      hr
      router-link.btn.btn-primary(:to="'/posts/' + post.slug") read more
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

<style scoped>

.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
}
</style>



