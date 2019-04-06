<template lang="pug">
  //- refs:https://medium.com/techtrument/build-a-video-player-like-youtube-in-vuejs-webpack-and-flexbox-b51ef9bede0b
  .video-player
    .video-container
      iframe.iframe-wrapper(:src='this.activeVideo.youtubeURL', frameborder='0', allow='autoplay; encrypted-media', allowfullscreen='')
      h3 {{this.activeVideo.title}}
      .row
        p {{this.activeVideo.views}} views
        p {{this.activeVideo.likes}} 
          button(@click="addLike") Like
    .video-list
      .thumbnail(@click="chooseVideo(video)" :key='video.id', v-for='video in videos')
        .thumbnail-img
          img(:src='video.thumbnail')
        .thumbnail-info
          h3 {{video.title}}
          p {{video.creator}}
          p.thumbnail-views {{video.views}} Views
    
</template>

<script>
let videos = [
     {
    id: 1,
    title: "18-core iMac Pro Review: Not a Trap!",
    thumbnail:
      "https://i.ytimg.com/vi/jn9mHzXJIV0/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAvJvk4k_UNB9nst4pFP-txM1TLZA",
    youtubeURL: "https://www.youtube.com/embed/jn9mHzXJIV0",
    creator: "Marques Brownlee",
    likes: 0,
    views: 0
  },
  {
    id: 2,
    title: "Dope Tech: Camera Robots!",
    thumbnail:
      "https://i.ytimg.com/vi/UIwdCN4dV6w/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDhlan32jHSvicGZezDFPjAOdXGUA",
    youtubeURL: "https://www.youtube.com/embed/UIwdCN4dV6w",
    creator: "Marques Brownlee",
    likes: 0,
    views: 0
  },
  {
    id: 3,
    title: "Let's Talk About Tesla Roadster 2020!",
    thumbnail:
      "https://i.ytimg.com/vi/ctx4YBEdOxo/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBDnlrC2rVwXamNkicEEbc3Mf4T0w",
    youtubeURL: "https://www.youtube.com/embed/ctx4YBEdOxo",
    creator: "Marques Brownlee",
    likes: 0,
    views: 0
  },
  {
    id: 4,
    title: "Talking Tech with Neil deGrasse Tyson!",
    thumbnail:
      "https://i.ytimg.com/vi/pqQrL1K0Z5g/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA5hTiwkz4Tr1w1hSMhPlwtmQeyYw",
    youtubeURL: "https://www.youtube.com/embed/pqQrL1K0Z5g",
    creator: "Marques Brownlee",
    likes: 0,
    views: 0
  },
  {
    id: 5,
    title: "The Apple Ecosystem: Explained!",
    thumbnail:
      "https://i.ytimg.com/vi/KB4_WIPE7vo/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCCxXm7aoPShOwON74nhMlGYMUkHw",
    youtubeURL: "https://www.youtube.com/embed/KB4_WIPE7vo",
    creator: "Marques Brownlee",
    likes: 0,
    views: 0
  }
];

export default {
  name: 'VideoPlayer',
  data () {
    return {
      videos,
      activeVideo: videos[1]
    }
  },

  methods: {
    chooseVideo(video){
      //SET VIDEO AS ACTIVE VIDEO
      this.activeVideo = video;
      //INCREASE THE VIDEOS VIEWS BY 1
      video.views += 1;
    },

    addLike(){
      this.activeVideo.likes += 1;
    }
  }
}
</script>

<style scoped>
.thumbnail{
    display:flex;
}

.thumbnail img{
    width:168px;
}

.thumbnail-info{
    margin-left:20px;
}

.thumbnail h3{
    font-size:16px;
}

h3,
p{
    margin:0;
    padding:0;
}

.thumbnail-views{
    font-size:14px;
}

.video-player{
    display:flex;
    width:1200px;
    margin:auto;
}

.video-container{
    margin-right:40px;
}

.iframe-wrapper{
  /* bulma css override height attribute to auto */
  width: 640px;
	height: 360px;
} 

.row{
    display:flex;
    justify-content:space-between;
}

button{
    background:#D0021B;
    color:white;
    border:none;
    padding:10px 20px;
}

</style>