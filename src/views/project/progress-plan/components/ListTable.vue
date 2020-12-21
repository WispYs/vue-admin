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
    <el-table-column align="center" label="折算标准柜" width="150" prop="standardCabinet">
      <template slot-scope="scope">
        {{ scope.row.standardCabinet }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="成本工时（人/天）" width="150" prop="costDay">
      <template slot-scope="scope">
        {{ scope.row.costDay | workTimeH2D }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="预算工时（人/天）" width="150" prop="setPlan">
      <template slot-scope="scope">
        {{ scope.row.setPlan | workTimeH2D }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="实际工时（人/天）" width="150" prop="setWork">
      <template slot-scope="scope">
        {{ scope.row.setWork | workTimeH2D }}
        <span v-if="compareTime(scope.row.costDay, scope.row.setPlan, scope.row.setWork) === 0" class="time-warning--green">（↑0）</span>
        <span v-else-if="compareTime(scope.row.costDay, scope.row.setPlan, scope.row.setWork) === 1" class="time-warning--orange">（↑{{ computeOverTime(scope.row.setWork,scope.row.setPlan) }}）</span>
        <span v-else-if="compareTime(scope.row.costDay, scope.row.setPlan, scope.row.setWork) === 2" class="time-warning--red">（↑{{ computeOverTime(scope.row.setWork, scope.row.costDay) }}）</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="成套班组" width="120" prop="setLeader" sortable>
      <template slot-scope="scope">
        {{ scope.row.setLeader }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="项目状态" width="120" prop="proStatus" sortable>
      <template slot-scope="scope">
        {{ scope.row.proStatus | formatProjectStatus }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { workTimeH2D, formatProjectStatus } from '@/utils/format'
export default {
  filters: {
    workTimeH2D,
    formatProjectStatus
  },
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
    // 成本工时：costDay , 计划工时：setPlan, 实际工时：setWork
    // 工时核算状态：正常  0 ；超预算  1； 超成本  2；
    // 这个状态后台没有存，只在前端计算后展示...我是真的服
    // 计划工时 < 成本工时（始终）
    // 实际工时 < 计划工时 --- 正常  0
    // 计划工时 < 实际工时 < 成本工时 --- 超预算  1
    // 实际工时 < 成本工时 --- 超成本  2
    compareTime(costDay, setPlan, setWork) {
      if (setWork < setPlan) {
        return 0
      }
      if (setWork > setPlan && setWork < costDay) {
        return 1
      }
      if (setWork > costDay) {
        return 2
      }
    },
    // 计算超出工时 （小时转天）
    computeOverTime(time1, time2) {
      return Number((time1 - time2) / 8).toFixed(1)
    },
    tableRowClassName({ row, rowIndex }) {
      const costDay = Number(this.list[rowIndex].costDay)
      const setPlan = Number(this.list[rowIndex].setPlan)
      const setWork = Number(this.list[rowIndex].setWork)
      if (setWork < setPlan) {
        return 'green-row'
      } else if (setWork > setPlan && setWork < costDay) {
        return 'orange-row'
      } else if (setWork > costDay) {
        return 'red-row'
      }
      return ''
    },
    delClick(id) {
      this.$emit('delete-click', id)
    },
    // 表格单元格样式
    cellStyle() {
      return 'font-size: 13px'
    }
  }
}
</script>

<style lang="scss">
  @import '~@/styles/list-table.scss';

</style>
