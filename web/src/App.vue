<template lang='pug'>
  #app
    top
    .site-content
      router-view
    bottom
</template>

<script>
import top from '@/components/layout/header.vue'
import posts from '@/components/widgets/posts.vue'
import bottom from '@/components/layout/footer.vue'

export default {
  name: 'app',
  components: {
    top,
    posts,
    bottom
  },
}
</script>

<style>

body {
  background:#EEF1F4;
  font-family: 'Lato', sans-serif;
}
</style>
