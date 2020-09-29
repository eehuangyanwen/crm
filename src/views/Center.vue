<template>
  <div class="center">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="line" :to="{ path: '/' }">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Center",
  components: {}
};
</script>

<style scoped>
.el-breadcrumb {
height: 10px;
padding: 20px;
border-radius: 4px;
/* 投影 */
box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.line {
border-left:3px solid rebeccapurple;
padding-left: 10px;
}
</style>
