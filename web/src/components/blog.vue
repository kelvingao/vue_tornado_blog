<template lang="pug">
  .container
    .row
      .col-sm-12
        .jumbotron
          .container
            span.display-4.h1 Vue.js Blog Tutorial #1
            p.lead
              | Simple example how to connect to the server, paginate results, create single page app...
      section(v-for='blog in posts')
        h2 {{ blog.title }}
        router-link.btn.btn-primary(:to="'/post/' + blog.id") read more
        hr
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      posts: [],
    }
  },
  created() {
    axios.get("http://jsonplaceholder.typicode.com/posts")
      .then((resp) => {
        this.posts = resp.data
      })
      .catch((e) => {
        console.error(e)
      })
  }
}
</script>

<style>

</style>



