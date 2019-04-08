<template lang="pug">
  //- 
  #posts-page
    .home-container
      .container.p-5
        .post-container(:key="post.id" v-for="post in posts")
          .title
            router-link(:to="'/posts/' + post.slug") {{ post.title.rendered }}
          .content(v-html="post.content.rendered")
          hr
  

</template>

<script>
import api from '@/api'

export default {
  name: 'PostsPage',
  data() {
    return {
      posts: [],
    }
  },
  beforeMount() {
    api.getWPPosts().then(resp => {
      this.posts = resp;
    })
    .catch(err => {
      console.log(err)
    })
  }
 
}
</script>

<style lang="scss">

//refs: https://www.youtube.com/watch?v=k7olvEeBM2I

/* Theme Name: Learning Wordpress
Author: Kelvin Gao
Author URI: https://github.com/kelvingao
Version: 1.0
*/

body {
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #333;
}

// a:link,
// a:visited {
//   color: #006ec3;
// }

p {
  line-height: 1.65em;
}
</style>



