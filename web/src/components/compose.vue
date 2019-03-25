<template lang="pug">
  #compose
    h2 Add a New Post
    b-form(@submit='onSubmit' @reset='onReset')
      b-form-group(label="Title:")
        b-form-input(type='text', required='', v-model="blog.title" placeholder='Enter email')
      b-form-group(label="Blog Content:")
        b-form-textarea(id="textarea" v-model="blog.content" placeholder="Enter something..." rows="3" max-rows="6")
      b-button(type='submit', variant='primary') Submit

</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      blog: {
        title: '',
        content: ''
      }
    }
  },
  created() {
    // axios.defaults.baseURL = 'https://api.example.com';
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization')
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      //alert(JSON.stringify(this.blog))
      axios.post('http://localhost:5000/compose?title='+ this.blog.title +'&markdown=' + this.blog.content)
        .then(resp => {
            this.$router.push('/')
        })
    },
    onReset() {
        return
    }
  }
}
</script>

<style>
#compose * {
    box-sizing: border-box;
    max-width: 500px;
}
#compose {
    margin: 20px auto;
}
</style>


