<template>
  <div>
    <el-dialog title="更新密码" :visible.sync="dialogFormVisible">
      新密码：<el-input v-model="password"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            updatepwd();
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-row
      ><center class="right_header">
        <el-row>
          {{ user.name }}
          <span style="margin-left:20px">role:{{ role.name }}</span>
          <el-button
            @click="dialogFormVisible = true"
            class="updatepwd_button"
            type="primary"
            plain
            >更改密码</el-button
          >
          <el-button
            class="logout_button"
            type="danger"
            icon="el-icon-close"
            circle
            @click="logout"
          ></el-button>
        </el-row>
      </center>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as types from "@/store/type";
export default {
  data: () => ({
    dialogFormVisible: false,
    password: null
  }),
  created() {
    console.log("header回调函数");
    this.$store.dispatch(types.GET_USER);
    this.$store.dispatch(types.GET_CURRENT_ROLE);
  },
  computed: {
    ...mapState(["user", "role"])
  },
  methods: {
    logout() {
      console.log("进入退出方法");
      sessionStorage.removeItem("token");
      location.reload();
    },
    updatepwd() {
      console.log("进入更新密码方法");
      this.$store.dispatch(types.UPDATE_PASSWORD, {
        password: this.password
      });
    }
  }
};
</script>

<style scoped>
.right_header {
  padding-left: 70%;
}
.logout_button {
  margin-left: 30px;
}
.updatepwd_button {
  margin-left: 30px;
}
</style>
