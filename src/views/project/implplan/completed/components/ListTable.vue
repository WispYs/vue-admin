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
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-form label-position="left" inline class="table-expand">
          <el-form-item label="项目名称">
            <span>{{ scope.row.proName }}</span>
          </el-form-item>
          <el-form-item label="销售负责人">
            <span>{{ scope.row.saleMan }}</span>
          </el-form-item>
          <el-form-item label="项目负责人">
            <span>{{ scope.row.proMan }}</span>
          </el-form-item>
          <el-form-item label="成套启动时间">
            <span>{{ scope.row.startTime | formatYYMMDD }}</span>
          </el-form-item>
          <el-form-item label="成套完成时间">
            <span>{{ scope.row.endTime | formatYYMMDD }}</span>
          </el-form-item>
          <el-form-item label="计划发货日期">
            <span>{{ scope.row.deliverTime | formatYYMMDD }}</span>
          </el-form-item>
          <el-form-item label="实际发货日期">
            <span>{{ scope.row.deliverdDate | formatYYMMDD }}</span>
          </el-form-item>
          <el-form-item label="">
            <span />
          </el-form-item>
          <el-form-item label="设计阶段-项目计划">
            <el-tag
              v-for="(item, index) in ProStatusOption.DesignStatus"
              :key="index"
              :type="scope.row[item.fields] | formatStageStatus"
              class="status-tab"
              size="small"
            >{{ item.name }}</el-tag>
          </el-form-item>
          <el-form-item label="生产阶段-项目计划">
            <el-tag
              v-for="(item, index) in ProStatusOption.ProduceStatus"
              :key="index"
              :type="scope.row[item.fields] | formatStageStatus"
              class="status-tab"
              size="small"
            >{{ item.name }}</el-tag>
          </el-form-item>
          <el-form-item label="项目问题汇总" class="lg-item">
            <span>{{ scope.row.problem }}</span>
          </el-form-item>
          <el-form-item label="备注" class="lg-item">
            <span>{{ scope.row.remark }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
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
    <el-table-column align="center" label="项目类型" width="120" prop="proType" sortable>
      <template slot-scope="scope">
        {{ scope.row.proType }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="柜体数量" width="120" prop="cabinetNum" sortable>
      <template slot-scope="scope">
        {{ scope.row.cabinetNum }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="箱体数量" width="120" prop="boxNum" sortable>
      <template slot-scope="scope">
        {{ scope.row.boxNum }}
      </template>
    </el-table-column>
    <el-table-column align="center" :label="'折算\n标准柜'" width="65" prop="standardCabinet">
      <template slot-scope="scope">
        {{ scope.row.standardCabinet }}
      </template>
    </el-table-column>
    <el-table-column align="center" :label="'成套\n工时汇总（人/天）'" width="150" prop="setWork">
      <template slot-scope="scope">
        {{ scope.row.setWork | workTimeH2D }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="80" align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push({name: 'CompletedDetail', params: {id: scope.row.id}})">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import ProStatusOption from '@/utils/project-status'
import { formatYYMMDD, workTimeH2D, formatStageStatus } from '@/utils/format'

export default {
  filters: {
    formatYYMMDD,
    workTimeH2D,
    formatStageStatus
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
      ProStatusOption // 项目状态字段配置表
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
