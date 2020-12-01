<template>
  <div class="list-container">
    <list-filter
      :download-loading="downloadLoading"
      :filter-type="pageType"
      @search-click="queryData"
      @reset-click="queryData"
      @export-click="exportExcel"
    />
    <list-table :list="list" :list-loading="listLoading" :table-type="pageType" />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="__getList"
    />
  </div>
</template>

<script>
import { fetchList } from '@/api/project'
import { parseTime } from '@/utils'
import ExcelFields from '@/utils/excel-fields'
import ProStatusOption from '@/utils/project-status'
// import mockData from '@/mock/mock-data'
import Pagination from '@/components/Pagination'
import ListFilter from './ListFilter'
import ListTable from './ListTable'

export default {
  components: { Pagination, ListFilter, ListTable },
  props: {
    pageType: {
      // all - 项目实施计划表; completed - 成套已完成项目; workshop - 车间成套项目;
      // delived - 发货已完成项目; weekPlanDeliver - 本周计划发货项目;
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      ProStatusOption, // 项目状态字段配置表
      downloadLoading: false,
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.__getList()
  },
  mounted() {

  },
  methods: {
    // 获取列表数据
    __getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.list
        this.total = response.total
        this.listLoading = false
      })
    },

    // 导出Excel
    exportExcel() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ExcelFields.title
        const filterVal = ExcelFields.data
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '20年项目实施计划表',
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },

    // 查询数据
    queryData(filter) {
      this.listQuery = Object.assign(filter, {
        page: 1,
        limit: 20
      })
      this.__getList()
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

