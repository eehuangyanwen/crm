import axios from "axios";
import { Loading, Message } from 'element-ui';
const loading = {
  loadingInstance: null, // Loading 实例
  // 打开加载
  open: function () {
    // 创建实例,而且会打开加载 窗口
    console.log(this.loadingInstance, 'loadingInstance')
    if (this.loadingInstance === null) {
      // 如果实例 为空，则创建
      console.log('创建加载实例。。。')
      this.loadingInstance = Loading.service({
        target: 'document.body',
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.5)'
      })
    }

  },
  // 关闭加载
  close: function () {
    // 不为空时, 则关闭加载窗口
    if (this.loadingInstance !== null) {
      this.loadingInstance.close()
    }
    this.loadingInstance = null

  }
}

const request = axios.create({
  // baseURL: '/dev-api',
  baseURL: "/api",
  timeout: 5000 // 请求超时，5000毫秒
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 请求拦截
    // let token=localStorage.getItem("TOKEN")
    // config.data.token=token
    // console.log(config)
    loading.open();

    return config;
  },
  error => {
    // 出现异常
    loading.close();
    return Promise.reject(error);
  }
);
// 响应拦截器
request.interceptors.response.use(
  response => {
    // response.data
    console.log("xxxxx")
    loading.close();
    let res = response.data;
    if (res.code !== "100") {
      Message({
        message: res.message || '系统异常',
        type: 'warning',
        duration: 5 * 1000
      })
    }
    return response;
  },
  error => {
    loading.close()
    return Promise.reject(error);
  }
);

//  http://localhost:8888/dev-api/db.json 404
// request.get('/db.json').then(response => {
//     console.log(response.data)
// })

export default request; // 导出自定义创建 axios 对象
