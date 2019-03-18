<template lang='pug'>
  #app
    top
    login
   
</template>
<script>
import top from '@/components/layout/header.vue'
import login from '@/components/login.vue'

export default {
  name: 'app',
  components: {
    top,
    login
  },
  data() {
    return {
      socket: null,
    }
  },
  mounted() {
    this.socket = new WebSocket('ws://localhost:5000/ws');
    // WebSocket events handler
    this.socket.onopen = evt => {
      console.log('Socket: WebSocket is open now.');
      this.socket.send('Hello, server!');
    }
    // this.socket.onerror = err => console.log('Socket: WebSocket error observed.');
    // this.socket.onclose = evt => console.log('Socket: Websocket is closed.');
    // this.socket.onmessage = msg => this.onMessageCallback(msg);
  }
}
</script>

<style>

body {
  background:#EEF1F4;
  font-family: 'Lato', sans-serif;
}
</style>
