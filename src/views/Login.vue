<template>
  <div class="login">
    <div class="login_input">
      <el-form ref="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input
            size="small"
            v-model="name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            size="small"
            type="password"
            v-model="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-button type="primary" @click="Login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
// import LOGIN from "../store/type";
export default {
  data: () => ({
    name: null,
    password: null
  }),
  methods: {
    Login() {
      this.$store.dispatch("login", {
        name: this.name,
        password: this.password
      });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  position: relative;
}
.login_input {
  height: 350px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  position: relative;
  margin: auto;
  margin-top: 100px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  width: 400px;
  box-sizing: border-box;
}
h5 {
  font-size: 20px;
  color: #484848;
  font-family: "微软雅黑";
}
.el-input {
  margin-top: 20px;
  font-size: 14px;
  color: #484848;
}
.el-button {
  margin-top: 30px;
  background: #e48040;
  color: #ffffff;
}
</style>
