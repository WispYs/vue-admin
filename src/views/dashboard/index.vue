<template>
  <div class="dashboard-container">
    <!-- <el-row :gutter="32" style="margin-bottom: 12px">
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <el-select v-model="filterYear" placeholder="请选择" @change="selectYear">
          <el-option
            v-for="item in years"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row> -->
    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <div class="statistic-item">
          <div class="statistic-icon statistic-icon--blue">
            <i class="el-icon-edit" />
          </div>
          <div class="statistic-info">
            <p>总计划实施项目</p>
            <b>{{ implPlanCount }}</b>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <div class="statistic-item">
          <div class="statistic-icon statistic-icon--skyblue">
            <i class="el-icon-folder-checked" />
          </div>
          <div class="statistic-info">
            <p>成套已完成项目</p>
            <b>{{ completedCount }}</b>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <div class="statistic-item">
          <div class="statistic-icon statistic-icon--red">
            <i class="el-icon-folder-opened" />
          </div>
          <div class="statistic-info">
            <p>已发货项目</p>
            <b>{{ deliveredCount }}</b>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <div class="statistic-item">
          <div class="statistic-icon statistic-icon--green">
            <i class="el-icon-user" />
          </div>
          <div class="statistic-info">
            <p>折算标准柜累积量</p>
            <b>{{ standardCabinetCount }}</b>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :md="12" :lg="12">
        <div class="chart-wrapper">
          <p class="chart-title">季度任务数</p>
          <quarter-count :cdata="quarterData" />
        </div>
      </el-col>
      <el-col :xs="24" :md="12" :lg="12">
        <div class="chart-wrapper">
          <p class="chart-title">本周项目运行状态</p>
          <working-status :cdata="workingStatus" />
        </div>
      </el-col>
      <!-- <el-col :xs="24" :md="8" :lg="8">
        <div class="chart-wrapper">
          <p class="chart-title">项目进度统计</p>
          <pro-progress :list="projectProgress" />
        </div>
      </el-col> -->
      <!-- <el-col :xs="24" :md="8" :lg="8">
        <div class="chart-wrapper news-wrapper">
          <p class="chart-title">通知</p>
          <ul>
            <li v-for="(item, index) in newsLists" :key="index">
              <p>{{ item.title }}</p>
              <span>{{ item.date }}</span>
            </li>
          </ul>
        </div>
      </el-col> -->
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :md="12" :lg="12">
        <div class="chart-wrapper">
          <p class="chart-title">本周计划发货项目</p>
          <week-plan :list="weekplanData" />
        </div>
      </el-col>
      <el-col :xs="24" :md="12" :lg="12">
        <div class="chart-wrapper">
          <p class="chart-title">项目人工核算（人/天）</p>
          <work-hours-check :cdata="WorkHoursData" />
        </div>
      </el-col>
    </el-row>

    <!-- <el-row :gutter="32">
      <el-col :xs="24" :md="24" :lg="24">
        <div class="chart-wrapper" style="height: 706px">
          <p class="chart-title">日历</p>
          <pro-calendar />
        </div>
      </el-col>
    </el-row> -->
    <footerbar />
  </div>
</template>

<script>
import QuarterCount from './components/QuarterCount'
import WorkingStatus from './components/WorkingStatus'
import WorkHoursCheck from './components/WorkHoursCheck'
// import ProCalendar from './components/ProCalendar'
import WeekPlan from './components/WeekPlan'
// import ProProgress from './components/ProProgress'
import Footerbar from './components/Footerbar'
import { fetchImplPlanPro } from '@/api/implplan'
import { fetchCompletedPro } from '@/api/completed'
import { fetchDelivered } from '@/api/delivered'
import { fetchProgressPlan } from '@/api/progress-plan'
import { fetchWeekplanPro } from '@/api/weekplan'
import { fetchProjectProgress, fetchWorkingStatus, fetchStandardCabinet, fetchQuarterCount } from '@/api/dashborad'

import { workTimeH2D, formatProjectStatus } from '@/utils/format'

import mockDate from '@/mock/mock-data'

export default {
  components: {
    QuarterCount,
    WorkingStatus,
    WorkHoursCheck,
    // ProCalendar,
    WeekPlan,
    // ProProgress,
    Footerbar
  },
  data() {
    return {
      years: [
        { value: '2020', label: '2020年' },
        { value: '2019', label: '2019年' },
        { value: '2018', label: '2018年' },
        { value: '2017', label: '2017年' },
        { value: '2016', label: '2016年' }
      ],
      filterYear: '2020',
      implPlanCount: 0, // 总计划实施项目
      completedCount: 0, // 成套已完成项目
      deliveredCount: 0, // 发货已完成项目
      standardCabinetCount: 0, // 折算标准柜累积量
      quarterData: null,
      workingStatus: null,
      projectProgress: null,
      WorkHoursData: null,
      weekplanData: null,
      newsLists: mockDate.newsLists.item
    }
  },
  mounted() {
    this.quarterData = {
      data: [],
      name: []
    }
    this.workingStatus = {
      data: [],
      name: []
    }
    this.WorkHoursData = {
      proName: [],
      costDay: [],
      setPlan: [],
      setWork: []
    }
    this.__init()
  },
  methods: {
    __init() {
      this.getCount()
    },

    // 获取首页项目统计数量
    getCount() {
      const page = 1
      const size = 10
      const filter = {
        proNo: ''
      }
      // 总计划实施项目总数
      fetchImplPlanPro(page, size, filter).then(response => {
        this.implPlanCount = response.data.total
      })
      // 成套已完成项目总数
      fetchCompletedPro(page, size, filter).then(response => {
        this.completedCount = response.data.total
      })
      // 发货已完成项目总数
      fetchDelivered(page, size, filter).then(response => {
        this.deliveredCount = response.data.total
      })
      // 折算标准柜累积量
      const nowYear = new Date().getFullYear() + '-01-01 00:00:00'
      fetchStandardCabinet({ 'deliverdDate': nowYear }).then(response => {
        const standardCabinetCount = Number(response.data[0].standardCabinet)
        this.standardCabinetCount = standardCabinetCount ? standardCabinetCount.toFixed(2) : 0
      })

      // 季度任务数量(已发货项目)
      fetchQuarterCount({ 'deliverdDate': nowYear }).then(response => {
        const quarterCount = []
        const res = response.data
        // quarterNum ：季度数字，1 代表 1季度  2 代表2季度  3 代表 3季度  4 代表4季度。
        // 当不存在对应季度的项目时，不返回数值
        // 例：[{"quarterNum": "1","countNum": "2"},{"quarterNum": "4","countNum": "4"}]
        // 后台返回的数据不全，前端对应补充 ctmd
        for (let i = 1; i < 5; i++) {
          const itemCount = res.filter(it => it['quarterNum'] == i)
          if (itemCount[0]) {
            quarterCount.push(Number(itemCount[0]['countNum']))
          } else {
            quarterCount.push(0)
          }
        }
        this.quarterData = {
          data: quarterCount,
          name: ['第一季度', '第二季度', '第三季度', '第四季度']
        }
      })

      // 本周项目运行状态
      fetchWorkingStatus().then(response => {
        const res = response.data
        const workingStatusData = []
        const workingStatusName = []
        res.forEach(item => {
          const statusItem = {
            value: item.countNum,
            name: formatProjectStatus(item.proStatus)
          }
          workingStatusData.push(statusItem)
          workingStatusName.push(formatProjectStatus(item.proStatus))
        })
        this.workingStatus = {
          data: workingStatusData,
          name: workingStatusName
        }
      })
      // 项目进度统计
      fetchProjectProgress(page, size).then(response => {
        this.projectProgress = response.data.rows
      })
      // 本周计划发货
      fetchWeekplanPro(page, size, filter).then(response => {
        this.weekplanData = response.data.rows
      })
      // 项目人工核算
      fetchProgressPlan(page, size, filter).then(response => {
        const lastWeekPro = response.data.rows.slice(0, 5)
        lastWeekPro.forEach(item => {
          for (const key in item) {
            if (key === 'proName') {
              this.WorkHoursData.proName.push(item[key])
            }
            if (key === 'costDay') {
              this.WorkHoursData.costDay.push(workTimeH2D(item[key]))
            }
            if (key === 'setPlan') {
              this.WorkHoursData.setPlan.push(workTimeH2D(item[key]))
            }
            if (key === 'setWork') {
              this.WorkHoursData.setWork.push(workTimeH2D(item[key]))
            }
          }
        })
      })
    },

    // 改变筛选年份
    selectYear(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin';
.dashboard {
  &-container {
    padding: 30px;
    background: #f0f2f5;
    .statistic-item {
      @include clearfix;
      background: #fff;
      margin-bottom: 32px;
      .statistic-icon {
        float: left;
        width: 90px;
        height: 90px;
        background: #409EFF;
        &--blue {
          background: #409EFF;
        }
        &--red {
          background: #dd4b39;
        }
        &--green {
          background: #00a65a;
        }
        &--skyblue {
          background: #59B2D6;
        }
        i {
          font-size: 45px;
          color: #fff;
          margin-top: 22.5px;
          margin-left: 22.5px;
        }
      }
      .statistic-info {
        width: calc(100% - 90px);
        float: right;
        height: 70px;
        padding: 10px;
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        b {
          display: block;
          font-size: 30px;
          margin-top: 10px;
        }
      }
    }
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
      height: 346px;
      overflow: hidden;
      &.news-wrapper {
        ul {
          padding-bottom: 16px;
          li {
            @include clearfix;
            line-height: 32px;
            font-size: 12px;
            color: #333;
            position: relative;
            padding-left: 14px;
            cursor: pointer;
            &::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 0;
              display: block;
              transform: translateY(-50%);
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #ccc;
            }
            p {
              width: calc(100% - 94px);
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              float: left;
            }
            span {
              width: 80px;
              float: right;
            }
          }
        }
      }
      .chart-title {
        line-height: 20px;
        margin-bottom: 10px;
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
