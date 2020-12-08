<template>
  <el-table :data="list" class="weekplan-wrapper">
    <el-table-column label="项目名称" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.proName }}
      </template>
    </el-table-column>
    <el-table-column label="项目责任人" width="150" align="center">
      <template slot-scope="scope">
        {{ scope.row.proMan }}
      </template>
    </el-table-column>
    <el-table-column label="项目风险" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.proRisk | riskStatusFilter" size="small">
          {{ row.proRisk | riskFilter }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  filters: {
    riskFilter(status) {
      // 0:有风险,1:已延误,2:正常
      const riskMap = {
        '0': '有风险',
        '1': '已延误',
        '2': '正常'
      }
      return riskMap[status]
    },
    riskStatusFilter(status) {
      // 0:有风险,1:已延误,2:正常
      const riskMap = {
        '0': 'warning',
        '1': 'danger',
        '2': 'success'
      }
      return riskMap[status]
    }

  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.weekplan-wrapper {
  max-height: 290px;
  &:hover {
    overflow: auto;
  }
}

</style>
