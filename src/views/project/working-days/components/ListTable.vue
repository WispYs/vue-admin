<template>
  <el-table
    ref="table"
    v-loading="listLoading"
    :data="list"
    element-loading-text="Loading"
    border
    fit
    show-summary
    :summary-method="getSummaries"
    :cell-style="cellStyle"
    header-cell-class-name="pre-line"
  >
    <el-table-column align="center" label="序号" width="50">
      <template slot-scope="scope">
        {{ scope.$index+1 }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="项目L号" width="100" prop="proNo" sortable>
      <template slot-scope="scope">
        {{ scope.row.proNo }}
      </template>
    </el-table-column>
    <el-table-column label="项目名称" prop="proName">
      <template slot-scope="scope">
        {{ scope.row.proName }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="折算标准柜" prop="standardCabinet" width="150">
      <template slot-scope="scope">
        {{ scope.row.standardCabinet }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="成套班组" width="150" prop="setLeader" sortable>
      <template slot-scope="scope">
        {{ scope.row.setLeader }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="上周总工时（人/天）" width="200" prop="setWork">
      <template slot-scope="scope">
        {{ scope.row.setWork | workTimeH2D }}
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
    delClick(id) {
      this.$emit('delete-click', id)
    },
    // 表格单元格样式
    cellStyle() {
      return 'font-size: 13px'
    },
    // 计算合计总工时
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (column.property === 'setWork') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            const prevNum = Number(prev)
            if (!isNaN(value)) {
              return ((prevNum + curr) / 8).toFixed(2)
            } else {
              return prev
            }
          }, 0)
        } else if (column.property === 'standardCabinet') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            const prevNum = Number(prev)
            if (!isNaN(value)) {
              return Number(prevNum + curr).toFixed(2)
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })
      return sums
    }

  }
}
</script>

<style lang="scss">
  @import '~@/styles/list-table.scss';

</style>
