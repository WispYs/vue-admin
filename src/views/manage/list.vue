<template>
  <div class="list">
    <filter-bar />
    <el-table
      ref="table"
      v-loading="listLoading"
      :data="list"
      :height="tableHeight"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="材料计划到货时间" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dateTime1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成套计划完成时间" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dateTime2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划发货日期" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dateTime3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际发货日期" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dateTime4 }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="设计阶段-项目状态" width="250" align="center">
        <template slot-scope="scope">
          <el-tag v-for="(item, index) in scope.row.dStatusArr" :key="index" class="status-tab" size="small" :type="item.status == 1 ? 'success' : 'warning'">{{ item.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="生产阶段-项目状态" width="250" align="center">
        <template slot-scope="scope">
          <el-tag v-for="(item, index) in scope.row.pStatusArr" :key="index" class="status-tab" size="small" :type="item.status == 1 ? 'success' : 'info'">{{ item.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="项目问题汇总" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.issue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目负责人" width="90" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.stakeholder }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="$router.push({name: 'Edit', params: {id: scope.row.id}})">编辑</el-button>
          <el-button class="delete" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/manage-list'
// import mockData from '@/mock/mock-data'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/FilterBar'
export default {
  components: { Pagination, FilterBar },
  data() {
    return {
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
    this.getList()
  },
  mounted() {
    this.$nextTick(() => {
      this.setTableHeight()
      // 监听窗口大小变化
      window.addEventListener('resize', this.setTableHeight, true)
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      // console.log(mockData.projectList)
      // this.list = mockData.projectList.list
      // this.total = mockData.projectList.total
      // this.listLoading = false

      fetchList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.list
        this.total = response.total
        this.listLoading = false
      })
    },
    setTableHeight() {
      const htmlHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      // 150 = 导航栏 + 分页器的高度
      if (this.$refs.table && this.$refs.table.$el) {
        this.tableHeight = htmlHeight - this.$refs.table.$el.offsetTop - 170
      }
    },
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>
  .list {
    padding: 20px;
  }
  .status-tab {
    margin: 4px;
  }
  .delete {
    color: #F56C6C;
  }
</style>
