<template lang="pug">
  #compose
    h2 Add a New Post
    b-form(@submit='onSubmit' @reset='onReset')
      b-form-group(label="Title:")
        b-form-input(type='text', required='', v-model="blog.title" placeholder='Enter email')
      //- b-form-group(label="Blog Content:")
      //-   b-form-textarea(id="textarea" v-model="blog.content" placeholder="Enter something..." rows="3" max-rows="6")
      
      quill-editor(ref='myTextEditor', v-model='content', :options='editorOption', @blur='onEditorBlur($event)', @focus='onEditorFocus($event)', @ready='onEditorReady($event)')
      
      .quill-code
        code.hljs(v-html='contentCode')
      b-button(type='submit', variant='primary') Submit

</template>

<script>
import axios from 'axios'
import hljs from 'highlight.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      blog: {
        title: '',
        content: '',
      },
      name: '01-example',
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value
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
    },
    onEditorBlur(editor) {
        console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    }
  },
  mounted() {
    console.log('this is my editor', this.editor)
      setTimeout(() => {
        this.content = `<h1 class="ql-align-center">
                          <span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am Example 1! </span>
                        </h1>
                        <p><br></p>
                        <p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p>
                        <p><br></p>
                        <p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p>
                        <p><br></p>
                        <p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p>
                        <p><br></p>
                        <p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p>
                        <p><br></p>
                        <pre class="ql-syntax" spellcheck="false">const a = 10;<br>const editorOption = { highlight: text => hljs.highlightAuto(text).value };</pre>
                        <p><br></p>
                        <p><span class="ql-font-serif">Every flight begins with a fall.</span></p>
                        <p><br></p>
                        <p><a href="https://surmon.me/" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p>
                        <p><br></p>
                        <iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe>
                        <p><br></p>
                        <p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
                        `
      }, 1300)

  }
}
</script>

<style>
#compose * {
    box-sizing: border-box;
    max-width: 100%;
    position: relative;
}
#compose {
    margin: 20px auto;
}
</style>


