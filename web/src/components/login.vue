<template lang='pug'>
  #login
    b-container
      b-row.mt-5(align-h="center")
        b-col(cols="5")
          b-card.p-3
            h3.mb-4 Login
            b-form(@submit='onSubmit', @reset='onReset', v-if='show')
              b-form-group#exampleInputGroup1(label='Email address:', label-for='exampleInput1')
                b-form-input#exampleInput1(type='email', v-model='form.email', required='', placeholder='Enter email')
              b-form-group#exampleInputGroup2(label='Password:', label-for='exampleInput2')
                b-form-input#exampleInput2(type='password', v-model='form.password', required='', placeholder='Enter name')
              b-form-group#exampleGroup4
                b-form-checkbox-group#exampleChecks(v-model='form.checked')
                  b-form-checkbox(value='remember') Remember me
              .d-flex.justify-content-between
                div
                  b-button(type='submit', variant='primary') Submit
                  |&nbsp;
                  b-button(type='reset', variant='danger') Reset
                div
                  a(href='#' v-b-modal.modal1) Forgot Password
    b-modal#modal1(title="Forgot Password")
      b-img(src="https://ih0.redbubble.net/image.418429827.6579/ap,550x550,12x16,1,transparent,t.u4.png", fluid alt="Responsive image")
   
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
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
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

<style>
</style>
