<template>
  <div class="filter-bar">
    <div class="filter-bar__item">
      <label>账号昵称：</label>
      <el-input v-model="nickname" class="filter-item" style="width: 150px" placeholder="请输入账号昵称" />
    </div>
    <div class="filter-bar__item">
      <label>审核状态：</label>
      <el-select v-model="state" placeholder="请选择审核状态" @change="search()">
        <el-option v-for="(item, index) in auditOption" :key="index" :label="item.name" :value="item.value" />
      </el-select>
    </div>
    <div class="filter-bar__item">
      <el-button type="primary" size="medium" @click="search()">搜索</el-button>
      <el-button type="primary" size="medium" @click="reset()">重置</el-button>
      <!--<el-button type="primary" size="medium" :loading="downloadLoading" @click="handleExport()">导出数据</el-button> -->
      <el-button type="primary" size="medium" @click="$router.push({name: 'AuditCreate'})">添加账号</el-button>
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
      auditOption: [
        {
          name: '未启用',
          value: '0'
        }, {
          name: '已启用',
          value: '1'
        }
      ],
      nickname: '',
      state: ''
    }
  },
  mounted() {

  },
  methods: {
    __initFilter() {
      this.nickname = ''
      this.state = ''
    },

    __getFilter() {
      return {
        nickname: this.nickname,
        state: this.state
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
