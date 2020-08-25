import Vue from "vue";
import VueRouter from "vue-router";
import { Message } from "element-ui";

Vue.use(VueRouter);

export const permissionList = [
  {
    url: "/api/login"
  },
  {
    url: "/api/user/listUser"
  }
];

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: {
      permission: permissionList
    }
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/Test.vue"),
    meta: {
      title: "测试"
    }
  },
  {
    path: "/",
    name: "index",
    redirect: "/user",
    component: () => import("../views/Index.vue"),
    children: [
      {
        path: "/user",
        name: "user",
        component: () => import("../views/manager/user.vue")
      },
      {
        path: "/role",
        name: "role",
        component: () => import("../views/manager/role.vue")
      },
      {
        path: "/menu",
        name: "menu",
        component: () => import("../views/manager/menu.vue")
      },
      {
        path: "/permission",
        name: "permission",
        component: () => import("../views/manager/permission.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  if (token != null) {
    //登录状态访问login页面，禁止
    if (to.name == "login") {
      Message.error("请先退出");
      next({ path: "/" });
    }
    next();
  }

  if (to.path == "/test") {
    alert("进入test");
    next();
  }
  if (to.path == "/login") {
    to.matched.some(record => {
      console.log(record.meta.permission);
    });
  }
  next();
});

export default router;
