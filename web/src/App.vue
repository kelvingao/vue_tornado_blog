<template lang='pug'>
  #app
    top
    router-view
    //- bottom
</template>
<script>
import axios from 'axios'
import top from '@/components/layout/header.vue'
import bottom from '@/components/layout/footer.vue'

export default {
  name: 'app',
  components: {
    top,
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
