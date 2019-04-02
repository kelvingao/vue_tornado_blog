<template lang='pug'>
  #login
    .columns
      .column.is-one-third.is-offset-one-third.m-t-100
        .card
          .card-content
            h1.title Log In
            form(@submit="onSubmit", method='POST', role='form')
              .field
                label.label(for='email') Email Address
                p.control
                  input#email.input(class="", type='text', name='email', placeholder='name@example.com', v-model='form.email')
                //- p.help.is-danger This email is invalid
              .field
                label.label(for='password') Password
                p.control
                  input#password.input(class="", type='password', name='password', v-model='form.password')
                //- p.help.is-danger 
              b-checkbox.m-t-20( v-model='form.checked') Remember Me
              button.button.is-success.is-outlined.is-fullwidth.m-t-30 Log In
        h5.has-text-centered.m-t-20
          a.is-muted(href="") Forgot Your Password?
   
</template>
<script>

export default {
  name: 'login',
  data() {
    return {
      form: {
        email: '',
        password: '',
        checked: []
      },
      token:'',
      show: true
    }
  },
  methods: {
    //TODO: email and password check
    onSubmit(evt) {
      evt.preventDefault()
      // alert(JSON.stringify(this.form))

      const { email, password } = this.form
      this.$store.dispatch('AUTH_REQUEST', { email, password })
        .then(() => {
          this.$router.push('/')
        })
        .catch((e) => {
          console.error(e)
        })
    },
    onReset(evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
  
}
</script>

<style scoped>

</style>
