<template>
  <div>
    <Login v-if="!isLogin"></Login>

    <!-- 边侧栏 -->
    <!-- <el-container v-else>
      <el-aside width="200px"><sidebar></sidebar></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main><AppMain></AppMain></el-main>
      </el-container>
    </el-container> -->

    <!-- 边侧栏没有占用整个高 -->
    <el-container v-else>
      <el-header><Header></Header></el-header>
      <el-container>
        <el-aside width="200px"><sidebar></sidebar></el-aside>
        <el-main><AppMain></AppMain></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    Header: () => import("../views/layout/Header"),
    AppMain: () => import("../views/layout/AppMain"),
    Login: () => import("../views/Login"),
    sidebar: () => import("../views/layout/Siderbar")
  },
  computed: {
    ...mapState(["isLogin"])
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 600px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  line-height: auto;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
