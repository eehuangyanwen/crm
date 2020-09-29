import axios from "axios";
export default {
  axios_test_get: function() {
    return axios({
      method: "get",
      url: "http://www.baidu.com",
      headers: { x: "100" }
    });
  },
  axios_test_post: function() {
    return axios({
      method: "post",
      url: "/post",
      data: {
        name: "evan",
        age: 100
      }
    });
  }
};
