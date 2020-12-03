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
            <span>{{ scope.row.proEngineer }}</span>
          </el-form-item>
          <el-form-item label="反馈提货">
            <span>{{ scope.row.feedbackPickup == '1' ? '是' : '否' }}</span>
          </el-form-item>
          <el-form-item label="成套资料提交日期">
            <span>{{ formatDate(scope.row.submissionDate) }}</span>
          </el-form-item>
          <el-form-item label="材料要求到货时间">
            <span>{{ formatDate(scope.row.arrivalTime) }}</span>
          </el-form-item>
          <el-form-item label="成套计划启动时间">
            <span>{{ formatDate(scope.row.startTime) }}</span>
          </el-form-item>
          <el-form-item label="成套计划完成时间">
            <span>{{ formatDate(scope.row.endTime) }}</span>
          </el-form-item>
          <el-form-item label="计划发货日期">
            <span>{{ formatDate(scope.row.deliverTime) }}</span>
          </el-form-item>
          <!-- <el-form-item label="设计阶段-项目计划">
            <el-tag
              v-for="(item, index) in ProStatusOption.DesignStatus"
              :key="index"
              :type="scope.row[item.fields] == '1' ? 'success' : 'info'"
              class="status-tab"
              size="small"
            >{{ item.name }}</el-tag>
          </el-form-item> -->
          <el-form-item label="生产阶段-项目计划">
            <el-tag
              v-for="(item, index) in ProStatusOption.ProduceStatus"
              :key="index"
              :type="scope.row[item.fields] == '1' ? 'success' : 'info'"
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
    <el-table-column align="center" label="项目L号" width="100" prop="id" sortable>
      <template slot-scope="scope">
        {{ scope.row.proNo }}
      </template>
    </el-table-column>
    <el-table-column label="项目名称">
      <template slot-scope="scope">
        {{ scope.row.proName }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="项目类型" width="120" prop="type" sortable>
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
    <el-table-column align="center" label="成套班组" width="120">
      <template slot-scope="scope">
        {{ scope.row.setLeader }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150" align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push({name: 'WorkshopDetail', params: {id: scope.row.id}})">查看</el-button>
        <el-button type="text" size="small" @click="$router.push({name: 'WorkshopEdit', params: {id: scope.row.id}})">编辑</el-button>
        <el-button class="delete" type="text" size="small" @click="delClick(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import ProStatusOption from '@/utils/project-status'
import { formatYYMMDD } from '@/utils/format'
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
      ProStatusOption // 项目状态字段配置表
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
    // 表格单元格样式
    cellStyle() {
      return 'font-size: 13px'
    },
    // 表格中行根据项目状态添加 class
    tableRowClassName({ row, rowIndex }) {
      const proRisk = Number(this.list[rowIndex].proRisk)
      console.log(proRisk)
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
  .el-table .orange-row {
    background: oldlace;
  }

  .el-table .red-row {
    background: #fef0f0;
  }

  .el-table .green-row {
    background: #f0f9eb;
  }
</style>
