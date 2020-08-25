import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let mock = new MockAdapter(axios);

mock.onGet("/user").reply(200, {
  user: { Id: 1, name: "BO" }
});

mock.onPost("/api/login").reply(200, {
  user: {
    name: "Qin",
    password: "123456"
  }
});

mock.onGet("/api/user/listUser").reply(200, {
  code: 200,
  message: "用户列表",
  data: [
    {
      id: 1,
      name: "Qin"
    },
    {
      id: 2,
      name: "王"
    }
  ]
});

mock.onPost("/api/user/saveUser").reply(200, {
  code: 200,
  message: "添加用户成功",
  data: {
    name: "王波"
  }
});

mock.onGet("/api/user/getUser").reply(200, {
  code: 200,
  message: "用户信息",
  data: {
    id: 1,
    name: "Qin"
  }
});

mock.onPost("/api/user/updatePassword").reply(200, {
  code: 200,
  message: "更新密码成功",
  data: "新密码：12345"
});

mock.onGet("/api/role/listRole").reply(200, {
  code: 200,
  message: "角色列表",
  data: [
    {
      id: 1,
      name: "超级管理员"
    },
    {
      id: 2,
      name: "普通用户"
    },
    {
      id: 3,
      name: "CEO"
    }
  ]
});
