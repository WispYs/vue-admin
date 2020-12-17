<template>
  <div class="filter-bar">
    <div class="filter-bar__item">
      <label>员工编号：</label>
      <el-input v-model="userNo" class="filter-item" style="width: 150px" placeholder="请输入员工编号" />
    </div>
    <div class="filter-bar__item">
      <label>员工名称：</label>
      <el-input v-model="userName" class="filter-item" style="width: 150px" placeholder="请输入员工名称" />
    </div>
    <div class="filter-bar__item">
      <el-button type="primary" size="medium" @click="search()">搜索</el-button>
      <el-button type="primary" size="medium" @click="reset()">重置</el-button>
      <!--<el-button type="primary" size="medium" :loading="downloadLoading" @click="handleExport()">导出数据</el-button> -->
      <el-button type="primary" size="medium" @click="$router.push({name: 'PersonInfoCreate'})">添加员工</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    downloadLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userNo: '',
      userName: ''
    }
  },
  mounted() {

  },
  methods: {
    __initFilter() {
      this.userNo = ''
      this.userName = ''
    },

    __getFilter() {
      return {
        userNo: this.userNo,
        userName: this.userName
      }
    },
    search() {
      this.$emit('search-click', this.__getFilter())
    },
    reset() {
      this.__initFilter()
      this.$emit('reset-click', this.__getFilter())
    },
    handleExport() {
      this.$emit('export-click')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/styles/list-filter.scss';

</style>
