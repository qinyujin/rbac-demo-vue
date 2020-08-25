import Vue from "vue";
import Vuex from "vuex";
import * as types from "@/store/type";
import axios from "@/axios/MyAxios";

Vue.use(Vuex);

const myState = {
  isLogin: false,
  user: null,
  role: null
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
    console.log(resp);
    console.log(resp.data);

    commit(types.LOGIN, true);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.SAVE_USER]({ commit }, data) {
    console.log("进入添加用户");
    let resp = await axios.post("user/saveUser", data);
    console.log(resp);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.SAVE_ROLE]({ commit }, data) {
    console.log("进入添加角色");
    let resp = await axios.post("role/saveRole", data);
    console.log(resp);
  },

  async [types.GET_USER]({ commit }) {
    let resp = await axios.get("user/getUser");
    console.log(resp);
    commit(types.GET_USER, resp.data.data);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.UPDATE_PASSWORD]({ commit }, data) {
    console.log("进入更新密码异步请求");
    let resp = await axios.post("user/updatePassword", data);
    console.log(resp);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.DELETE_USER]({ commit }, data) {
    let resp = await axios.post("user/deleteUser", data);
    console.log(resp);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.DELETE_ROLE]({ commit }, data) {
    let resp = await axios.post("role/deleteRole", data);
    console.log(resp);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.UPDATE_USER]({ commit }, data) {
    let resp = await axios.post("user/updateUser", data);
    console.log(resp);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.UPDATE_ROLE]({ commit }, data) {
    let resp = await axios.post("role/updateRole", data);
    console.log(resp);
  },

  // eslint-disable-next-line no-unused-vars
  async [types.GET_CURRENT_ROLE]({ commit }, data) {
    let resp = await axios.get("user/getUserRole");
    console.log("当前用户角色：");
    console.log(resp.data.data);
    commit(types.GET_CURRENT_ROLE, resp.data.data);
  }
};

export default new Vuex.Store({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});

// 执行时判断，刷新时检测；也可以添加长度等更严格判断
if (sessionStorage.getItem("token") != null) {
  myState.isLogin = true;
}
