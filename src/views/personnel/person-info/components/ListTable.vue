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
    <el-table-column label="员工编号" width="200" prop="userNo" sortable>
      <template slot-scope="scope">
        {{ scope.row.userNo }}
      </template>
    </el-table-column>
    <el-table-column label="员工名字" prop="userName">
      <template slot-scope="scope">
        {{ scope.row.userName }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="250" align="center">
      <template slot-scope="scope">
        <!-- <el-button type="text" size="small" @click="$router.push({name: 'PersonInfoDetail', params: {id: scope.row.id}})">查看</el-button> -->
        <el-button type="text" size="small" @click="$router.push({name: 'PersonInfoEdit', params: {id: scope.row.id}})">编辑</el-button>
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
