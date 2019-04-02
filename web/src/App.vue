<template lang='pug'>
  #app
    top
    router-view
    //- bottom
</template>

<script>
import top from '@/components/layout/header.vue'

export default {
  name: 'app',
  components: {
    top
  },
}
</script>

<style lang='scss'>
@import "./assets/sass/app.scss";

</style>
