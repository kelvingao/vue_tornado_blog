<template lang="pug">
  #weixin
    .container
      h2 weixinpage
</template>

<script>
import api from '@/api'

export default {
  data() {
    return {
      requetPrams: {
        'signature': this.$route.query.signature,
        'echostr': this.$route.query.echostr,
        'timestamp': this.$route.query.timestamp,
        'nonce': this.$route.query.nonce
      }
    }
  },
  created() {
    api.getWXToken().then(resp => {
      console.log(resp)
    })
    .catch(err => {
      alert(err)
    })
  }
}
</script>

<style scoped>

</style>



