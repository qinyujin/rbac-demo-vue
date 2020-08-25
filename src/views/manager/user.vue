<template>
  <div>
    <el-dialog title="修改用户" :visible.sync="dialogVisible" width="30%">
      <span>
        <el-form>
          id:<el-input type="text" v-model="form.id"></el-input>
          <br />
          name:<el-input type="text" v-model="form.name"></el-input>
          <br />
          password:<el-input type="password" v-model="form.password"></el-input>
          <br />
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogVisible = false;
            updateUser();
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="name" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="password" :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            addUser();
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-button type="success" class="add_user" @click="dialogFormVisible = true"
      >添加用户</el-button
    >

    <el-table :data="users" style="width: 100%" class="user_table">
      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="dialogVisible = true">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "@/axios/MyAxios";
import * as types from "@/store/type";
export default {
  data() {
    return {
      users: [],
      dialogVisible: false,
      dialogFormVisible: false,
      form: {
        id: null,
        name: null,
        password: null
      }
    };
  },
  async created() {
    console.log("创建user页面");
    let resp = await axios.get("user/listUser");
    console.log(resp.data.data);
    this.users = resp.data.data;
  },
  methods: {
    updateUser() {
      this.$store.dispatch(types.UPDATE_USER, {
        id: this.form.id,
        name: this.form.name,
        password: this.form.password
      });
    },
    addUser() {
      console.log("进入Mehotds方法中");
      this.$store.dispatch(types.SAVE_USER, {
        name: this.form.name,
        password: this.form.password
      });
    },
    deleteUser(id) {
      this.$store.dispatch("deleteUser", {
        uid: id
      });
    }
  }
};
</script>

<style scoped>
.add_user {
  margin-right: 1170px;
}
</style>
