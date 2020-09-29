<template>
  <div>
    <a href="#/">
      <img
        style="width:20px;boader:2px solid;border-radius:5px"
        src="../../public/Default.jpg"
      />
      <span class="msg">{{ msg }}</span>
    </a>
  </div>
</template>

<script>
// import UserApi from "@/api/UserApi";
// // import axios_test from "@/api/axios_test";
// // import echarts from "echarts";

export default {
  name: "Logo",
  data: function() {
    return {};
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.chart {
  height: 790px;
  width: 400px;
}

.msg {
  vertical-align: middle;
  position: absolute;
  padding: 0px 0px 0px 10px;
}
</style>
