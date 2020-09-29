import Vue from "vue";
import Vuex from "vuex";
import home_store from "../store/modules/home_store";
import member_store from "../store/modules/member_store";
import { mapMutations } from 'vuex';
import local_storage_store from "../store/modules/local_storage_store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // count:1
  },
  mutations: {
    // inc(state){
    //   state.count++
    // },
    // dec(state,n){
    //   state.count+=n
    // }
  },
  actions: {},
  modules: {
    home_store,
    member_store,
    local_storage_store
  }
});
