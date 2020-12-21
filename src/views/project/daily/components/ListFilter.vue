<template>
  <div class="filter-bar">
    <div class="filter-bar__item">
      <label>项目L号：</label>
      <el-input v-model="proNo" class="filter-item" style="width: 240px" placeholder="请输入项目L号" />
    </div>
    <div class="filter-bar__item">
      <label>项目名称：</label>
      <el-input v-model="proName" class="filter-item" style="width: 240px" placeholder="请输入项目名称" />
    </div>
    <!-- <div class="filter-bar__item">
      <label>生产负责人：</label>
      <el-input v-model="productionMan" class="filter-item" style="width: 200px" placeholder="请输入生产负责人" />
    </div> -->
    <div class="filter-bar__item">
      <el-button type="primary" size="medium" @click="search()">搜索</el-button>
      <el-button type="primary" size="medium" @click="reset()">重置</el-button>
      <!--<el-button type="primary" size="medium" :loading="downloadLoading" @click="handleExport()">导出数据</el-button> -->
      <el-button type="primary" size="medium" @click="$router.push({name: 'DailyCreate'})">添加工时</el-button>
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
      proNo: '',
      proName: ''
    }
  },
  mounted() {

  },
  methods: {
    __initFilter() {
      this.proNo = ''
      this.proName = ''
    },

    __getFilter() {
      return {
        proNo: this.proNo,
        proName: this.proName
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

