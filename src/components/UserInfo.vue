<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      {{ username }}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">注销</el-dropdown-item>
      <el-dropdown-item command="b">修改密码</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import abc from "@/api/UserApi";

export default {
  name: "UserInfo",
  data: function() {
    return {
      username: "evan"
    };
  },

  methods: {
    ShowPassForm(flag){
      this.$emit('showform',flag)
    },
    handleCommand(command) {
      switch (command) {
        case "a":
          abc
            .Logout(localStorage.getItem("mxg-token"))
            .then(Response => {
              let res = Response.data;
              if (res.flag == true && res.code == 200) {
                localStorage.removeItem("mxg-token");
                localStorage.removeItem("mxg-user");
                this.$message(res.message);
              } else {
                this.$message("logout failed!");
              }
            })
            .catch(function(error) {
              console.log(error);
            })
            .then(function() {
              // always executed
            });
          break;
        case "b":
          this.ShowPassForm(true)
          break;
        default:
          break;

      }
      // this.$message("click on item " + command);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>
