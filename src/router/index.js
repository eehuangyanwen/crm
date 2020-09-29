import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Layout from "../views/Layout.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Goods from "../views/Goods.vue";
import Supplier from "../views/Supplier.vue";
import Member from "../views/Member.vue";
import Staff from "../views/Staff.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Layout",
  //   component: Layout
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
  // {
  //   path: "/center",
  //   name: "Center",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Center.vue")
  // }
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "layout", //路由名称
    component: Layout, //组件对象
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: Home,
        meta: { title: "首页" }
      }
      // {
      //   path: '/member',
      //   component: Member
      // }
    ]
  },
  {
    path: "/member",
    component: Layout,
    children: [
      {
        path: "/", // /member/
        component: Member,
        meta: { title: "会员管理" }
      }
    ]
  },
  {
    path: "/supplier",
    component: Layout,
    children: [
      {
        path: "/",
        component: Supplier,
        meta: { title: "供应商管理" }
      }
    ]
  },
  {
    path: "/goods",
    component: Layout,
    children: [
      {
        path: "/",
        component: Goods,
        meta: { title: "商品管理" }
      }
    ]
  },
  {
    path: "/staff",
    component: Layout,
    children: [
      {
        path: "/",
        component: Staff,
        meta: { title: "员工管理" }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
