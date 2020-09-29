<template>
  <div class="member">
    <!-- <ul>
      <li v-for="(e,index) in list" :key="index">{{e}}</li>
    </ul>-->
    <!-- :inline="true" 表单一行显示 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      style="margin-top: 20px"
    >
      <!-- 重置会看 el-form-item 组件元素的 prop 上是否指定了字段名，指定了才会重置生效 -->
      <el-form-item prop="cardNum">
        <el-input
          v-model="searchMap.cardNum"
          placeholder="会员卡号"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="searchMap.name"
          placeholder="会员名字"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select
          v-model="searchMap.payType"
          placeholder="支付类型"
          style="width: 110px"
        >
          <!-- 不要忘记 payTypeOptions 绑定到data中 -->
          <el-option
            v-for="option in payTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <!-- value-format 是指定绑定值的格式 -->
        <el-date-picker
          style="width: 200px"
          value-format="yyyy-MM-dd"
          v-model="searchMap.birthday"
          type="date"
          placeholder="出生日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="SearchByMap('searchForm')"
          >查询</el-button
        >
        <el-button type="primary" @click="HandleAdd">新增</el-button>
        <el-button @click="ResetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据列表
        :data 绑定渲染的数据
        border 表格边框
    -->
    <el-table :data="list" height="380" border style="width: 100%">
      <!-- type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column
        prop="name"
        label="会员姓名"
        width="90"
      ></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="integral" label="可用积分"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>{{ scope.row.payType | payTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="HandleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="pojo"
        status-icon
        :rules="rules"
        ref="userForm"
        label-width="100px"
        style="width: 300px"
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input
            type="text"
            v-model="pojo.cardNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input
            type="text"
            v-model="pojo.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker
            type="date"
            v-model="pojo.birthday"
            placeholder="请点击选择"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input
            type="text"
            v-model="pojo.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input
            type="text"
            v-model="pojo.money"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input
            type="text"
            v-model="pojo.integral"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payTypeOptions">
          <el-select
            class="filter-item"
            v-model="pojo.payType"
            placeholder="请选择支付类型"
          >
            <el-option
              v-for="option in payTypeOptions"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址"
          ><el-input
            v-model="pojo.address"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入地址"
        /></el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="
              pojo.id === null
                ? SummitAddUser('userForm')
                : SummitUpdateUser('userForm')
            "
            >提交</el-button
          >
          <el-button @click="$refs['userForm'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import abc from "../api/UserApi";

// 支付类型
const payTypeOptions = [
  { type: "1", name: "现金" },
  { type: "2", name: "微信" },
  { type: "3", name: "支付宝" },
  { type: "4", name: "银行卡" }
];
export default {
  name: "Member",
  components: {},
  data: function() {
    return {
      list: [{ name: "evan", age: "17" }],
      searchMap: { cardNum: "", name: "", payType: "", birthday: "" },
      currentPage: 0,
      pageSize: 10,
      total: 0,
      payTypeOptions,
      dialogFormVisible: false, //控制对话框,
      pojo: {
        id: null,
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: 0,
        integral: 0,
        payType: "",
        address: ""
      }, // 提交的数据
      rules: {
        // 校验规则
        cardNum: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        payType: [
          { required: true, message: "支付类型不能为空", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.SearchInit();
  },
  methods: {
    // FetchData() {
    //   abc.Getlist().then(Response => {
    //     let res = Response.data;
    //     if ((res.code = "200" && res.flag == true)) {
    //       this.list = res.data;
    //     } else {
    //       console.log(res.message);
    //     }
    //   });
    // },
    SearchInit() {
      abc
        .Search(this.currentPage, this.pageSize, this.searchMap)
        .then(Response => {
          let res = Response.data;
          if (res.flag == true && res.code == "200") {
            this.list = res.data.rows;
            this.total = res.data.total;
            console.log("yyyy" + this.total);
          } else {
            console.log(res.message);
          }
        });
    },
    SearchByMap(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          abc
            .Search(this.currentPage, this.pageSizes, this.searchMap)
            .then(Response => {
              let res = Response.data;
              if (res.flag == true && res.code == "200") {
                this.list = res.data.rows;
                this.total = res.data.total;
                console.log("yyyy" + this.total);
              } else {
                console.log(res.message);
              }
            });
        } else {
          console.log("error");
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.SearchInit();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.SearchInit();
    },
    HandleAdd() {
      console.log(this.pojo);
      // this.pojo = {}
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        // this.$nextTick()它是一个异步事件，当渲染结束 之后 ，它的回调函数才会被执行
        // 弹出窗口打开之后 ，需要加载Dom, 就需要花费一点时间，我们就应该等待它加载完dom之后，再进行调用resetFields方法，重置表单和清除样式
        this.$refs["userForm"].resetFields();
      });
      console.log("add!");
    },
    HandleEdit(id) {
      this.HandleAdd();
      abc.GetUserById(id).then(Response => {
        let res = Response.data;
        if (res.flag == true && res.code == "200") {
          this.pojo = res.data;
        } else {
          console.log(res.message);
        }
      });
    },
    ResetForm(form) {
      this.$refs[form].resetFields();
    },
    SummitAddUser(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          abc.AddUser(this.pojo).then(Response => {
            let res = Response.data;
            if (res.flag == true && res.code == "200") {
              this.dialogFormVisible = false;
              this.SearchInit();
              console.log("添加成功！");
            } else {
              console.log(res.message);
            }
          });
        } else {
          console.log("error");
        }
      });
    },
    SummitUpdateUser(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          abc.UpdateUser(this.pojo).then(Response => {
            let res = Response.data;
            if (res.flag == true && res.code == "200") {
              this.dialogFormVisible = false;
              this.SearchInit();
              console.log("更改成功！");
            } else {
              console.log(res.message);
            }
          });
        } else {
          console.log("error");
        }
      });
    },
    handleDelete(id) {
      console.log("删除", id);
      this.$confirm("确认删除这条记录吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          // 确认
          console.log("确认");
          abc.DeleteById(id).then(response => {
            // console.log(response)
            const resp = response.data;

            this.$message({
              message: resp.message,
              type: resp.flag ? "success" : "error"
            });

            if (resp.flag) {
              // 删除成功，刷新列表数据
              this.SearchInit();
            }
          });
        })
        .catch(() => {
          // 取消，不用理会
          console.log("取消");
        });
    }
  },
  filters: {
    payTypeFilter(type) {
      /* payTypeOptions.find(obj => {
                return obj.type === type
            }) */
      // 在过滤 器当中不能引用当前实例 this   this.payTypeOptions 错误的
      const payObj = payTypeOptions.find(obj => obj.type === type);
      return payObj ? payObj.name : null;
    }
  }
};
</script>

<style scoped>
.center_inner {
  color: #42b983;
}
</style>
