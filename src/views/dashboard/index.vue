<template>
  <div class="dashboard-container">
    <el-row :gutter="32">
      <el-col :xs="24" :md="12" :lg="12">
        <div class="chart-wrapper">
          <p>季度任务数</p>
          <bar-chart :cdata="barData" />
        </div>
      </el-col>
      <el-col :xs="24" :md="12" :lg="12">
        <div class="chart-wrapper">
          <p>项目运行状态</p>
          <pie-chart :cdata="pieData" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :md="12" :lg="12">
        <div class="chart-wrapper" style="height: 300px">
          <p>项目进度统计</p>
        </div>
      </el-col>
      <el-col :xs="24" :md="12" :lg="12">
        <div class="chart-wrapper" style="height: 300px">
          <p>本周项目计划</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
export default {
  name: 'Dashboard',
  components: {
    BarChart,
    PieChart
  },
  data() {
    return {
      barData: {},
      pieData: {}
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.barData = {
      data: [12, 23, 34, 26]
    }
    this.pieData = {
      data: [
        { value: 5, name: '进行中' },
        { value: 2, name: '已延期' },
        { value: 1, name: '已中断' },
        { value: 12, name: '已完成' }
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 30px;
    background: #f0f2f5;
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
