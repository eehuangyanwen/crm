<template>
  <div class="header">
    <Logo class="logo" msg="helloworld"></Logo>
    <UserInfo class="userinfo" @showform="ChangePassFormVisible"></UserInfo>
    <!-- <div class="outer">header</div> -->
    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        style="width: 300px"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="SubmitForm('ruleForm')">提交</el-button>
          <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Logo from "../components/Logo.vue";
import UserInfo from "../components/UserInfo.vue";
import abc from "../api/UserApi";
export default {
  name: "Header",
  components: { Logo, UserInfo },
  data: function() {
    var validateOldPass = (rule, value, callback) => {
      abc.CheckPwd(this.user.id, this.ruleForm.oldPass).then(Response => {
        let res = Response.data;
        if (res.code == "200" && res.flag == true) {
          callback();
        } else {
          callback(new Error(res.messages));
        }
      });
    };
    var validatePass = (rule, value, callback) => {
      if (value === this.ruleForm.pass) {
        callback();
      } else {
        callback(new Error("密码不一致"));
      }
    };

    return {
      dialogFormVisible: false,
      user: JSON.parse(localStorage.getItem("mxg-user")),
      ruleForm: {
        oldPass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        oldPass: [
          { required: true, messages: "旧密码不能为空", trigger: "blur" },
          { validator: validateOldPass, trigger: "blur" }
        ],
        pass: [{ required: true, messages: "新密码不能为空", trigger: "blur" }],
        checkPass: [
          { required: true, messages: "确认密码不能为空", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ChangePassFormVisible: function(flag) {
      this.dialogFormVisible = flag;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    },
    SubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        //  alert("submit!");
        abc.Changepwd(this.user.id,formName.checkPass).then(Response => {
        let res = Response.data;
        if (res.code == "200" && res.flag == true) {
          this.dialogFormVisible=false;
          abc
            .Logout(localStorage.getItem("mxg-token"))
            .then(Response => {
              let res = Response.data;
              if (res.flag == true && res.code == 200) {
                localStorage.removeItem("mxg-token");
                localStorage.removeItem("mxg-user");
                // this.$message(res.message);
              } else {
                this.$message("修改失败！请检查网络");
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
        } else {
          console.log("校验失败，请检查表单!!");
          return false;
        }
      });
    },
  }
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  position: absolute;
  padding: 0px 10px 0px 40px;
}

.userinfo {
  float: right;
  margin-right: 40px;
}

.about {
  color: #42b983;
}
.inner {
  /* background-color: yellow; */
  color: #42b983;
}
.outer {
  background-color: red;
  color: gold;
}
</style>
