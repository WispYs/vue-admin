<template>
  <div class="dashboard-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <div class="statistic-item statistic-icon--orange">
          <div class="statistic-icon">
            <i class="el-icon-user" />
          </div>
          <div class="statistic-info">
            <p>总计划实施项目</p>
            <b>{{ implPlanCount }}</b>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <div class="statistic-item">
          <div class="statistic-icon statistic-icon--blue">
            <i class="el-icon-folder-checked" />
          </div>
          <div class="statistic-info">
            <p>成套已完成项目</p>
            <b>{{ completeCount }}</b>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <div class="statistic-item">
          <div class="statistic-icon statistic-icon--red">
            <i class="el-icon-folder-opened" />
          </div>
          <div class="statistic-info">
            <p>发货已完成项目</p>
            <b>{{ shipmentCompleteCount }}</b>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <div class="statistic-item">
          <div class="statistic-icon statistic-icon--green">
            <i class="el-icon-shopping-bag-1" />
          </div>
          <div class="statistic-info">
            <p>折算标准柜累积量</p>
            <b>{{ standardCabinetCount }}</b>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :md="8" :lg="8">
        <div class="chart-wrapper">
          <p class="chart-title">季度任务数</p>
          <bar-chart :cdata="barData" />
        </div>
      </el-col>
      <el-col :xs="24" :md="8" :lg="8">
        <div class="chart-wrapper">
          <p class="chart-title">项目运行状态</p>
          <pie-chart :cdata="pieData" />
        </div>
      </el-col>
      <el-col :xs="24" :md="8" :lg="8">
        <div class="chart-wrapper news-wrapper">
          <p class="chart-title">通知</p>
          <ul>
            <li v-for="(item, index) in newsLists" :key="index">
              <p>{{ item.title }}</p>
              <span>{{ item.date }}</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :md="24" :lg="12">
        <div class="chart-wrapper" style="height: 706px">
          <p class="chart-title">日历</p>
          <el-calendar id="calendar" v-model="value">
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template
              slot="dateCell"
              slot-scope="{date, data}"
            >
              <!--自定义内容-->
              <div :class="brightDate.indexOf(data.day)!=-1 ? 'highlight' : ''">
                <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
                <div v-for="(item, index) in calendarData" :key="index">
                  <div v-if="(item.date.split('-')[0]).indexOf(data.day.split('-')[0])!=-1">
                    <div v-if="(item.date.split('-')[1]).indexOf(data.day.split('-')[1])!=-1">
                      <div v-if="(item.date.split('-')[2]).indexOf(data.day.split('-')[2])!=-1">
                        <el-tooltip class="item" effect="dark" :content="item.title" placement="right">
                          <div class="is-selected">{{ item.title }}</div>
                        </el-tooltip>
                      </div>
                      <div v-else />
                    </div>
                    <div v-else />
                  </div>
                  <div v-else />
                </div>
              </div>
            </template>
          </el-calendar>
        </div>
      </el-col>
      <el-col :xs="24" :md="24" :lg="12">
        <div class="chart-wrapper" style="height: 336px">
          <p class="chart-title">项目进度统计</p>
          <div v-for="(item, index) in projectProgress" :key="index" class="progress-box">
            <span :title="item.title">{{ item.title }}</span>
            <el-progress
              class="progress-line"
              :text-inside="true"
              :stroke-width="30"
              :percentage="item.progress"
              :status="statusMethod(item.progress)"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :md="24" :lg="12">
        <div class="chart-wrapper" style="height: 336px">
          <p class="chart-title">上周工时</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import { fetchNewsList, fetchProjectProgress } from '@/api/dashborad'
import { fetchImplPlanPro } from '@/api/implplan'
import { fetchCompletePro } from '@/api/complete'
import { fetchShipmentComplete } from '@/api/shipment-complete'

import mockDate from '@/mock/mock-data'
export default {
  name: 'Dashboard',
  components: {
    BarChart,
    PieChart
  },
  data() {
    return {
      implPlanCount: 0, // 总计划实施项目
      completeCount: 0, // 成套已完成项目
      shipmentCompleteCount: 0, // 发货已完成项目
      standardCabinetCount: 0, // 折算标准柜累积量
      barData: {},
      pieData: {},
      newsLists: {},
      calendarData: mockDate.calendarData,
      projectProgress: [],
      value: new Date()
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    // 时间高亮的数组
    brightDate() {
      const ary = []
      for (const i in this.calendarData) {
        ary.push(this.calendarData[i].date)
      }
      return ary
    }
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

    this.__init()
  },
  methods: {
    __init() {
      this.getCount()
      // this.getNewsList()
      // this.getProgress()
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
      fetchCompletePro(page, size, filter).then(response => {
        this.completeCount = response.data.total
      })
      // 发货已完成项目总数
      fetchShipmentComplete(page, size, filter).then(response => {
        this.shipmentCompleteCount = response.data.total
      })
    },
    getNewsList() {
      this.listLoading = true
      fetchNewsList().then(response => {
        this.newsLists = response.item
        this.listLoading = false
      })
    },
    getProgress() {
      fetchProjectProgress().then(response => {
        this.projectProgress = response.data
        console.log(this.projectProgress)
      })
    },

    // 日历 Tooltip 文字提示
    content(date) {
      let content = ''
      for (const i in this.calendarData) {
        if (date === this.calendarData[i].startDate) {
          content = this.calendarData[i].judgeName + ` ` + this.calendarData[i].tribunalName
        }
      }
      return content
    },

    // 项目进度颜色变化
    statusMethod(percentage) {
      if (percentage <= 25) {
        return 'exception'
      } else if (percentage <= 50) {
        return 'warning'
      } else if (percentage <= 75) {
        return ''
      } else {
        return 'success'
      }
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
        &--orange {
          background: #f39c12;
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
      .highlight {
        // background: lightgoldenrodyellow;
        .calendar-day {
          color: #409EFF;
          font-weight: bold;
          font-size: 16px;
        }
      }
      .calendar-day{
        text-align: center;
        color: #202535;
        line-height: 26px;
        font-size: 12px;
      }
      .is-selected{
        color: #666;
        font-size: 10px;
        line-height: 16px;
        margin-top: 1px;
      }
      .progress-box {
        padding: 13px 0;
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
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
