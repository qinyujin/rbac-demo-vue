<template>
  <div v-if="!item.hidden">
    <div v-if="item.children != null">
      <el-menu-item
        v-for="child in item.children"
        :key="child.path"
        :index="child.path"
      >
        <i :class="child.meta.icon"></i>
        <span slot="title">{{ child.meta.title }}</span>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"]
};
</script>
