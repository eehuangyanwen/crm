<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ user }}:{{ age }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,
      <br />check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
          target="_blank"
          rel="noopener"
          >router</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex"
          target="_blank"
          rel="noopener"
          >vuex</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener"
          >vue-router</a
        >
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</a
        >
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"
          >vue-loader</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
          >awesome-vue</a
        >
      </li>
    </ul>
    <div class="echarts">
      <h1>echars</h1>
      <!-- ref 被用来给DOM元素或子组件注册引用信息,想要在Vue中直接操作DOM元素，就必须用ref属性进行注册 -->
      <div class="chart" ref="myEchartPillar"></div>
      <div class="chart" ref="myEchartLine"></div>
    </div>
  </div>
</template>

<script>
import UserApi from "@/api/UserApi";
import axios_test from "@/api/axios_test";
import echarts from "echarts";

export default {
  name: "HelloWorld",
  data: function() {
    return {
      user: "abc",
      age: "17",
      chart_data1: [1, 3, 5, 7, 9, 11, 8]
    };
  },
  props: {
    msg: String
  },
  created() {
    this.FetchUser();
    this.FetchByGet();
    this.FetchByPost();
  },
  mounted() {
    this.getPillar();
    this.getLine();
  },
  methods: {
    FetchUser: function() {
      UserApi.GetUser().then(response => {
        this.user = response.data.name;
      });
    },
    FetchByGet: function() {
      axios_test
        .axios_test_get()
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    },
    FetchByPost: function() {
      axios_test
        .axios_test_post()
        .then(function(response) {
          console.log(response.data.data.msg);
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    },

    // 渲染柱形图表
    getPillar: function() {
      // let that = this;
      // 基于准备好的dom(myEchartPillar)，初始化echarts实例
      let myChart = echarts.init(this.$refs.myEchartPillar);
      //指定图表的配置项和数据，绘制图表
      myChart.setOption({
        // 图表名称
        title: {
          text: "柱形统计图"
        },
        // 图表颜色
        color: ["#6284d3"],
        // 提示
        tooltip: {
          //触发类型,axis:坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效，默认为直线，可选为：'line' | 'shadow'
            type: "shadow"
          }
        },
        grid: {
          show: true,
          //grid 组件离容器左侧的距离。
          left: "3%",
          //grid 组件离容器右侧的距离。
          right: "4%",
          //grid 组件离容器下侧的距离。
          bottom: "3%",
          //grid 区域是否包含坐标轴的刻度标签。true这常用于『防止标签溢出』的场景，标签溢出指的是，标签长度动态变化时，可能会溢出容器或者覆盖其他组件。
          containLabel: true,
          // 网格背景色，此配置项生效的前提是，设置了 show: true
          backgroundColor: "#E7F1F5"
        },
        //直角坐标系 grid 中的 x 轴
        xAxis: [
          {
            //'category' 类目轴
            type: "category",
            //坐标轴名称
            name: "时间",
            //坐标轴名称显示位置
            nameLocation: "end",
            //坐标数据
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            //坐标轴刻度相关设置
            axisTick: {
              // 为 true 可以保证刻度线和标签对齐
              alignWithLabel: true
            },
            //坐标轴名称与轴线之间的距离
            nameGap: 2
          }
        ],
        //直角坐标系 grid 中的 y 轴
        yAxis: [
          {
            //'value' 数值轴，适用于连续数据
            type: "value",
            //坐标轴名称
            name: "使用量（次数）",
            //坐标轴的标签是否响应和触发鼠标事件，默认不响应
            triggerEvent: true
          }
        ],
        //系列列表。每个系列通过 type 决定自己的图表类型
        series: [
          {
            //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
            name: "柜子使用量",
            //类型为柱状/条形图
            type: "bar",
            //柱条的宽度，不设时自适应。支持设置成相对于类目宽度的百分比。
            barWidth: "60%",
            //图形上的文本标签，可用于说明图形的一些数据信息
            label: {
              normal: {
                //是否显示标签
                show: true,
                //通过相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置
                position: "top"
              }
            },
            //系列中的数据内容数组
            // data: [1, 3, 5, 7, 9, 11, 13]
            data: this.chart_data1
          }
        ]
      });
      //解决自适应
      setTimeout(function() {
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }, 500);
    },
    // 获取折线图
    getLine: function() {
      // let that = this;
      let myChart = echarts.init(this.$refs.myEchartLine);
      myChart.setOption({
        title: {
          text: "折线统计图"
          //  text: that.$t("profitChart.Revenuechart")
        },
        color: ["#6284d3"],
        tooltip: {
          trigger: "axis",
          formatter: "时间 : {b}<br/>收益 : {c}元",
          axisPointer: {
            type: "line"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            name: "日期",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            boundaryGap: false,
            axisTick: {
              alignWithLabel: true
            },
            nameGap: 2
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "金额（元）"
          }
        ],
        series: [
          {
            name: "柜子使用量",
            //类型为折线图
            type: "line",
            //折线样式
            lineStyle: {
              normal: {
                //宽度
                width: 3,
                //阴影颜色
                shadowColor: "rgba(0,0,0,0.1)",
                // 阴影的模糊范围
                shadowBlur: 10,
                // 阴影的纵向位移量
                shadowOffsetY: 10
              }
            },
            areaStyle: {
              normal: {
                // 折线范围内的背景色
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#E7F1F5"
                  },
                  {
                    offset: 1,
                    color: "#E7F1F5"
                  }
                ])
              }
            },
            data: [1, 3, 5, 7, 9, 11, 13]
          }
        ]
      });
      setTimeout(function() {
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }, 500);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
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
</style>
