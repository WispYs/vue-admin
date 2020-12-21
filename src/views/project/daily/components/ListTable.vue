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
    <el-table-column align="center" label="项目类型" prop="proType" width="150" sortable>
      <template slot-scope="scope">
        {{ scope.row.proType }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="工时登记日期" width="250" prop="currentTime" sortable>
      <template slot-scope="scope">
        {{ scope.row.currentTime | formatYYMMDD }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="当日总工时（人/天）" width="200" prop="totalTime">
      <template slot-scope="scope">
        {{ scope.row.totalTime | workTimeH2D }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150" align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push({name: 'DailyEdit', params: {id: scope.row.id}})">编辑</el-button>
        <el-button class="delete" type="text" size="small" @click="delClick(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { workTimeH2D, formatYYMMDD } from '@/utils/format'
export default {
  filters: {
    workTimeH2D,
    formatYYMMDD
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
