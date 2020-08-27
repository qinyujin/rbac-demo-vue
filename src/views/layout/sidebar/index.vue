<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      mode="vertical"
      router
    >
      <sidebarItem
        v-for="route in routes"
        :key="route.path"
        :item="route"
      ></sidebarItem>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import sidebarItem from "./sidebarItem";
export default {
  created() {
    console.log(this.routes);
  },
  components: {
    sidebarItem
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    ...mapState(["role"]),
    routes() {
      return this.$router.options.routes;
    }
  }
};
</script>
