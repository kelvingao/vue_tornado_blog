<template lang='pug'>
  #create
    .flex-container
      .columns.m-t-10.m-b-0
        .column
          h1.title.is-admin.is-4 Add New Blog Post
      hr.m-t-0
      form(@submit="onSubmit", method="post", role="form")
        .columns
          .column.is-three-quarters
            b-field
              b-input(type='text', placeholder='Post Title', size='is-medium', v-model='post.title')
            slug-widget(url='http://kethoughts.com' subdirectory='posts' :title='post.title' @slug-changed='updateSlug')
            b-field.m-t-10
              quill-editor(ref='myTextEditor', v-model='post.content.rendered', :options='editorOption')
                  //- code.quill-code.hljs(v-html='contentCode')


          .column.is-one-quarter
            .card.card-widget.m-r-30
              .author-widget.widget-area
                .selected-author
                  img(src="https://placehold.it/50x50")
                  .author
                    h4 Kelvin Gao
                    p.subtitle (kelvingao)
              .post-status-widget.widget-area
                .status
                  .status-icon
                    b-icon(icon="edit" size="is-medium")
                  .status-details
                    h4 #[span.status-emphasis Draft] Saved
                    p A Few Minutes Ago 
              .publish-buttons-widget.widget-area
                .secondary-action-button
                  button.button.is-info.is-outlined.is-fullwidth Save Draft
                .primary-action-button
                  button.button.is-primary.is-fullwidth Publish

</template>
<script>
import api from '@/api';
import slugWidget from '@/components/widgets/slugWidget';
import hljs from 'highlight.js'

export default {
  name: 'create',
  components: {
    slugWidget,
  },

  data() {
    return {
      post: {
        title:'',
        slug:'',
        content: {
          rendered: 'Compose your masterpiece...',
          excerpt: ''
        }
      },
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

  mounted() {
    this.post.content.rendered = `<h1 class="ql-align-center">
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
  },

  computed: {
    // editor() {
    //     return this.$refs.myTextEditor.quill
    //   },
    // contentCode() {
    //   return hljs.highlightAuto(this.post.content.rendered).value
    // }
  },

  methods: {
    updateSlug(val) {
      this.post.slug = val;
    },

    onSubmit(evt) {
      evt.preventDefault();
      // alert(this.post.content.rendered)

      const { title, slug, content } = this.post;
      api.createPost({title, slug, content})
    }
  },
}
</script>

<style lang="scss" scoped>
    
  /deep/ .ql-editor {
      height:700px;
  }

  .quill-code {
    border: none;
    height: auto;

    > code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0;
      height: 10rem;
      overflow-y: auto;
      resize: vertical;
    }
  }
</style>
