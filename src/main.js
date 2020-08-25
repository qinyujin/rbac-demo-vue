import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// process.env.NODE_ENV == "development" && import("@/mock/mock.js");

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  el: "#app",
  render: h => h(App)
}).$mount("#app");
