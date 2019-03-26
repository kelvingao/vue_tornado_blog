<template lang="pug">
  .container
    .row
      .col-sm-12
        .jumbotron
          .container
            span.display-4.h1 珂想而知
            p.lead
              | 在线视频教育
            //- video-player.video-player-box(ref='videoPlayer', :options='playerOptions', :playsinline='true', customeventname='customstatechangedeventname', @play='onPlayerPlay($event)', @pause='onPlayerPause($event)', @ended='onPlayerEnded($event)', @waiting='onPlayerWaiting($event)', @playing='onPlayerPlaying($event)', @loadeddata='onPlayerLoadeddata($event)', @timeupdate='onPlayerTimeupdate($event)', @canplay='onPlayerCanplay($event)', @canplaythrough='onPlayerCanplaythrough($event)', @statechanged='playerStateChanged($event)', @ready='playerReadied')
            section(v-for='blog in posts')
              h2 {{ blog.title }}
              router-link.btn.btn-primary(:to="'/blog/' + blog.slug") read more
              hr
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      posts: [],
      playerOptions: {
          // videojs options
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: "http://poyccljz1.bkt.clouddn.com/Transition%20from%20IPv4%20to%20IPv6.mp4"
          }],
          poster: "/static/images/author.jpg",
        }
    
    }
  },
  mounted() {
    console.log('this is current player instance object', this.player)
  },
  methods: {
    // listen event
      // onPlayerPlay(player) {
      //   // console.log('player play!', player)
      // },
      // onPlayerPause(player) {
      //   // console.log('player pause!', player)
      // },
      // // ...player event

      // // or listen state event
      // playerStateChanged(playerCurrentState) {
      //   // console.log('player current update state', playerCurrentState)
      // },

      // // player is ready
      // playerReadied(player) {
      //   console.log('the player is readied', player)
      //   // you can use it to do something...
      //   // player.[methods]
      // }
  },
  computed: {
    // player() {
    //     return this.$refs.videoPlayer.player
    //   }
  },
  created() {
    axios.get("http://localhost:5000/blog")
      .then((resp) => {
        this.posts = resp.data
      })
      .catch((e) => {
        console.error(e)
      })
  }
}
</script>

<style>

</style>



