import auth from "../../utils/auth"
import abc from "../../api/UserApi"
import { Promise } from "core-js";
export default {
  namespace: true,
  state: {
    token: null,
    user_info: null
  },
  mutations: {
    mu_set_token(state, token) {
      state.token = token;
      auth.set_token(token)
    },
    mu_remove_token(state) {
      state.token = null;
      auth.remove_token();
    },
    mu_set_user_info(state, user_info) {
      state.user_info = user_info;
      auth.set_user_info(user_info)
    },
    mu_remove_user_info(state) {
      state.user_info = null;
      auth.remove_user_info()
    },
  },
  actions: {
    Login({ commit }, form) {
      return new Promise((resolve, reject) => {
        abc.PostUser(form).then(Response => { let res = Response.data; if (res.code == "200" && res.flag == true) { resolve(res) } else { reject(res) } })
      }).then(res => { console.log("mamami!!!!"); commit('mu_set_token', res.data.token) }, res => { console.log(res) })
    },
    Get_user_info({ commit }, token) {
      return new Promise((resolve, reject) => { abc.GetUserInfo(token).then(Response => { let res = Response.data; if (res.code == "200" && res.flag == true) { resolve(res) } else { reject(res) } }) }).then(res => { commit('mu_set_user_info', res.data) }, res => { console.log(res) })
    },
    Logout_with_vuex({commit},){
      return new Promise((resolve,reject)=>{abc.Logout(this.state.token).then(Response => { let res = Response.data; if (res.code == "200" && res.flag == true) { resolve(res) } else { reject(res) } })}).then(res => { commit('mu_remove_user_info');commit('mu_remove_token') }, res => { console.log(res) })
    }
  }
}