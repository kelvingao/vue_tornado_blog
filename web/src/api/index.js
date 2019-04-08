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

  getWPPosts(limit) {
    if (!limit || !_.isNumber(limit) || _.isNull(limit) || typeof limit == "undefined") {
      limit = CONFIG.PER_PAGE_LIMIT_DEFAULT
    }
    return new Promise((resolve, reject) => {
      axios.get("http://demo.wp-api.org/wp-json/wp/v2/posts?per_page=" + limit)
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

    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: CONFIG.REST_API_URL + "posts",
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