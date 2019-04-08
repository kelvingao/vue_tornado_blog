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
                .button-wrapper.wrapper
                  button.button.is-small(v-b-modal.modal-1 @click.prevent="danger") Delete
                  button.button.is-small(@click.prevent="edit(post.id)") Edit
                  //- b-modal#modal-1(title='Want to delete?' ok-variant="danger" @ok="confirmCustomDelete")
                  //-   p.my-4 Can't resume after deletation!
                  
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
    danger() {
      this.$snackbar.open({
          duration: 5000,
          message: 'Snackbar with red action, positioned on bottom-left and a callback',
          type: 'is-danger',
          position: 'is-bottom-left',
          actionText: 'Undo',
          queue: false,
          onAction: () => {
              this.$toast.open({
                  message: 'Action pressed',
                  queue: false
              })
          }
      })
    }
  }
}
</script>

<style scoped>
.button {
  margin-left: 5px;
}
</style>


