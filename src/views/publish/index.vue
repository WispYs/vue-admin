<template>
  <div class="publish-container">
    <h2 class="publish-container__title">发布文章</h2>
    <tinymce v-model="content" :height="300" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  data() {
    return {
      content:
      `<h1 style="text-align: center;">欢迎上海XXX公司领导前来参观</h1>
      <p style="text-align: center; font-size: 15px;">XXXXXXXXXXXXXXXXXXXXXXX</p>
      <p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
      <p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
      <p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
      <p>XXXXXXXXXXXXXXXXXXXXXXXXX</p>
      <p style="text-align: right; font-size: 15px;">2020-12-13</p>
      `
    }
  }
}
</script>

<style lang="scss" scoped>
  .publish-container{
    padding: 30px;
    &__title {
      margin-bottom: 30px;
    }
  }
</style>
