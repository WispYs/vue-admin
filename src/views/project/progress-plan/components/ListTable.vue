<template>
  <el-table
    ref="table"
    v-loading="listLoading"
    :data="list"
    element-loading-text="Loading"
    border
    fit
    highlight-current-row
    :cell-style="cellStyle"
    header-cell-class-name="pre-line"
  >
    <el-table-column align="center" label="序号" width="50">
      <template slot-scope="scope">
        {{ scope.$index+1 }}
      </template>
    </el-table-column>
    <el-table-column label="项目名称" prop="proName">
      <template slot-scope="scope">
        {{ scope.row.proName }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="计划创建日期" width="130" prop="currentTime" sortable>
      <template slot-scope="scope">
        {{ formatDate(scope.row.currentTime) }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="计划进度" width="120" prop="plan">
      <template slot-scope="scope">
        {{ formatProgress(scope.row.plan) }}%
      </template>
    </el-table-column>
    <el-table-column align="center" label="完成进度" width="120" prop="completion">
      <template slot-scope="scope">
        {{ formatProgress(scope.row.completion) }}%
      </template>
    </el-table-column>
    <el-table-column align="center" label="工作内容" prop="content">
      <template slot-scope="scope">
        {{ scope.row.content }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="项目状态" width="120" prop="status" sortable>
      <template slot-scope="scope">
        {{ formatStatus(scope.row.status) }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="80" align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push({name: 'ProgressPlanDetail', params: {id: scope.row.id}})">查看</el-button>
        <!-- <el-button type="text" size="small" @click="$router.push({name: 'ProgressPlanEdit', params: {id: scope.row.id}})">编辑</el-button>
        <el-button class="delete" type="text" size="small" @click="delClick(scope.row.id)">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatYYMMDD, formatProjectStatus, formatProgress } from '@/utils/format'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    listLoading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    delClick(id) {
      this.$emit('delete-click', id)
    },
    // 去除时分秒
    formatDate(date) {
      return formatYYMMDD(date)
    },
    // 进度小数转化为百分比
    formatProgress(num) {
      return formatProgress(num)
    },
    // 格式化项目状态
    formatStatus(status) {
      return formatProjectStatus(status)
    },
    // 表格单元格样式
    cellStyle() {
      return 'font-size: 13px'
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-table .pre-line {
    background: #f5f7fa;
  }
</style>
