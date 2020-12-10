<template>
  <div class="footerbar">
    <span>Copyright © 2020 上海泷得自动化技术有限公司 - 版权所有</span>
    <span class="version">v1.0.0</span>
  </div>
</template>
<script>
export default {
  name: 'Footerbar'
}
</script>
<style lang="scss" scoped>
.footerbar {
  padding-top: 10px;
  text-align: center;
  font-size: 14px;
  color: #666;
  .version {
    margin-left: 10px;
    color: #409EFF;
  }
}

</style>
