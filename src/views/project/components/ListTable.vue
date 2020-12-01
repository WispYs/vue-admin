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
            <span>{{ scope.row.pro_name }}</span>
          </el-form-item>
          <el-form-item label="销售负责人">
            <span>{{ scope.row.sale_man }}</span>
          </el-form-item>
          <el-form-item label="项目工程师">
            <span>{{ scope.row.pro_engineer }}</span>
          </el-form-item>
          <el-form-item v-if="tableType == 'all' || tableType == 'workshop'" label="反馈提货">
            <span>{{ scope.row.feedback_pickup ? '是' : '否' }}</span>
          </el-form-item>
          <el-form-item :label="tableType == 'all' ? '成套计划工时' : '成套工时汇总'">
            <span>{{ scope.row.set_plan }}天</span>
          </el-form-item>
          <el-form-item v-if="tableType == 'all' || tableType == 'weekPlanDeliver'" label="成套剩余工时">
            <span>{{ scope.row.set_remaining }}天</span>
          </el-form-item>
          <el-form-item v-if="tableType == 'all' || tableType == 'workshop'" label="成套资料提交日期">
            <span>{{ scope.row.submission_date }}</span>
          </el-form-item>
          <el-form-item v-if="tableType == 'all'" label="材料提货时间">
            <span>{{ scope.row.pickup_time }}</span>
          </el-form-item>
          <el-form-item v-if="tableType == 'all' || tableType == 'workshop'" label="材料要求到货时间">
            <span>{{ scope.row.arrival_time }}</span>
          </el-form-item>
          <el-form-item v-if="tableType == 'all' || tableType == 'workshop'" label="成套计划启动时间">
            <span>{{ scope.row.start_time }}</span>
          </el-form-item>
          <el-form-item v-if="tableType == 'all' || tableType == 'completed' || tableType == 'workshop'" label="成套计划完成时间">
            <span>{{ scope.row.end_time }}</span>
          </el-form-item>
          <el-form-item label="计划发货日期">
            <span>{{ scope.row.deliver_time }}</span>
          </el-form-item>
          <el-form-item label="实际发货日期">
            <span>{{ scope.row.deliverd_date }}</span>
          </el-form-item>
          <el-form-item v-if="tableType == 'all' || tableType == 'completed'" label="设计阶段-项目计划">
            <el-tag
              v-for="(item, index) in ProStatusOption.DesignStatus"
              :key="index"
              :type="scope.row[item.fields] ? 'success' : 'info'"
              class="status-tab"
              size="small"
            >{{ item.name }}</el-tag>
          </el-form-item>
          <el-form-item v-if="tableType == 'all' || tableType == 'completed' || tableType == 'workshop'" label="生产阶段-项目计划">
            <el-tag
              v-for="(item, index) in ProStatusOption.ProduceStatus"
              :key="index"
              :type="scope.row[item.fields] ? 'success' : 'info'"
              class="status-tab"
              size="small"
            >{{ item.name }}</el-tag>
          </el-form-item>
          <el-form-item label="缺料反馈">
            <span>{{ scope.row.material_feedback }}</span>
          </el-form-item>
          <el-form-item label="项目问题汇总" class="lg-item">
            <span>{{ scope.row.problem }}</span>
          </el-form-item>
          <!-- <el-form-item label="备注" class="lg-item">
              <span>{{ scope.row.remark }}</span>
            </el-form-item> -->
        </el-form>
      </template>
    </el-table-column>
    <el-table-column align="center" label="序号" width="50">
      <template slot-scope="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="项目L号" width="100" prop="id" sortable>
      <template slot-scope="scope">
        {{ scope.row.pro_no }}
      </template>
    </el-table-column>
    <el-table-column label="项目名称">
      <template slot-scope="scope">
        {{ scope.row.pro_name }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="项目类型" width="120" prop="type" sortable>
      <template slot-scope="scope">
        {{ scope.row.pro_type }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="柜体数量" width="120" prop="cabinetNum" sortable>
      <template slot-scope="scope">
        {{ scope.row.cabinet_num }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="箱体数量" width="120" prop="boxNum" sortable>
      <template slot-scope="scope">
        {{ scope.row.box_num }}
      </template>
    </el-table-column>
    <el-table-column align="center" :label="'折算\n标准柜'" width="65">
      <template slot-scope="scope">
        {{ scope.row.standard_cabinet }}
      </template>
    </el-table-column>
    <el-table-column align="center" :label="tableType == 'all' ? '成套\n计划工时（天）' : '成套\n工时汇总（天）'" width="120">
      <template slot-scope="scope">
        {{ scope.row.set_plan }}
      </template>
    </el-table-column>
    <el-table-column align="center" :label="'成套班组'" width="120" prop="team" sortable>
      <template slot-scope="scope">
        {{ scope.row.set_leader }}
      </template>
    </el-table-column>
    <el-table-column align="center" :label="'项目实际状态'" width="120" prop="team" sortable>
      <template slot-scope="scope">
        {{ scope.row.pro_status }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150" align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push({name: 'Detail', params: {id: scope.row.pro_no}})">查看</el-button>
        <el-button type="text" size="small" @click="$router.push({name: 'Edit', params: {id: scope.row.pro_no}})">编辑</el-button>
        <el-button class="delete" type="text" size="small" @click="del">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import ProStatusOption from '@/utils/project-status'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    listLoading: {
      type: Boolean,
      default: false
    },
    tableType: {
      type: String,
      default: 'all'
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
    },
    // 删除操作
    del() {
      this.$alert('请联系管理员（何经理、王经理）进行删除操作', '', {
        confirmButtonText: '确定'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
