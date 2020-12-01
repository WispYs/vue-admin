<template>
  <div class="filter-bar">
    <div class="filter-bar__item">
      <label>关键字：</label>
      <el-input v-model="keywords" class="filter-item" style="width: 240px" placeholder="项目编号/名称/负责人/班组" suffix-icon="el-icon-search" />
    </div>
    <div v-if="filterType == 'all'" class="filter-bar__item">
      <label>项目状态：</label>
      <el-select v-model="pro_status" placeholder="请选择项目状态">
        <el-option
          v-for="item in statusOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="filter-bar__item">
      <label>计划发货时间：</label>
      <el-date-picker
        v-model="deliver_time"
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
      <label>实际发货时间：</label>
      <el-date-picker
        v-model="deliverd_date"
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
      <!--<el-button type="primary" size="medium" :loading="downloadLoading" @click="handleExport()">导出数据</el-button> -->
      <el-button type="primary" size="medium" @click="$router.push({name: 'Create'})">新增项目</el-button>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    downloadLoading: {
      type: Boolean,
      default: false
    },
    filterType: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      keywords: '',
      deliver_time: '',
      deliver_start_time: '',
      deliver_end_time: '',
      deliverd_date: '',
      deliverd_start_date: '',
      deliverd_end_date: '',
      pro_status: '',
      statusOption: [
        {
          value: 0,
          label: '未开始'
        }, {
          value: 1,
          label: '进行中'
        }, {
          value: 2,
          label: '已完成'
        }
      ],
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
      this.deliver_time = ''
      this.deliver_start_time = ''
      this.deliver_end_time = ''
      this.deliverd_date = ''
      this.deliverd_start_date = ''
      this.deliverd_end_date = ''
      this.pro_status = ''
    },

    __getFilter() {
      return {
        keywords: this.keywords,
        deliver_start_time: this.deliver_time[0] ? this.deliver_time[0] : '',
        deliver_end_time: this.deliver_time[0] ? this.deliver_time[1] : '',
        deliverd_start_date: this.deliverd_date[0] ? this.deliverd_date[1] : '',
        deliverd_end_date: this.deliverd_date[0] ? this.deliverd_date[1] : '',
        pro_status: this.pro_status
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
