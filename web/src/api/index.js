import _ from "lodash";
import axios from "axios";
import CONFIG from "@/config";

import { logMessage } from '@/utils/logger'

export default {

  getPosts(limit) {
    if (!limit || !_.isNumber(limit) || _.isNull(limit) || typeof limit == "undefined") {
      limit = CONFIG.PER_PAGE_LIMIT_DEFAULT
    }
    return new Promise((resolve, reject) => {
      axios
        .get(CONFIG.REST_API_URL + "posts?per_page=" + limit)
        .then(resp => {
          // console.log(resp.data);
          resolve(resp.data);
        })
        .catch(err => {
          reject(err);
        })
    })
  },

  postAuthorization(auth) {
    return new Promise((resolve, reject) => {
      axios
        .post(CONFIG.REST_API_URL + "login?email=" + auth.email + '&password=' + auth.password)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
};