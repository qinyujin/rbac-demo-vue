<template>
  <div class="app-wrapper">
    <p>测试向children中动态添加路由</p>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$router.options.routes);
    console.log(this.$router.options.routes[1].meta.title);
    console.log(this.$router.options.routes[0].meta.permission);
  }
};
</script>

<style scoped>
.app-wrapper {
  height: 100%;
  border: 3px solid red;
}
</style>
