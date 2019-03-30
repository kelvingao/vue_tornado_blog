export default {

  isAuthenticated: state => !!state.token,

  recentPosts: state => limit => {
    if (!limit || !_.isNumber(limit) || _.isNull(limit) || typeof limit == "undefined") {
      return state.posts;
    }
    let recent = state.posts;
    return recent.slice(0, limit);
  },
}
