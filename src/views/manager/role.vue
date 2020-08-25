<template>
  <div>
    <el-dialog title="修改角色" :visible.sync="dialogVisible" width="30%">
      <span>
        <el-form>
          id:<el-input type="text" v-model="form.id"></el-input>
          <br />
          name:<el-input type="text" v-model="form.name"></el-input>
          <br />
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogVisible = false;
            updateRole();
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="name" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            addRole();
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-button type="success" class="add_role" @click="dialogFormVisible = true"
      >添加角色</el-button
    >

    <el-table :data="roles" style="width: 100%" class="user_table">
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
          <el-button size="mini" type="danger" @click="deleteRole(scope.row.id)"
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
      roles: [],
      dialogVisible: false,
      dialogFormVisible: false,
      form: {
        id: null,
        name: null
      }
    };
  },
  async created() {
    console.log("创建role页面");
    let resp = await axios.get("role/listRole");
    console.log(resp.data.data);
    this.roles = resp.data.data;
  },
  methods: {
    updateRole() {
      this.$store.dispatch(types.UPDATE_ROLE, {
        id: this.form.id,
        name: this.form.name
      });
    },
    addRole() {
      console.log("进入Mehotds方法中");
      this.$store.dispatch(types.SAVE_ROLE, {
        name: this.form.name
      });
    },
    deleteRole(id) {
      this.$store.dispatch(types.DELETE_ROLE, {
        rid: id
      });
    }
  }
};
</script>

<style scoped>
.add_role {
  margin-right: 1170px;
}
</style>
