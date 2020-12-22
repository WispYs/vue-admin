<template>
  <div class="detail-container">
    <page-back />
    <el-form ref="userForm" :model="userForm" label-width="100px" class="user-form">
      <el-row :gutter="24" class="detail-item">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>员工编号：</label>
          <span class="item-info">{{ userForm.userNo }}</span>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>员工名字：</label>
          <span class="item-info">{{ userForm.userName }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="detail-item">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>日报日期：</label>
          <span class="item-info">{{ userForm.currentTime | formatYYMMDD }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="detail-item">
        <label>工作内容：</label>
        <span class="item-info">{{ userForm.content }}</span>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="20" :sm="18" :md="18" :lg="12">
          <el-form-item label="完成率：" prop="completion">
            <el-slider v-model="userForm.completion" class="progress-slider" disabled />
            <span class="progress-item">{{ userForm.completion | formatProgress }}%</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="detail-item">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>评价：</label>
          <span class="item-info">{{ userForm.evaluation | formatEvaluation }}</span>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { formatProgress, formatYYMMDD, formatEvaluation } from '@/utils/format'
import { fetchWorkingDaysDetail } from '@/api/last-week-works'

export default {
  components: {
    PageBack
  },
  filters: {
    formatProgress,
    formatYYMMDD,
    formatEvaluation
  },
  data() {
    return {
      userForm: {
        userNo: '',
        userName: '',
        currentTime: '',
        content: '',
        completion: '',
        evaluation: ''
      }
    }
  },
  mounted() {
    this.__getInfo()
  },
  methods: {
    __getInfo() {
      const proNo = this.$route.params.id
      fetchWorkingDaysDetail(proNo).then(response => {
        console.log(response)
        this.userForm = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/detail.scss";

</style>
