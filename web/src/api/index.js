import _ from "lodash";
import axios from "axios";
import CONFIG from "@/config";

export default {

  getPosts(limit) {
    if (!limit || !_.isNumber(limit) || _.isNull(limit) || typeof limit == "undefined") {
      limit = CONFIG.PER_PAGE_LIMIT_DEFAULT
    }
    return new Promise((resolve, reject) => {
      axios.get(CONFIG.REST_API_URL + "posts?per_page=" + limit)
        .then(resp => {
          resolve(resp.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getPost(slug) {
    return new Promise((resolve, reject) => {
      axios.get(CONFIG.REST_API_URL + "posts?slug=" + slug)
        .then(resp => {
          resolve(resp.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  postAuthorization(auth) {
    return new Promise((resolve, reject) => {
      axios.post(CONFIG.REST_API_URL + "login?email=" + auth.email + '&password=' + auth.password)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  deletePost(id) {
    return new Promise((resolve, reject) => {
      axios.delete(CONFIG.REST_API_URL + "posts?id=" + id)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  createPost(post) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization')

    // return new Promise((resolve, reject) => {
    //   axios.post(CONFIG.REST_API_URL + "posts?title=" + post.title + "&slug=" + post.slug + "&content=" + post.content, {
    //     headers: { 'Content-Type': 'text/plain' }
    //   })
    //   .then(resp => {
    //     resolve(resp)
    //   })
    //   .catch(err => {
    //     reject(err)
    //   })
    // })
    // const params = {
    //   title: 'Hello World',
    //   slug: 'hello-world',
    //   content:{
    //       rendered:'%3Cp%3E%3Ci%3E%3Cstrong%3EExample%20Title%3C/strong%3E%3C/i%3E%3C/p%3E%3Cp%3E&nbsp;%3C/p%3E%3Cp%3E&nbsp;%3C/p%3E%3Cfigure%20class=%22media%22%3E%3Coembed%20url=%22https://www.youtube.com/watch?v=08NNkh6gNt4%22%3E%3C/oembed%3E%3C/figure%3E',
    //       excerpt:'2018-9-11'
    //   }
    // }

    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: "http://localhost:5000/posts",
        data: post,
        // headers: {
        //   'Content-Type': 'application/json;charset=UTF-8',
        // },
      })
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
};