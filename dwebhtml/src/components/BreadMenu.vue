<template>
    <div class="dweb">
      <el-breadcrumb separator="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ page_name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
export default {
  props:['pageName'],
  data(){
    return {

    }
  },
}
</script>

<style scoped>

</style>