import Vue from "vue";
import VueRouter from "vue-router";
import { Message } from "element-ui";
// eslint-disable-next-line no-unused-vars
import store from "@/store";
import * as types from "@/store/type";

Vue.use(VueRouter);

export const constantRoutes = [
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

// const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  console.log("进入钩子函数，从" + from.path + "来的，要到：" + to.path + "去");
  let token = sessionStorage.getItem("token");

  //如果登录了
  if (token) {
    console.log("钩子-登录状态");
    //登录状态不给访问login
    if (to.path == "/login") {
      Message.error("请先退出");
      next({
        path: "/"
      });
    } else {
      next();
    }

    let hasRole = store.state.role;
    if (hasRole) {
      console.log("钩子-有角色状态");
      console.log("permission not null:" + hasRole.name);
      next();
    } else {
      console.log("钩子-没角色状态");
      await store.dispatch(types.GET_CURRENT_ROLE);
      let role = store.state.role;
      console.log("permission null:" + role.name);

      if (role.name == "超级管理员") {
        await store.commit(types.ADD_ASYNC_ROUTE);
        console.log(store.state.routes);
        router.options.routes = store.state.routes;
        next({ ...to, replace: true });
      } else {
        console.log("其他角色");
        next();
      }
    }

    //如果没登陆
  } else {
    if (to.path != "/login") {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  }
});

export default router;
