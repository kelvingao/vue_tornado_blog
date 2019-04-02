<template lang='pug'>
  #posts
    .columns
      .column
        h1.title This is the posts.index page
      .column
        router-link.button.is-primary.is-pulled-right(to="/dashboard/posts/create")
          i.fa.fa-user-plus.m-r-10
          |  Create New Post
    hr.m-t-0

</template>
<script>

export default {
  name: 'posts',
  data() {
    return {
     
    }
  },
  methods: {
   
  }
  
}
</script>

<style scoped>
  
</style>
