<template lang='pug'>
  #app
    top
    login
   
</template>
<script>
import top from '@/components/layout/header.vue'
import login from '@/components/login.vue'

export default {
  name: 'app',
  components: {
    top,
    login
  }
}
</script>

<style>

body {
  background:#EEF1F4;
  font-family: 'Lato', sans-serif;
}
</style>
