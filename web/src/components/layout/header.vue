<template lang='pug'>
  #top
    nav.navbar.has-shadow
      .container
        .navbar-brand
          router-link.navbar-item.ispaddingless.brand-item(to='/')
            //- img(src='images/devmarketer-logo.png' alt='KeThoughts logo')
            span.text-logo.is-primary Kethoughts.com
          router-link.navbar-item.is-tab.is-hidden-mobile.m-l-10(to='#') Learn
          router-link.navbar-item.is-tab.is-hidden-mobile(to='#') Discuss
          router-link.navbar-item.is-tab.is-hidden-mobile(to='#') Share
        .navbar-end.navbar-item
          b-input(placeholder='Search...', type='search' icon="search")
          button.button.is-primary Search
        .navbar-end.nav-menu(v-if="!isAuthenticated")
          router-link.navbar-item.is-tab(to='/login') Login 
          router-link.navbar-item.is-tab(to='/register') Sign Up
        .navbar-end.nav-menu(v-else)
          .navbar-item.has-dropdown.is-hoverable
            .navbar-link Hey, Superadministrator
            .navbar-dropdown.is-right
              router-link.navbar-item(to='#')
                span.icon
                  i.fa.fa-fw.fa-user-circle-o.m-r-5
                |&nbsp;Profile
              router-link.navbar-item(to='#')
                span.icon
                  i.fa.fa-fw.fa-bell.m-r-5
                |&nbsp;Notifications
              router-link.navbar-item(to="/dashboard")
                span.icon
                  i.fa.fa-fw.fa-cog.m-r-5
                |&nbsp;Manage
              hr.navbar-divider
              router-link.navbar-item(@click.native="logout" to='/login')
                span.icon
                  .fa.fa-fw.fa-sign-out.m-r-5
                |&nbsp;Logout

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ])
  },
  methods: {
    logout () {
        this.$store.dispatch('AUTH_LOGOUT')
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .text-logo {
    border-radius: 5px;
    // color: whitesmoke;
    font-size: 150%;
    font-weight: bold;
    background-color: whitesmoke;
    padding: 5px;
  }
</style>
