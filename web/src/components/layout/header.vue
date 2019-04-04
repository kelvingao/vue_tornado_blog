<template lang='pug'>
  #top
    nav.navbar.has-shadow
      .container
        .navbar-brand
          router-link.navbar-item.ispaddingless.brand-item(to='/')
            .text-logo Kethoughts.com
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
                router-link.navbar-item(to='#')
                  b-icon.m-r-5(icon='user-circle-o' size='is-small')
                  | Profile
                router-link.navbar-item(to='#')
                  b-icon.m-r-5(icon='bell' size='is-small')
                  | Notifications
                router-link.navbar-item(to="/admin")
                  b-icon.m-r-5(icon='cog' size='is-small')
                  | Manage
                hr.navbar-divider
                router-link.navbar-item(@click.native="logout" to='/home')
                  b-icon.m-r-5(icon='sign-out' size='is-small')
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
  /deep/ .text-logo {
    border-radius: 5px;
    // color: whitesmoke;
    font-size: 150%;
    font-weight: bold;
    background-color: whitesmoke;
    padding: 5px;
  }
  .button {
    margin-left: 0px;
  }
</style>
