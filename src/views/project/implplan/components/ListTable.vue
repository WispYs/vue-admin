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
          <el-form-item label="项目工程师">
            <span>{{ scope.row.proEngineer }}</span>
          </el-form-item>
          <el-form-item label="反馈提货">
            <span>{{ scope.row.feedbackPickup | formatFeedback }}</span>
          </el-form-item>
          <el-form-item label="成本工时">
            <span>{{ scope.row.costDay | workTimeH2D }}人/天</span>
          </el-form-item>
          <el-form-item label="成套计划工时">
            <span>{{ scope.row.setPlan | workTimeH2D }}人/天</span>
          </el-form-item>
          <el-form-item label="成套剩余工时">
            <span>{{ scope.row.setRemaining | workTimeH2D }}人/天</span>
          </el-form-item>
          <el-form-item label="项目状态">
            <span>{{ scope.row.proStatus | formatProjectStatus }}人/天</span>
          </el-form-item>
          <el-form-item label="发货状态">
            <span>{{ scope.row.deliverStatus | formatDeliverStatus }}人/天</span>
          </el-form-item>
          <el-form-item label="项目风险等级">
            <span>{{ scope.row.proRisk | formatRisk }}人/天</span>
          </el-form-item>
          <el-form-item label="成套资料提交日期">
            <span>{{ scope.row.submissionDate | formatYYMMDD }}</span>
          </el-form-item>
          <el-form-item label="材料提货日期">
            <span>{{ scope.row.pickupTime | formatYYMMDD }}</span>
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
          <el-form-item label="原计划发货日期">
            <span>{{ scope.row.deliverTime | formatYYMMDD }}</span>
          </el-form-item>
          <el-form-item label="实际发货日期">
            <span>{{ scope.row.deliverdDate | formatYYMMDD }}</span>
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
          <el-form-item label="缺料反馈" class="lg-item">
            <span>{{ scope.row.materialFeedback }}</span>
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
    <el-table-column label="项目名称">
      <template slot-scope="scope" prop="proName">
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
    <el-table-column align="center" :label="'成套\n计划工时（人/天）'" width="140" prop="setPlan">
      <template slot-scope="scope">
        {{ scope.row.setPlan | workTimeH2D }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="成套班组" width="120" prop="setLeader" sortable>
      <template slot-scope="scope">
        {{ scope.row.setLeader }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150" align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push({name: 'ImplplanDetail', params: {id: scope.row.id}})">查看</el-button>
        <el-button type="text" size="small" @click="$router.push({name: 'ImplplanEdit', params: {id: scope.row.id}})">编辑</el-button>
        <el-button class="delete" type="text" size="small" @click="delClick(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import ProStatusOption from '@/utils/project-status'
import { formatYYMMDD, workTimeH2D, formatStageStatus, formatFeedback, formatProjectStatus, formatDeliverStatus, formatRisk } from '@/utils/format'

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
  filter: {
    formatYYMMDD,
    workTimeH2D,
    formatStageStatus,
    formatFeedback,
    formatProjectStatus,
    formatDeliverStatus,
    formatRisk
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-table .pre-line {
    background: #f5f7fa;
  }
</style>
