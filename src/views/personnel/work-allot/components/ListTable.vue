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
    <el-table-column align="center" label="员工编号" width="110" prop="userNo" sortable>
      <template slot-scope="scope">
        {{ scope.row.userNo }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="员工名字" prop="userName" width="110">
      <template slot-scope="scope">
        {{ scope.row.userName }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="考核日期" prop="currentTime" width="150" sortable>
      <template slot-scope="scope">
        {{ formatYYMMDD(scope.row.currentTime) }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="工作内容" prop="content">
      <template slot-scope="scope">
        {{ scope.row.content }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="完成率" width="120" prop="completion">
      <template slot-scope="scope">
        {{ formatProgress(scope.row.completion) }}%
      </template>
    </el-table-column>
    <el-table-column align="center" label="评价" width="100" prop="actualDay">
      <template slot-scope="scope">
        {{ formatEvaluation(scope.row.evaluation) }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150" align="center">
      <template slot-scope="scope">
        <!-- <el-button type="text" size="small" @click="$router.push({name: 'WorkAllotDetail', params: {id: scope.row.id}})">查看</el-button> -->
        <el-button type="text" size="small" @click="$router.push({name: 'WorkAllotEdit', params: {id: scope.row.id}})">编辑</el-button>
        <el-button class="delete" type="text" size="small" @click="delClick(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatYYMMDD, workTimeH2D, formatProgress, formatEvaluation } from '@/utils/format'
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
    formatYYMMDD,
    formatEvaluation,
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

<style lang="scss">
  @import '~@/styles/list-table.scss';

</style>
