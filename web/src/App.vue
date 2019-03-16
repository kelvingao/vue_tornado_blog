<template lang="pug">
  .container
    h1 Framework JS
    .row
      .col-sm-3(v-for="item in items" v-bind:key="item.id")
        .framework
        img.framework_image(v-bind:src="item.image")
        h3.text-center {{ item.title }}
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data() {
    return {
      items: [
        {
          id: 1,
          title: 'Vue.js',
          image: ''
        },
        {
          id: 2,
          title: 'Angular.js',
          image: ''
        },
        {
          id: 3,
          title: 'React.js',
          image: ''
        },
        {
          id: 4,
          title: 'Aurelia.js',
          image: ''
        },

      ]
    }
  }
  
}
</script>

<style lang="scss">

</style>
