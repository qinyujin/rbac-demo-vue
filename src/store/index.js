import Vue from "vue";
import Vuex from "vuex";
import * as types from "@/store/type";
import axios from "@/axios/MyAxios";
import router, { asyncRoutes, constantRoutes } from "@/router/index";
import getters from "@/store/getters";

Vue.use(Vuex);

const myState = {
  isLogin: false,
  user: null,
  role: null,
  routes: [],
  addRoutes: []
};

const myMutations = {
  [types.LOGIN](state, data) {
    state.isLogin = data;
  },

  [types.GET_USER](state, data) {
    state.user = data;
  },

  [types.GET_CURRENT_ROLE](state, data) {
    state.role = data;
  },

  // eslint-disable-next-line no-unused-vars
  [types.ADD_ASYNC_ROUTE](state, routes) {
    router.addRoutes(asyncRoutes);
    state.routes = constantRoutes.concat(asyncRoutes);
  }
};

const myActions = {
  async [types.LOGIN]({ commit }, data) {
    // console.log(data);
    // if (data.name == "Qin" && data.password == "123456")
    //   commit(types.LOGIN, true);
    // else alert("用户名密码错误!");

    let resp = await axios.post("login", data);
    let token = resp.data.data;
    if (token != null) {
      sessionStorage.setItem("token", token);
    }

    commit(types.LOGIN, true);
    router.push({ path: "/user/index" });
  },

  // eslint-disable-next-line no-unused-vars
  async [types.SAVE_USER]({ commit }, data) {
    await axios.post("user/saveUser", data);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.SAVE_ROLE]({ commit }, data) {
    await axios.post("role/saveRole", data);
  },

  async [types.GET_USER]({ commit }) {
    let resp = await axios.get("user/getUser");

    commit(types.GET_USER, resp.data.data);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.UPDATE_PASSWORD]({ commit }, data) {
    await axios.post("user/updatePassword", data);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.DELETE_USER]({ commit }, data) {
    await axios.post("user/deleteUser", data);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.DELETE_ROLE]({ commit }, data) {
    await axios.post("role/deleteRole", data);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.UPDATE_USER]({ commit }, data) {
    await axios.post("user/updateUser", data);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.UPDATE_ROLE]({ commit }, data) {
    await axios.post("role/updateRole", data);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.GET_CURRENT_ROLE]({ commit }, data) {
    let resp = await axios.get("user/getUserRole");

    commit(types.GET_CURRENT_ROLE, resp.data.data);
  }
};

export default new Vuex.Store({
  getters,
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});

// 执行时判断，刷新时检测；也可以添加长度等更严格判断
if (sessionStorage.getItem("token") != null) {
  myState.isLogin = true;
}
