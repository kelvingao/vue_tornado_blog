<template lang="pug">
  article.col-sm-12
    h1 {{ post.title }}
    p {{ post.markdown }}
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      post: {},
      comments: [],
      showCommentBox: true,
    }
  },
  created() {
    console.log(this.$route.params)
    axios.get("http://localhost:5000/blog/" + this.$route.params.slug)
      .then((resp) => {
        this.post = resp.data
      })
      .catch((e) => {
        console.error(e)
      })
  },
  methods: {
    // showComments(){
    //   axios.get("http://jsonplaceholder.typicode.com/comments?postId=" + this.$route.params.id)
    //     .then((resp) => {
    //       this.comments = resp.data
    //     })
    //     .catch((e) => {
    //       console.error(e)
    //     })
    // }
  }
}
</script>

<style>

</style>


