<template>
  <div class="member">
    <h1>{{$store.state.home_store.count}}</h1>
    <h1>{{$store.state.member_store.count}}</h1>
    <el-button type="info" @click="store_test_inc">home加</el-button>
    <el-button type="info" @click="store_test_dec">home减</el-button>
    <el-button type="info" @click="store_member_inc">member加</el-button>
    <el-button type="info" @click="test_m">member减</el-button>
    <el-button type="info" @click="promise_api_test">promise_test</el-button>
    <el-button type="info" @click="promise_localstorage_get_token_test">promise_local_storage</el-button>
    <el-button type="info" @click="promise_localstorage_get_userinfo_test">getuserinfo</el-button>
    <el-button type="info" @click="promise_localstorage_remove_all_test">remove_local_storage_all</el-button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import promise from "../utils/promise";
// import member_store from "../store/modules/member_store";
// import member_store from "../store/modules/member_store";
export default {
  name: "Member",
  components: {},
  methods: {
    store_test_inc() {
      this.$store.commit("dec");
    },
    store_test_dec() {
      this.$store.commit("dec", 2);
    },
    store_member_inc() {
      this.$store.commit("member_store/inc");
    },
    store_member_dec() {
      this.$store.commit("dec", 2);
    },
    ...mapMutations({
      test_m: "dec" // 将 `this.increase()` 映射为 `this.$store.commit('increase')`
    }),
    promise_api_test() {
      promise.promise_api();
    },
    promise_localstorage_get_token_test() {
      this.$store.dispatch("Login", { username: "evan1", password: 123455 });
    },
    promise_localstorage_get_userinfo_test() {
      this.$store.dispatch("Get_user_info", "124");
    },
    promise_localstorage_remove_all_test() {
      this.$store.dispatch("Logout_with_vuex");
    }
  }
};
</script>

<style scoped>
.center_inner {
  color: #42b983;
}
</style>
