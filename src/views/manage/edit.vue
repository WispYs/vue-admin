<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
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
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <router-link :to="'/example/edit/'+scope.row.id">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>

          <el-button class="delete" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log(response.data)
        this.list = response.data
        this.listLoading = false
      })
    },
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>
  .status-tab {
    margin: 4px;
  }
  .delete {
    color: #F56C6C;
  }
</style>
