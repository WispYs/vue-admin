<template>
  <div class="filter-bar">
    <span>筛选：</span>
    <el-input v-model="keywords" class="filter-item" style="width: 240px" placeholder="请输入关键字" suffix-icon="el-icon-search" />
    <el-date-picker
      v-model="dateTime"
      class="filter-item"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      value-format="yyyy-MM-dd"
    />
    <el-button class="filter-item" type="primary" size="medium" @click="search()">搜索</el-button>
    <el-button class="filter-item" type="primary" size="medium" @click="$router.push({name: 'Dashboard'})">新增项目</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: '',
      dateTime: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted() {

  },
  methods: {
    search() {
      console.log(this.keywords, this.dateTime)
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-bar {
    padding: 0 20px;
    margin-bottom: 20px;
  }
  .filter-item {
    margin: 0 20px 20px 20px;
  }
</style>
