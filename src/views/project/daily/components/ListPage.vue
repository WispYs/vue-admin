<template>
  <div class="list-container">
    <list-filter
      :download-loading="downloadLoading"
      @search-click="queryData"
      @reset-click="queryData"
      @export-click="exportExcel"
    />
    <list-table :list="list" :list-loading="listLoading" @delete-click="delClick" />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="__getList"
    />
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import ExcelFields from '@/utils/excel-fields'
import Pagination from '@/components/Pagination'
import ListFilter from './ListFilter'
import ListTable from './ListTable'
import { deleteDailyWork } from '@/api/daily'

export default {
  components: { Pagination, ListFilter, ListTable },
  props: {
    listLoading: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      downloadLoading: false,
      listQuery: {
        page: 1,
        size: 10
      },
      filter: {
        proNo: '',
        proName: ''
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
      const page = this.listQuery.page
      const size = this.listQuery.size
      const filter = this.filter
      this.$emit('fetch-list', page, size, filter)
    },

    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__getList()
    },

    // 删除操作
    delClick(id) {
      const limit = 1
      if (limit === 1) {
        this.$confirm('是否删除该项目?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDailyWork(id).then(response => {
            console.log(response)
            this.$message.success(response.message)
            this.__getList()
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        })
      } else {
        this.$alert('请联系管理员（何经理）进行删除操作', '', {
          confirmButtonText: '确定'
        })
      }
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
          filename: '20年成套生产计划表',
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
    }

  }
}
</script>

<style lang="scss" scoped>
  @import '~@/styles/list-page.scss';

</style>

