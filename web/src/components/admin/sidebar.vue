<template lang='pug'>
  #sidebar
      aside
        //- span.icon
        //-   i.fa.fa-fw.fa-user-circle-o.m-r-5
        b-icon.m-r-5(icon="dashboard" size="is-small")
        p.menu-label Dashboard
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

</template>
<script>

export default {
  name: 'general',
  data() {
    return {
     
    }
  },
  methods: {
   
  }
  
}
</script>

<style scoped>
/* .side-menu{
  position: fixed;
  height: 100vh;
  width: 200px;
  background-color: white;
  overflow-y: scroll;
} */
#sidebar {
  height: 100%;
}
</style>
