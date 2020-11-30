<template>
  <div class="filter-bar">
    <div class="filter-bar__item">
      <label>关键字：</label>
      <el-input v-model="keywords" class="filter-item" style="width: 240px" placeholder="项目编号/名称/负责人/班组" suffix-icon="el-icon-search" />
    </div>

    <div class="filter-bar__item">
      <label>实际完成时间：</label>
      <el-date-picker
        v-model="realTime"
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
    </div>
    <div class="filter-bar__item">
      <el-button type="primary" size="medium" @click="search()">搜索</el-button>
      <el-button type="primary" size="medium" @click="reset()">重置</el-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: '',
      realTime: '',
      realStartTime: '',
      realEndTime: '',
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
    __initFilter() {
      this.keywords = ''
      this.realStartTime = ''
      this.realEndTime = ''
      this.realTime = ''
    },

    __getFilter() {
      return {
        keywords: this.keywords,
        realStartTime: this.realTime[0] ? this.realTime[0] : '',
        realEndTime: this.realTime[0] ? this.realTime[1] : ''
      }
    },
    search() {
      this.$emit('search-click', this.__getFilter())
    },
    reset() {
      this.__initFilter()
      this.$emit('reset-click', this.__getFilter())
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-bar {
    margin: 20px 0;
    &__item {
      display: inline-block;
      margin: 0 40px 15px 0;
      font-size: 14px;
      label {
        font-weight: normal;
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }
</style>
