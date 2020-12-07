<template>
  <div class="detail-container">
    <el-form ref="projectForm" :model="projectForm" label-width="100px" class="demo-projectForm">
      <el-row :gutter="24" class="detail-item">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>项目名称：</label>
          <span class="item-info">{{ projectForm.proName }}</span>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>计划创建日期：</label>
          <span class="item-info">{{ projectForm.currentTime }}</span>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>项目状态：</label>
          <span class="item-info">{{ projectForm.status }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="20" :sm="18" :md="18" :lg="12">
          <el-form-item label="计划进度：" prop="plan">
            <el-slider v-model="projectForm.plan" class="progress-slider" disabled />
            <span class="progress-item">{{ projectForm.plan }}%</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="20" :sm="18" :md="18" :lg="12">
          <el-form-item label="完成进度：" prop="completion">
            <el-slider v-model="projectForm.completion" class="progress-slider" disabled />
            <span class="progress-item">{{ projectForm.completion }}%</span>
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
import { formatYYMMDD, formatProjectStatus, formatProgress } from '@/utils/format'

import { fetchProgressPlanDetail } from '@/api/progress-plan'

export default {
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
        this.projectForm = Object.assign(response.data, {
          currentTime: formatYYMMDD(response.data.currentTime),
          status: formatProjectStatus(response.data.status),
          plan: formatProgress(response.data.plan),
          completion: formatProgress(response.data.completion)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-container {
    padding: 40px;
    .detail-item {
      margin-bottom: 22px;
      label {
        min-width: 100px;
        display: inline-block;
        text-align: right;
        vertical-align: middle;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      .item-info {
        display: inline-block;
        line-height: 40px;
        font-size: 14px;
        color: #606266;
      }
      .el-tag {
        margin-right: 10px;
      }
      &.text-item {
        label {
          float: left;
        }
        .item-info {
          width: calc(100% - 125px);
        }
      }
    }
    .progress-slider {
      display: inline-block;
      width: calc(100% - 60px);
      margin:0 10px;
    }
    .progress-item {
      line-height: 38px;
      float: right;
    }
  }
  .el-textarea {
    width: 60%;
  }
</style>
