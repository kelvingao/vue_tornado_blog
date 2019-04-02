<template lang='pug'>
  #dashboard.m-t-30
    .side-menu
      aside.menu.m-l-10
        p.menu-label Genearl
        ul.menu-list
          li
            router-link(to="/dashboard/general") Dashboard
        p.menu-label Content
        ul.menu-list
          li
            router-link(to="/dashboard/posts") Blog Posts
        p.menu-label Administration
        ul.menu-list
          li
            a(href="#") Manage Users
            a(href="#") Roles &amp; Permissions
    .main-content
      router-view
</template>
<script>

export default {
  name: 'dashboard',
  data() {
    return {
     
    }
  },
  methods: {
   
  }
  
}
</script>

<style>
#dashboard {
  display: grid;
}
.side-menu{
  position: fixed;
  height: 100vh;
  width: 200px;
  background-color: white;
  overflow-y: scroll;
}
.main-content {
  margin-left: 220px;
}
</style>
