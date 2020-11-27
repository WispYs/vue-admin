<template>
  <div class="list-container">
    <filter-bar @search-click="queryData" @reset-click="queryData" />
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
              <span>{{ scope.row.name }}</span>
            </el-form-item>
            <el-form-item label="销售负责人">
              <span>{{ scope.row.salesman }}</span>
            </el-form-item>
            <el-form-item label="项目工程师">
              <span>{{ scope.row.engineer }}</span>
            </el-form-item>
            <el-form-item label="反馈提货">
              <span>{{ scope.row.pickFeedback ? '是' : '否' }}</span>
            </el-form-item>
            <el-form-item label="成套计划工时">
              <span>{{ scope.row.hours }}小时</span>
            </el-form-item>
            <el-form-item label="成套剩余工时">
              <span>{{ scope.row.surplusHours }}小时</span>
            </el-form-item>
            <el-form-item label="成套资料提交日期">
              <span>{{ scope.row.dataSubmitTime }}</span>
            </el-form-item>
            <el-form-item label="材料提货时间">
              <span>{{ scope.row.dataPickupTime }}</span>
            </el-form-item>
            <el-form-item label="材料要求到货时间">
              <span>{{ scope.row.dataPlanTime }}</span>
            </el-form-item>
            <el-form-item label="成套计划启动时间">
              <span>{{ scope.row.planStartTime }}</span>
            </el-form-item>
            <el-form-item label="成套计划完成时间">
              <span>{{ scope.row.planFinishTime }}</span>
            </el-form-item>
            <el-form-item label="原计划发货日期">
              <span>{{ scope.row.PlanDeliveryTime }}</span>
            </el-form-item>

            <el-form-item label="设计阶段-项目计划">
              <el-tag v-for="(item, index) in dStatusOption" :key="index" class="status-tab" size="small" :type="scope.row.dStatusArr.indexOf(item) > -1 ? 'success' : 'info'">{{ item }}</el-tag>
            </el-form-item>
            <el-form-item label="生产阶段-项目计划">
              <el-tag v-for="(item, index) in pStatusOption" :key="index" class="status-tab" size="small" :type="scope.row.pStatusArr.indexOf(item) > -1 ? 'success' : 'info'">{{ item }}</el-tag>
            </el-form-item>
            <el-form-item label="缺料反馈">
              <span>{{ scope.row.lackFeedback }}</span>
            </el-form-item>
            <el-form-item label="项目问题汇总" class="lg-item">
              <span>{{ scope.row.issue }}</span>
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
      <el-table-column align="center" label="项目L号" width="100" prop="id" sortable>
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目类型" width="120" prop="type" sortable>
        <template slot-scope="scope">
          {{ scope.row.type }}
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
      <el-table-column align="center" :label="'折算\n标准柜'" width="65">
        <template slot-scope="scope">
          {{ scope.row.cabinetAverage }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'成套\n计划工时'" width="120">
        <template slot-scope="scope">
          {{ scope.row.hours }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'成套班组'" width="120" prop="team" sortable>
        <template slot-scope="scope">
          {{ scope.row.team }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="$router.push({name: 'Edit', params: {id: scope.row.id}})">编辑</el-button>
          <el-button class="delete" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="__getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/project'
// import mockData from '@/mock/mock-data'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/FilterBar'
export default {
  components: { Pagination, FilterBar },
  data() {
    return {
      dStatusOption: ['柜体订货', '主材订货', '辅材订货', '资料提交'],
      pStatusOption: ['领料排版', '接线成套', '上电测试', '打包待发'],
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      tableHeight: 300
    }
  },
  created() {
    this.__getList()
  },
  mounted() {
    this.$nextTick(() => {
      this.setTableHeight()
      // 监听窗口大小变化
      window.addEventListener('resize', this.setTableHeight, true)
    })
  },
  methods: {
    __getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.list
        this.total = response.total
        this.listLoading = false
      })
    },
    queryData(filter) {
      this.listQuery = Object.assign(filter, {
        page: 1,
        limit: 20
      })
      this.__getList()
    },
    setTableHeight() {
      const htmlHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      // 170 = 导航栏 + 分页器的高度
      if (this.$refs.table && this.$refs.table.$el) {
        this.tableHeight = htmlHeight - this.$refs.table.$el.offsetTop - 170
      }
    },
    handleClick(row) {
      console.log(row)
    },
    // 表格单元格样式
    cellStyle() {
      return 'font-size: 13px'
    }
  }
}
</script>

<style lang="scss">
  .list-container {
    padding: 20px;
  }
  .status-tab {
    margin: 4px;
  }
  .delete {
    color: #F56C6C;
  }
  .table-expand {
    .el-form-item {
      font-size: 13px;
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
      &.lg-item {
        width: 100%;
      }
      label {
        position: relative;
        width: 150px;
        color: #999;
        &::after {
          position: absolute;
          content: '：';
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
        }
      }
      &__content {
        font-size: 13px;
        width: calc(100% - 150px);
      }
    }
  }
  .pre-line{
    .cell {
      white-space:pre-line;
    }
  }
</style>

