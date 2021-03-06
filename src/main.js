import ElementUI from "element-ui"; //组件库
import "element-ui/lib/theme-chalk/index.css"; //样式库
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(ElementUI);
// Vue.config.productionTip = false;
// 权限拦截
import './permission'
Vue.config.productionTip = process.env.NODE_ENV === "production";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
