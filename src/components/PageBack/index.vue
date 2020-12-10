<template>
  <div class="page-back">
    <i class="el-icon-arrow-left" />
    <el-button type="text" @click="$router.back(-1)">返回</el-button>
  </div>
</template>

<style lang="scss">
  .page-back {
    position: absolute;
    top: 10px;
    left: 20px;
    i {
      color: #409EFF;
    }
  }
</style>
