<template lang='pug'>
  #top
    nav.navbar.has-shadow.is-dark
      .container
        .navbar-brand.is-primary
          //- router-link.navbar-item.ispaddingless.brand-item(to='/')
          a.navbar-item.ispaddingless.brand-item.is-rounded(to='/')
            .logo.title.is-4.has-text-primary.has-background-light.p-5 #[strong Kethoughts.com]
          .navbar-burger.burger(@click="showNav = !showNav" :class="{'is-active' : showNav}")
            span
            span
            span

        .navbar-menu(:class="{ 'is-active' : showNav }")
          .navbar-start
            router-link.navbar-item.is-tab(to='/home')
              b-icon.m-r-5(icon="home") 
              | Home
            router-link.navbar-item.is-tab(to='/tutorials')
              b-icon.m-r-5(icon="video") 
              | Tutorials
            router-link.navbar-item.has-dropdown.is-hoverable(to='/docs')
              .navbar-link
                b-icon.m-r-5(icon="book") 
                | Docs
              .navbar-dropdown
                router-link.navbar-item(to='#') Jobs
                router-link.navbar-item(to='#') Contact
                hr.navbar-divider
                router-link.navbar-item(to='#') Report an issue

          .navbar-end
            .navbar-item
              b-field
                b-input(placeholder='Search...', type='search', icon='search' expanded)
                p.control
                  button.button.is-primary #[strong Search]

            .navbar-item(v-if="!isAuthenticated")
              .buttons
                router-link.button.is-primary.is-outlined(to='/register') #[strong SignUp]
                router-link.button.is-primary.is-inverted(to='/login') #[strong Login]

            .navbar-item(v-else).has-dropdown.is-hoverable
              .navbar-link Hey, Kelvingao
              .navbar-dropdown.is-left
                router-link.navbar-item(to='/profile')
                  b-icon.m-r-5(icon='user-circle')
                  | Profile
                router-link.navbar-item(to='/notifications')
                  b-icon.m-r-5(icon='bell')
                  | Notifications
                router-link.navbar-item(to="/admin")
                  b-icon.m-r-5(icon='cog')
                  | Manage
                hr.navbar-divider
                router-link.navbar-item(@click.native="logout" to='/home')
                  b-icon.m-r-5(icon='sign-out-alt')
                  | Logout

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      showNav: false,
    }
  },
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
  .logo {
    border-radius: 5px;
  }

</style>
