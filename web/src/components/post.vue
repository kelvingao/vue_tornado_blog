<template lang="pug">
  .container
    .row
      .jumbotron
        .container
          section.col-sm-12
            h1 {{ post.title }}
            div(v-html= "post.markdown")
            .detail-admin
              //- p 发布于 {{ post.published | formatDate('yyyy-MM-dd') }}
              //- p  更新于 {{ post.updated | formatDate('yyyy-MM-dd') }}
              p.admin-del(v-if='isAuthenticated')
                div
                  b-button(v-b-modal.modal-1='') Delete
                  |&nbsp;
                  b-button Edit
                  b-modal#modal-1(title='Want to delete?' ok-variant="danger" @ok="del(post.id)")
                    p.my-4 Can't resume after deletation!
                  
                //- a(@click='del(post.id)') [删除]
                //- a(@click='edit(post.id)') [编辑]
</template>

<script>
import api from '@/api'
import { mapState, mapGetters } from 'vuex'
export default {
  beforeMount() {
    this.$store.dispatch('GET_POST', this.$route.params.slug)
  },
  computed: {
    ...mapState([
      'post',
    ]),
     ...mapGetters([
      'isAuthenticated'
    ])
  },
  methods: {
    del(id) {
      this.$store.dispatch('DELETE_POST', id)
        .then( () => this.$router.go(-1) )
    },
    edit(id) {
      // this.$router.push(`/admin/posts/${id}`)
    },
  }
}
</script>

<style>

</style>


