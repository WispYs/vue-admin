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
  >
    <el-table-column align="center" label="序号" width="50">
      <template slot-scope="scope">
        {{ scope.$index+1 }}
      </template>
    </el-table-column>
    <el-table-column label="账号名称" prop="accountName">
      <template slot-scope="scope">
        {{ scope.row.accountName }}
      </template>
    </el-table-column>
    <el-table-column label="账号密码" prop="accountPassword">
      <template slot-scope="scope">
        {{ scope.row.accountPassword }}
      </template>
    </el-table-column>
    <el-table-column label="审核状态" prop="auditStatus">
      <template slot-scope="scope">
        {{ scope.row.auditStatus }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="250" align="center">
      <template slot-scope="scope">
        <!-- <el-button type="text" size="small" @click="$router.push({name: 'PersonInfoDetail', params: {id: scope.row.id}})">查看</el-button> -->
        <el-button type="text" size="small" @click="$router.push({name: 'AuditEdit', params: {id: scope.row.id}})">审核</el-button>
        <el-button class="delete" type="text" size="small" @click="delClick(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
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

<style lang="scss">
  @import '~@/styles/list-table.scss';

</style>
