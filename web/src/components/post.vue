<template lang="pug">
  article.col-sm-12
    h1 {{ post.title }}
    p {{ post.body }}
    
    h2 Discussion
    button.btn.btn-primary(@click='showComments', v-if='!showCommentBox') show comments
    ul.list-group(v-if='showCommentBox')
      li.list-group-item(v-for='comment in comments')
        strong {{ comment.email }}
        em wrote:
        |  {{ comment.body }}
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
    axios.get("http://jsonplaceholder.typicode.com/posts/" + this.$route.params.id)
      .then((resp) => {
        this.post = resp.data
      })
      .catch((e) => {
        console.error(e)
      })
  },
  methods: {
    showComments(){
      axios.get("http://jsonplaceholder.typicode.com/comments?postId=" + this.$route.params.id)
        .then((resp) => {
          this.comments = resp.data
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }
}
</script>

<style>

</style>


