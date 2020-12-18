<template>
  <div class="detail-container">
    <page-back />
    <el-form ref="projectForm" :model="projectForm" label-width="100px" class="project-form">
      <el-row :gutter="24" class="detail-item">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>项目名称：</label>
          <span class="item-info">{{ projectForm.proName }}</span>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>计划创建日期：</label>
          <span class="item-info">{{ projectForm.currentTime | formatYYMMDD }}</span>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>项目状态：</label>
          <span class="item-info">{{ projectForm.status | formatProjectStatus }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="20" :sm="18" :md="18" :lg="12">
          <el-form-item label="计划进度：" prop="plan">
            <el-slider v-model="projectForm.plan" class="progress-slider" disabled />
            <span class="progress-item">{{ projectForm.plan | formatProgress }}%</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="20" :sm="18" :md="18" :lg="12">
          <el-form-item label="完成进度：" prop="completion">
            <el-slider v-model="projectForm.completion" class="progress-slider" disabled />
            <span class="progress-item">{{ projectForm.completion | formatProgress }}%</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="detail-item text-item">
        <el-col :xs="20" :sm="18" :md="18" :lg="12">
          <label>工作内容：</label>
          <span class="item-info">{{ projectForm.content }}</span>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { formatYYMMDD, formatProjectStatus, formatProgress } from '@/utils/format'
import { fetchProgressPlanDetail } from '@/api/progress-plan'

export default {
  components: {
    PageBack
  },
  filters: {
    formatYYMMDD,
    formatProjectStatus,
    formatProgress
  },
  data() {
    return {
      projectForm: {
        proName: '',
        currentTime: '',
        status: '',
        plan: 0,
        completion: 0,
        content: ''
      }
    }
  },
  mounted() {
    this.__getInfo()
  },
  methods: {
    __getInfo() {
      const proNo = this.$route.params.id
      fetchProgressPlanDetail(proNo).then(response => {
        console.log(response)
        this.projectForm = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/detail.scss";

</style>
