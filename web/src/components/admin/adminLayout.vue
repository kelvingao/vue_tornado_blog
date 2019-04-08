<template lang='pug'>
  //- refs: https://codepen.io/andreich1980/pen/OmobJQ
  #admin
    .main-content.columns.is-marginless.is-fullheight
      //- sidebar container
      aside.column.is-2.is-narrow-mobile.is-fullheight.section.is-hidden-mobile
        p.menu-label.is-hidden-touch
          b-icon.m-r-5(icon="tachometer-alt" size="is-normal")
          | Dashboard
        ul.menu-list
          li
            router-link(to='/admin/general') Performance Analytics
            
        p.menu-label.is-hidden-touch
          b-icon.m-r-5(icon="file-video" size="is-normal")
          | CMS Content
        ul.menu-list
          li
            router-link(to='/admin/posts') Blog Posts
            a.has-submenu Roles & Permissions
            ul.submenu
              li
                router-link(to='/admin/roles') Roles
                router-link(to='/admin/permissons') Permissions

        p.menu-label.is-hidden-touch
          b-icon.m-r-5(icon="user-cog" size="is-normal")
          | Administration
        ul.menu-list
          li
            router-link(to='2') Manage Users
      
      #main-container.column.is-10
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
  mounted() {
    // get all has-subment elements
    const accordions = this.$el.querySelectorAll('.has-submenu');

    for(var i=0; i< accordions.length; i++) {
      accordions[i].onclick = () => {
        // this.classList.toggle('is-active');

        // get submenu element
        const submenu = this.$el.querySelector('.submenu');
        if (submenu.style.maxHeight) {
          this.setSubmenuStyles(submenu, null, null)
        } else {
          this.setSubmenuStyles(submenu,submenu.scrollHeight + "px", "0.75em")
        }
      }
    }

  },
  methods: {
    setSubmenuStyles (submenu, maxHeight, margins) {
      submenu.style.maxHeight = maxHeight
      submenu.style.marginTop = margins
      submenu.style.marginBottom = margins
    },
  }
  
}
</script>

<style scoped>
  aside {
    height: 100vh;
    background-color: whitesmoke;
  }
  #main-container {
    height: 100vh;
  }

  .submenu {
    max-height: 0;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
  }
  
  .menu-list li ul{
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
