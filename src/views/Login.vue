<template>
  <!-- <el-row type="flex" class="row-bg" justify="center">
  <el-col :span="8">
     <div class="login">
      <el-form ref="form" :model="form" label-width="80px" class="login_form">
        <h2 class="sys_text">crm系统</h2>
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" placeholder="请输出密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
        </el-form>
      </div>
  </el-col>
  </el-row>-->

  <div class="login">
    <!-- <h1>login</h1> -->
    <el-form
      ref="form_login"
      :model="form"
      status-icon
      :rules="rules"
      label-width="80px"
      class="login_form"
    >
      <h2 class="sys_text">crm系统</h2>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输出密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('form_login')"
          class="login_submit"
          >提交</el-button
        >
      </el-form-item>
      <h4 class="login_reult_class" v-show="seen">用户不存在或密码错误</h4>
    </el-form>
  </div>
</template>

<script>
import abc from "@/api/UserApi";
export default {
  name: "Login",
  data: function() {
    return {
      seen: false,
      form: {
        username: "evan",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度必须大于6", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    submitForm: function(form_name) {
      let formdata = this.form;
      let user_result = {
        code: null,
        flag: null,
        message: null,
        data: { token: null }
      };
      let that = this;
      this.$refs[form_name].validate(valid => {
        if (valid) {
          console.log("validate ok!");
          abc
            .PostUser(formdata)
            .then(function(response) {
              console.log(response.data);
              user_result = response.data;

              if (user_result.code == "200" && user_result.flag == true) {
                that.seen = false;
                abc
                  .GetUserInfo(user_result.data.token)
                  .then(response => {
                    let user_info = response.data;
                    if (user_info.flag == true && user_info.code == "200") {
                      localStorage.setItem(
                        "mxg-token",
                        // JSON.stringify(user_result.data.token)
                        user_result.data.token
                      );
                      localStorage.setItem(
                        "mxg-user",
                        JSON.stringify(user_info.data)
                      );
                      that.$router.push("/");
                    } else {
                      that.$message({
                        message: response.data.message,
                        type: "warning"
                      });
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                  })
                  .then(function() {
                    // always executed
                  });
              } else {
                that.seen = true;
                that.$message({
                  message: response.data.message,
                  type: "warning"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            })
            .then(function() {
              // always executed
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {}
};
</script>

<style scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../../public/Default.jpg");
  overflow: hidden;
}
.login_form {
  width: 350px;
  margin: 150px auto;
  padding: 30px;
  border-radius: 20px;
  background-color: rgb(232, 232, 232);
}

.sys_text {
  text-align: center;
  color: red;
}

.login_reult_class {
  text-align: center;
  color: yellow;
}
.login_submit {
  margin-left: -80px;
}
</style>
