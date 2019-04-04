<template lang='pug'>
  #dashboard.m-t-30
    .side-menu
      aside.menu.m-l-10
        //- span.icon
        //-   i.fa.fa-fw.fa-user-circle-o.m-r-5
        b-icon.m-r-5(icon="dashboard" size="is-small")
        span.menu-label Dashboard
        //- p.menu-label Dashboard
        ul.menu-list
          li
            router-link(to="/admin/general") General
        p.menu-label Content
        ul.menu-list
          li
            router-link(to="/admin/posts") Blog Posts
        p.menu-label Administration
        ul.menu-list
          li
            a(href="#") Manage Users
            a(href="#") Roles &amp; Permissions
    .section.main-content
      router-view

</template>
<script>

export default {
  name: '',
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
  margin-left: 200px;
}
</style>
