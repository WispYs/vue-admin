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
    <el-table-column align="center" label="柜体数量" width="120" prop="cabinetNum" sortable>
      <template slot-scope="scope">
        {{ scope.row.cabinetNum }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="生产负责人" width="120" prop="productionMan" sortable>
      <template slot-scope="scope">
        {{ scope.row.productionMan }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="成本工时（天）" width="120" prop="costDay">
      <template slot-scope="scope">
        {{ formatTime(scope.row.costDay) }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="预算目标工时（天）" width="150" prop="targetDay">
      <template slot-scope="scope">
        {{ formatTime(scope.row.targetDay) }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="实际汇总工时（天）" width="150" prop="actualDay">
      <template slot-scope="scope">
        {{ formatTime(scope.row.actualDay) }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="工时完成率" width="130" prop="completionRate">
      <template slot-scope="scope">
        {{ formatProgress(scope.row.completionRate) }}%
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150" align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push({name: 'WorkingDaysDetail', params: {id: scope.row.id}})">查看</el-button>
        <el-button type="text" size="small" @click="$router.push({name: 'WorkingDaysEdit', params: {id: scope.row.id}})">编辑</el-button>
        <el-button class="delete" type="text" size="small" @click="delClick(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { workTimeH2D, formatProgress } from '@/utils/format'
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
    // 工时-小时转天
    formatTime(h) {
      return workTimeH2D(h)
    },
    // 进度小数转化为百分比
    formatProgress(num) {
      return formatProgress(num)
    },
    // 表格单元格样式
    cellStyle() {
      return 'font-size: 13px'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
