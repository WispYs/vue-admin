<template>
  <div class="filter-bar">
    <div class="filter-bar__item">
      <label>项目L号：</label>
      <el-input v-model="proNo" class="filter-item" style="width: 240px" placeholder="请输入项目L号" />
    </div>
    <div class="filter-bar__item">
      <label>项目名称：</label>
      <el-input v-model="proName" class="filter-item" style="width: 240px" placeholder="请输入项目名称" />
    </div>
    <div class="filter-bar__item">
      <label>成套班组：</label>
      <el-input v-model="setLeader" class="filter-item" style="width: 200px" placeholder="请输入成套班组" />
    </div>
    <div class="filter-bar__item">
      <label>项目状态：</label>
      <el-select v-model="proStatus" placeholder="请选择项目状态" @change="search()">
        <el-option v-for="(item, index) in ProStatusOption.ProjectStatus" :key="index" :label="item.name" :value="item.value" />
      </el-select>
    </div>
    <!-- <div class="filter-bar__item">
      <label>原计划发货日期：</label>
      <el-date-picker
        v-model="deliverTimeArr"
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
    </div> -->
    <div class="filter-bar__item">
      <el-button type="primary" size="medium" @click="search()">搜索</el-button>
      <el-button type="primary" size="medium" @click="reset()">重置</el-button>
      <!--<el-button type="primary" size="medium" :loading="downloadLoading" @click="handleExport()">导出数据</el-button> -->
      <el-button v-if="roles!=='visitor'" type="primary" size="medium" @click="$router.push({name: 'OverviewCreate'})">新建项目</el-button>
    </div>
  </div>
</template>

<script>
import ProStatusOption from '@/utils/project-status'
import { getUserRoles } from '@/utils/auth'

export default {
  props: {
    downloadLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roles: '',
      ProStatusOption,
      proNo: '',
      proName: '',
      setLeader: '',
      proStatus: '',
      // deliverTimeArr: '', // 原计划发货日期筛选区间
      // deliverTime: '', // 原计划发货开始时间
      // deliverTimeEnd: '', // 原计划发货结束时间
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
    this.roles = getUserRoles()
  },
  methods: {
    __initFilter() {
      this.proNo = ''
      this.proName = ''
      this.setLeader = ''
      this.proStatus = ''
      // this.deliverTimeArr = ''
      // this.deliverTime = ''
      // this.deliverTimeEnd = ''
    },

    __getFilter() {
      return {
        proNo: this.proNo,
        proName: this.proName,
        setLeader: this.setLeader,
        proStatus: this.proStatus
        // deliverTime: this.deliverTimeArr[0] ? this.deliverTimeArr[0] : '',
        // deliverTimeEnd: this.deliverTimeArr[0] ? this.deliverTimeArr[1] : ''
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
  @import '~@/styles/list-filter.scss';

</style>
