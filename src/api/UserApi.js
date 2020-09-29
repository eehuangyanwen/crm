import request from "@/utils/request";
// export default {
//     GetUser(){
//         return request({
//             url:'/getusername',
//             method:'get'
//         })
//     }

// }

const abc = {
  GetUser() {
    return request({
      url: "/getusername",
      method: "get"
    });
  },
  PostUser(postdata) {
    return request({
      url: "/user/login",
      method: "post",
      data: {
        username: postdata.username,
        password: postdata.password
      }
    });
  },
  GetUserInfo(token) {
    return request({
      url: `/user/info/${token}`,
      method: "get"
    });
  },
  Logout(token) {
    return request({
      url: "/user/logout",
      method: "post",
      data: {
        token
      }
    });
  },
  CheckPwd(username, password) {
    return request({
      url: "/user/checkpwd",
      method: "post",
      data: {
        username,
        password
      }
    })
  },

  Changepwd(id, newpwd) {
    return request({
      url: "/user/changepwd",
      method: "put",
      data: {
        id,
        newpwd
      }
    })
  },
  Getlist() {
    return request({
      url: "/user/member/list",
      method: "get"
    })
  },
  Search(page, size, searchmap) {
    return request({
      url: `/user/member/list/search/${page}/${size}`,
      method: "post",
      data: {
        searchmap
      }
    })
  },
  AddUser(pojo) {
    return request({
      url: "/user/member/adduser",
      method: "post",
      data: {
        pojo
      }
    })
  },
  UpdateUser(pojo) {
    return request({
      url: "/user/member/updateuser",
      method: "put",
      data: {
        pojo
      }
    })
  },
  GetUserById(id) {
    return request({
      url: `/user/member/${id}`,
      method: "get"
    })
  },
  DeleteById(id) {
    return request({
      url: `/user/member/${id}`,
      method: "delete"
    })
  }
};



export default abc;

// 上述两种方式等价

// 一个js 文件相当于module,通过export default{var,const,fun}可以将文件的内部元素给其他文件调用
// 其他文件只需要import {var,const,fun} from @/api/UserApi 则可调用模块内的元素，如UserApi.GetUser()
// export default 模块默认输出，import a form 模块，这里的a 虽然在模块中不存在，但由于export default 了，相当于default
// var name = "evan",export {name}, import {var} from 模块
// export default {var name ="evan"} import abc from 模块，则abc.name 才能调用name
