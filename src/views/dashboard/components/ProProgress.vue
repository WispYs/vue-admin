<template>
  <div class="progress-wrapper">
    <div v-for="(item, index) in list" :key="index" class="progress-item">
      <span :title="item.proName">{{ item.proName }}</span>
      <el-progress
        class="progress-line"
        :text-inside="true"
        :stroke-width="30"
        :percentage="formatProgress(item.completion)"
        :status="statusMethod(formatProgress(item.completion))"
      />
    </div>
  </div>
</template>

<script>
import { formatProgress } from '@/utils/format'

export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // 进度小数转化为百分比
    formatProgress(num) {
      return formatProgress(num)
    },
    // 项目进度颜色变化
    statusMethod(percentage) {
      if (percentage <= 25) {
        return 'exception'
      } else if (percentage <= 50) {
        return 'warning'
      } else if (percentage <= 75) {
        return null
      } else {
        return 'success'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-wrapper {
  max-height: 300px;
  &:hover {
    overflow: auto;
  }
  .progress-item {
    padding: 14px 0;
    span {
      display: inline-block;
      text-align: right;
      width: 30%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 13px;
      padding-right: 20px;
    }
    .progress-line {
      display: inline-block;
      width: 70%;
    }
  }
}

</style>
