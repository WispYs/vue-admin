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
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-form label-position="left" inline class="table-expand">
          <el-form-item label="项目名称">
            <span>{{ scope.row.proName }}</span>
          </el-form-item>
          <el-form-item label="销售负责人">
            <span>{{ scope.row.saleMan }}</span>
          </el-form-item>
          <el-form-item label="项目工程师">
            <span>{{ scope.row.proMan }}</span>
          </el-form-item>
          <el-form-item label="反馈提货">
            <span>{{ scope.row.feedbackPickup | formatFeedback }}</span>
          </el-form-item>
          <el-form-item label="项目风险预警">
            <span>{{ scope.row.proRisk | formatRisk }}</span>
          </el-form-item>
          <el-form-item label="成套计划工时">
            <span>{{ scope.row.setPlan | workTimeH2D }} 人/天</span>
          </el-form-item>
          <el-form-item label="成套实际工时">
            <span>{{ scope.row.setWork | workTimeH2D }} 人/天</span>
          </el-form-item>
          <el-form-item label="成套资料提交日期">
            <span>{{ scope.row.submissionDate | formatYYMMDD }}</span>
          </el-form-item>
          <el-form-item label="材料要求到货日期">
            <span>{{ scope.row.arrivalTime | formatYYMMDD }}</span>
          </el-form-item>
          <el-form-item label="成套计划启动时间">
            <span>{{ scope.row.startTime | formatYYMMDD }}</span>
          </el-form-item>
          <el-form-item label="成套计划完成时间">
            <span>{{ scope.row.endTime | formatYYMMDD }}</span>
          </el-form-item>
          <el-form-item label="计划发货日期">
            <span>{{ scope.row.deliverTime | formatYYMMDD }}</span>
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
          <el-form-item label="缺料反馈" class="lg-item">
            <span>{{ scope.row.materialFeedback }}</span>
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
    <el-table-column label="操作" width="80" align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push({name: 'WorkshopDetail', params: {id: scope.row.id}})">查看</el-button>
        <!-- <el-button type="text" size="small" @click="$router.push({name: 'WorkshopEdit', params: {id: scope.row.id}})">编辑</el-button>
        <el-button class="delete" type="text" size="small" @click="delClick(scope.row.id)">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import ProStatusOption from '@/utils/project-status'
import { formatYYMMDD, formatFeedback, workTimeH2D, formatRisk, formatStageStatus, formatProjectStatus } from '@/utils/format'

export default {
  filters: {
    formatYYMMDD,
    formatFeedback,
    workTimeH2D,
    formatRisk,
    formatStageStatus,
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
      ProStatusOption // 项目状态字段配置表
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
    // 表格中行根据项目状态添加 class
    // 0:有风险,1:已延误，2：正常
    tableRowClassName({ row, rowIndex }) {
      const proRisk = Number(this.list[rowIndex].proRisk)
      if (proRisk === 0) {
        return 'orange-row'
      } else if (proRisk === 1) {
        return 'red-row'
      } else if (proRisk === 2) {
        return 'green-row'
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
  @import '~@/styles/list-table.scss';

</style>
