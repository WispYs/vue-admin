<template>
  <div class="filter-bar">
    <div class="filter-bar__item">
      <label>员工编号：</label>
      <el-input v-model="proNo" class="filter-item" style="width: 150px" placeholder="请输入员工编号" />
    </div>
    <div class="filter-bar__item">
      <label>员工名称：</label>
      <el-input v-model="proName" class="filter-item" style="width: 150px" placeholder="请输入员工名称" />
    </div>
    <div class="filter-bar__item">
      <label>日报日期：</label>
      <el-date-picker
        v-model="currentTimeArr"
        class="filter-item"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
    </div>
    <!-- <div class="filter-bar__item">
      <label>生产负责人：</label>
      <el-input v-model="productionMan" class="filter-item" style="width: 200px" placeholder="请输入生产负责人" />
    </div> -->
    <div class="filter-bar__item">
      <el-button type="primary" size="medium" @click="search()">搜索</el-button>
      <el-button type="primary" size="medium" @click="reset()">重置</el-button>
      <!--<el-button type="primary" size="medium" :loading="downloadLoading" @click="handleExport()">导出数据</el-button> -->
      <el-button type="primary" size="medium" @click="$router.push({name: 'WorkAllotCreate'})">新建工作</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    downloadLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      proNo: '',
      proName: '',
      currentTimeArr: '',
      startTime: '',
      endTime: ''
    }
  },
  mounted() {

  },
  methods: {
    __initFilter() {
      this.proNo = ''
      this.proName = ''
      this.currentTimeArr = ''
      this.startTime = ''
      this.endTime = ''
    },

    __getFilter() {
      return {
        proNo: this.proNo,
        proName: this.proName,
        startTime: this.currentTimeArr[0] ? this.currentTimeArr[0] : '',
        endTime: this.currentTimeArr[0] ? this.currentTimeArr[1] : ''
      }
    },
    search() {
      this.$emit('search-click', this.__getFilter())
    },
    reset() {
      this.__initFilter()
      this.$emit('reset-click', this.__getFilter())
    },
    handleExport() {
      this.$emit('export-click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-bar {
    margin: 20px 0;
    &__item {
      display: inline-block;
      margin: 0 35px 15px 0;
      font-size: 14px;
      label {
        font-weight: normal;
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }
</style>
