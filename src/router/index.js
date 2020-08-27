import Vue from "vue";
import VueRouter from "vue-router";
import { Message } from "element-ui";
import store from "@/store";
import * as types from "@/store/type";

Vue.use(VueRouter);

const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "登录"
    },
    hidden: true
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/Test.vue"),
    meta: {
      title: "测试"
    },
    hidden: true
  },
  {
    path: "/",
    name: "index",
    redirect: "/user/index",
    component: () => import("../views/Index"),
    children: [
      {
        path: "/user/index",
        name: "userIndex",
        component: () => import("../views/manager/user.vue"),
        meta: {
          title: "用户管理",
          icon: "el-icon-user-solid"
        }
      }
    ]
  },
  {
    path: "/role",
    name: "role",
    component: () => import("../views/Index"),
    children: [
      {
        path: "/role/index",
        name: "roleIndex",
        component: () => import("../views/manager/role.vue"),
        meta: {
          title: "角色管理",
          icon: "el-icon-s-custom"
        }
      }
    ]
  }
  // {
  //   path: "/menu",
  //   name: "menu",
  //   redirect: "/index",
  //   component: () => import("../views/Index"),
  //   children: [
  //     {
  //       path: "/menu/index",
  //       name: "menuIndex",
  //       component: () => import("../views/manager/menu.vue"),
  //       meta: {
  //         title: "菜单管理",
  //         icon: "el-icon-user-solid"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/permission",
  //   name: "permission",
  //   redirect: "/index",
  //   component: () => import("../views/Index"),
  //   children: [
  //     {
  //       path: "/permission/index",
  //       name: "permissionIndex",
  //       component: () => import("../views/manager/permission.vue"),
  //       meta: {
  //         title: "权限管理",
  //         icon: "el-icon-setting"
  //       }
  //     }
  //   ]
  // }

  // 下面的代码是之前的
  // {
  //   path: "/",
  //   name: "index",
  //   redirect: "/user",
  //   component: () => import("../views/Index.vue"),
  //   meta: {
  //     icon: null,
  //     title: "首页"
  //   },
  //   children: [
  //     {
  //       path: "/user",
  //       name: "user",
  //       component: () => import("../views/manager/user.vue"),
  //       meta: {
  //         title: "用户管理",
  //         icon: "el-icon-user-solid"
  //       }
  //     },
  //     {
  //       path: "/role",
  //       name: "role",
  //       component: () => import("../views/manager/role.vue"),
  //       meta: {
  //         title: "角色管理",
  //         icon: "el-icon-s-custom"
  //       }
  //     },
  //     {
  //       path: "/menu",
  //       name: "menu",
  //       component: () => import("../views/manager/menu.vue"),
  //       meta: {
  //         title: "用户管理",
  //         icon: "el-icon-user-solid"
  //       }
  //     },
  //     {
  //       path: "/permission",
  //       name: "permission",
  //       component: () => import("../views/manager/permission.vue"),
  //       meta: {
  //         title: "权限管理",
  //         icon: "el-icon-setting"
  //       }
  //     }
  //   ]
  // }
];

export const asyncRoutes = [
  {
    path: "/menu",
    name: "menu",
    redirect: "/index",
    component: () => import("../views/Index"),
    children: [
      {
        path: "/menu/index",
        name: "menuIndex",
        component: () => import("../views/manager/menu.vue"),
        meta: {
          title: "菜单管理",
          icon: "el-icon-user-solid"
        }
      }
    ]
  },
  {
    path: "/permission",
    name: "permission",
    redirect: "/index",
    component: () => import("../views/Index"),
    children: [
      {
        path: "/permission/index",
        name: "permissionIndex",
        component: () => import("../views/manager/permission.vue"),
        meta: {
          title: "权限管理",
          icon: "el-icon-setting"
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes: constantRoutes
});

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  let thisRouter = router;
  if (to.path === "/") {
    next({ name: "userIndex" });
  }
  // 退出登录
  // console.log(to.path);
  // if (to.path === "/logout") {
  //   sessionStorage.clear();
  //   // await store.dispatch(PERMISSION_NAMESPACE + "/" + RESET_ROUTES);
  //   next({ path: "/login" });
  // }

  const hasAuth = sessionStorage.getItem("token");
  // 如果用户已经登录
  if (hasAuth) {
    // 如果已经登录就重定向
    if (to.path === "/login") {
      Message.error("请先退出");
      next({ path: "/" });
    } else {
      // 判断当前用户是否已拉取完user_info信息
      let hasRole = store.getters.role;
      console.log("state:" + store.getters);
      //无法直接通过state取值
      console.log(store.getters);
      console.log(store.getters.role);
      if (hasRole) {
        // 已经拉取完用户信息
        try {
          next();
        } catch (e) {
          console.log(e);
        }
      } else {
        // try {
        // 拉取user_info
        store.dispatch(types.GET_CURRENT_ROLE);
        let role = store.state.role;
        console.log("permission: ", role);

        // 动态生成路由，异步请求
        let accessedRoutes = store.dispatch(types.GENERATE_ROUTES, {
          role: role
        });
        // 添加路由信息
        console.log("before: ", thisRouter);
        router.addRoutes(accessedRoutes);
        console.log("after: ", thisRouter);
        // console.log("permission routes: ", store.getters.permission_routes);

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true });
        // }
        // catch (error) {
        //   Message.error("身份验证错误，请重新登录");
        //   next({ path: "/login" });
        // }
      }
    }
  } else {
    // 如果没有登录
    // 如果不在白名单中
    if (whiteList.indexOf(to.path) === -1) {
      next({ path: "/login" });
    } else {
      next();
    }
  }
});

export default router;
