<template>
  <el-main>
    <router-view :key="$route.fullPath" />
  </el-main>
</template>

<script>
export default {
  name: "AppMain"
};
</script>
