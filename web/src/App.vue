<template lang='pug'>
  #app
    top
    #header header
    #nav nav
    #search search
    #user user
    #news news
    #pic pic
    #rec rec
    #sidebar-right sidebar-right
    #picnews picnews
    #newslist newslist
    #link link
    #footer footer
   
</template>
<script>
import top from '@/components/layout/header.vue'

export default {
  name: 'app',
  components: {
    top
  }
  
}
</script>

<style>
body, h1, h2, h3, p, form, ul, li, dl, dt, dd {
  padding: 0;
  margin: 0;
}
body {
  width: 960px;
  margin:0 auto;
  /* border: 1px solid black; */
  background: #fff;
}
#header {
  height: 80px;
  background: green;
  margin: 0 0 10px 0;
}

#nav {
  height: 35px;
  background: navy;
}

#search {
  height: 35px;
  background: maroon;
  margin: 0 0 10px 0;
}

#user {
  width: 270px;
  height: 400px;
  background: orange;
  float: right;
  margin: 0 0 10px 0;
}

#news {
  width: 400px;
  height: 400px;
  background: blue;
  float: right;
  margin: 0 10px 10px 0;
}

#pic {
  width: 270px;
  height: 195px;
  background: blue;
  float: left;
  margin: 0 0 10px 0;
}

#rec {
  width: 270px;
  height: 195px;
  background: red;
  float: left;
  margin: 0 0 10px 0;
}

#sidebar-right {
  width: 270px;
  height: 835px;
  background: red;
  float: right;
  margin: 0 0 10px 0;
}

#picnews {
  width: 680px;
  height: 200px;
  background: yellow;
  float: left;
  margin: 0 0 10px 0;
}

#newslist {
  width: 680px;
  height: 625px;
  background: pink;
  float: left;
  margin: 0 0 10px 0;
}

#link {
  width: 960px;
  height: 110px;
  background: orange;
  float: left;
  margin: 0 0 10px 0;
}

#footer {
  width: 960px;
  height: 40px;
  background: blue;
  float: left;
}
</style>
