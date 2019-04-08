<template lang='pug'>
  #posts
    section
      h1.title This is the posts.index page
      router-link.button.is-primary.is-pulled-right(to="/admin/posts/create")
        i.fa.fa-user-plus.m-r-10
        |  Create New Post

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
