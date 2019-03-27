<template lang="pug">
  article.col-sm-12
    h1 hello.world
    //- p {{ post.html.rendered }}
    div(v-html= "this.html")
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      post: {},
      comments: [],
      showCommentBox: true,
      html:'<h1 class="ql-align-center"><span class="ql-font-serif" style="color: rgb(255, 255, 255); background-color: rgb(240, 102, 102);"> I am Example 1! </span></h1>'
    }
  },
  created() {
    alert(this.$route.params.postSlug)
    // axios.get("http://localhost:5000/blog/" + this.$route.params.slug)
    //   .then((resp) => {
    //     this.post = resp.data
    //     console.log(this.post)
    //   })
    //   .catch((e) => {
    //     console.error(e)
    //   })
  },
  methods: {
   
  }
}
</script>

<style>

</style>


