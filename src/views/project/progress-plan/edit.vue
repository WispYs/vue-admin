<template>
  <div class="edit-container">
    <page-back />
    <el-form ref="projectForm" :model="projectForm" :rules="rules" label-width="100px" class="demo-projectForm">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="18" :md="8" :lg="8">
          <el-form-item label="项目名称" prop="proName">
            <el-select v-model="projectForm.proName" placeholder="请选择项目名称" style="width: 100%">
              <el-option v-for="(item, index) in proNameOption" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="计划创建日期" prop="currentTime" label-width="110px">
            <el-date-picker v-model="projectForm.currentTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目状态" prop="status" label-width="110px">
            <el-select v-model="projectForm.status" placeholder="请选择项目状态">
              <el-option label="未开始" value="0" />
              <el-option label="进行中" value="1" />
              <el-option label="已完成" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="20" :sm="18" :md="18" :lg="12">
          <el-form-item label="计划进度" prop="plan">
            <el-slider v-model="projectForm.plan" class="progress-slider" />
            <span class="progress-item">{{ projectForm.plan }}%</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="20" :sm="18" :md="18" :lg="12">
          <el-form-item label="完成进度" prop="completion">
            <el-slider v-model="projectForm.completion" class="progress-slider" />
            <span class="progress-item">{{ projectForm.completion }}%</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="工作内容" prop="content">
        <el-input v-model="projectForm.content" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="submitForm('projectForm')">编辑</el-button>
        <el-button @click="resetForm('projectForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { formatProgress } from '@/utils/format'
import { fetchProgressPlanDetail, editProgressPlan, fetchPlanProName } from '@/api/progress-plan'

export default {
  components: {
    PageBack
  },
  data() {
    return {
      loading: false,
      proNameOption: [
        '项目A',
        '项目B',
        '项目C'
      ],
      projectForm: {
        proName: '',
        currentTime: '',
        status: '',
        plan: 0,
        completion: 0,
        content: ''
      },
      rules: {
        proName: [
          { required: true, message: '请选择项目名称', trigger: 'blur' }
        ],
        currentTime: [
          { required: true, message: '请选择创建时间', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择项目状态', trigger: 'blur' }
        ],
        plan: [
          { required: true, message: '请选择计划进度', trigger: 'blur' }
        ],
        completion: [
          { required: true, message: '请选择完成进度', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写工作内容', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.__getInfo()
    this.__getPlanProName()
  },
  methods: {
    __getInfo() {
      const proNo = this.$route.params.id
      fetchProgressPlanDetail(proNo).then(response => {
        console.log(response)
        this.projectForm = Object.assign(response.data, {
          plan: formatProgress(response.data.plan),
          completion: formatProgress(response.data.completion)
        })
      })
    },
    __getPlanProName() {
      fetchPlanProName().then(response => {
        this.proNameOption = response.data
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const proNo = this.$route.params.id
          const formData = Object.assign(this.projectForm, {
            plan: this.projectForm.plan / 100,
            completion: this.projectForm.completion / 100
          })
          editProgressPlan(proNo, formData).then(response => {
            console.log(response)
            this.$message.success(response.message)
            this.loading = false
            this.$router.push({ name: 'ProgressPlan' })
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        } else {
          this.$message.error('请填写完整信息')
          return false
        }
      })
    },
    resetForm(formName) {
      this.__getInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-container {
    padding: 40px;
    position: relative;
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
