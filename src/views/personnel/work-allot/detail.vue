<template>
  <div class="detail-container">
    <page-back />
    <el-form ref="userForm" :model="userForm" label-width="100px" class="demo-userForm">
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
          <span class="item-info">{{ userForm.currentTime }}</span>
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
            <span class="progress-item">{{ userForm.completion }}%</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="detail-item">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>评价：</label>
          <span class="item-info">{{ userForm.evaluation }}</span>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { formatProgress, formatYYMMDD, formatEvaluation } from '@/utils/format'
import { fetchWorkingDaysDetail } from '@/api/working-days'

export default {
  components: {
    PageBack
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
        this.userForm = Object.assign(response.data, {
          currentTime: formatYYMMDD(response.data.currentTime),
          completion: formatProgress(response.data.completion),
          evaluation: formatEvaluation(response.data.evaluation)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-container {
    padding: 40px;
    position: relative;
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
