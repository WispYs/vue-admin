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
    <div class="filter-bar__item">
      <label>发货状态：</label>
      <el-select v-model="deliverStatus" placeholder="请选择发货状态" @change="search()">
        <el-option v-for="(item, index) in ProStatusOption.DeliverStatus" :key="index" :label="item.name" :value="item.value" />
      </el-select>
    </div>
    <div class="filter-bar__item">
      <el-button type="primary" size="medium" @click="search()">搜索</el-button>
      <el-button type="primary" size="medium" @click="reset()">重置</el-button>
      <!--<el-button type="primary" size="medium" :loading="downloadLoading" @click="handleExport()">导出数据</el-button> -->
    </div>
  </div>
</template>

<script>
import ProStatusOption from '@/utils/project-status'

export default {
  props: {
    downloadLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ProStatusOption,
      proNo: '',
      proName: '',
      deliverStatus: ''
    }
  },
  mounted() {

  },
  methods: {
    __initFilter() {
      this.proNo = ''
      this.proName = ''
      this.deliverStatus = ''
    },

    __getFilter() {
      return {
        proNo: this.proNo,
        proName: this.proName,
        deliverStatus: this.deliverStatus
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
