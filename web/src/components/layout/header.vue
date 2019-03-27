<template lang='pug'>
  #top
    b-navbar.nav-background(toggleable='lg', type='dark')
      b-navbar-brand(href='/') kethoughts
      b-navbar-toggle(target='nav_collapse')
      b-collapse#nav_collapse(is-nav='')
        b-navbar-nav
          b-nav-item(href='#') Link
          b-nav-item(href='#', disabled='') Disabled
      // Right aligned nav items
      b-navbar-nav.ml-auto
        b-nav-form
          b-form-input.mr-sm-2(size='sm', type='text', placeholder='Search')
            b-button.my-2.my-sm-0(size='sm', type='submit') Search
        b-navbar-nav(v-if='!isAuthenticated')
          b-nav-item(to='/login') login
          b-nav-item(to='/register') Sign Up
        b-navbar-nav(v-if='isAuthenticated')
          b-nav-item(to='/compose') New Post
          b-nav-item(@click="logout") Kelvingao

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
        this.$store.dispatch('AUTH_LOGOUT').then(() => this.$router.push('/login'))
    }
  }
}
</script>

<style>
.nav-background {
  background: #353535;
}
</style>