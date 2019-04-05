<template lang='pug'>
  //- refs: https://codepen.io/andreich1980/pen/OmobJQ
  #admin
    .main-content.columns.is-fullheight
      //- sidebar container
      aside.column.is-2.is-narrow-mobile.is-fullheight.section.is-hidden-mobile
        p.menu-label.is-hidden-touch Dashboard
        ul.menu-list
          li
            router-link(to='2') Home
            router-link(to='3') Links
              ul
                li
                  router-link(to='4') Link1
                  router-link(to='1') Link2
            router-link(to='2') About
      //- main-container
      .column.is-10
        .section
          .card
            .card-header
              p.card-header-title header
            .card-content
              .content Content

</template>
<script>
import Sidebar from './sidebar';
export default {
  name: '',
  data() {
    return {
     
    }
  },
  components:{
    Sidebar
  },
  methods: {
   
  }
  
}
</script>

<style scoped>
  aside {
    height: 100vh;
    background-color: whitesmoke;
  }
</style>
