<template>
  <el-table
    ref="table"
    v-loading="listLoading"
    :data="list"
    element-loading-text="Loading"
    border
    fit
    :cell-style="cellStyle"
    header-cell-class-name="pre-line"
    :row-class-name="tableRowClassName"
  >
    <el-table-column align="center" label="序号" width="50">
      <template slot-scope="scope">
        {{ scope.$index+1 }}
      </template>
    </el-table-column>
    <el-table-column label="项目L号" width="100" prop="proNo">
      <template slot-scope="scope">
        {{ scope.row.proNo }}
      </template>
    </el-table-column>
    <el-table-column label="项目名称" prop="proName">
      <template slot-scope="scope">
        {{ scope.row.proName }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="成本工时（人/天）" width="150" prop="worktime1">
      <template slot-scope="scope">
        {{ scope.row.worktime1 }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="预算工时（人/天）" width="150" prop="worktime2">
      <template slot-scope="scope">
        {{ scope.row.worktime2 }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="实际工时（人/天）" width="150" prop="worktime3">
      <template slot-scope="scope">
        {{ scope.row.worktime3 }}
        <span v-if="scope.row.worktime3 > scope.row.worktime2 && scope.row.worktime3 < scope.row.worktime1" class="time-warning--orange">（↑{{ scope.row.worktime3 - scope.row.worktime2 }}）</span>
        <span v-else-if="scope.row.worktime3 > scope.row.worktime1" class="time-warning--red">（↑{{ scope.row.worktime3 - scope.row.worktime1 }}）</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="完成率" width="120" prop="progress">
      <template slot-scope="scope">
        {{ formatProgress(scope.row.progress) }}%
      </template>
    </el-table-column>
    <el-table-column align="center" label="项目状态" width="120" prop="status" sortable>
      <template slot-scope="scope">
        {{ formatStatus(scope.row.status) }}
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
    tableRowClassName({ row, rowIndex }) {
      const worktime1 = Number(this.list[rowIndex].worktime1)
      const worktime2 = Number(this.list[rowIndex].worktime2)
      const worktime3 = Number(this.list[rowIndex].worktime3)
      if (worktime3 < worktime2) {
        return 'green-row'
      } else if (worktime3 >= worktime2 && worktime3 < worktime1) {
        return 'orange-row'
      } else if (worktime3 > worktime1) {
        return 'red-row'
      }
      return ''
    },
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

<style lang="scss">
  .el-table {
    .pre-line {
      background: #f5f7fa;
    }
    .time-warning--red {
      font-size: 12px;
      color: #f56c6c;
    }
    .time-warning--orange {
      font-size: 12px;
      color: #e6a23c;
    }
    .orange-row {
      background: oldlace;
    }

    .red-row {
      background: #fef0f0;
    }

    .green-row {
      background: #f0f9eb;
    }
  }
</style>
