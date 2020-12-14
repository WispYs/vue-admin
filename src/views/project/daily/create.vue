<template>
  <div class="create-container">
    <page-back />
    <el-form ref="projectForm" :model="projectForm" :rules="rules" label-width="100px" class="demo-projectForm">
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目L号" prop="proNo">
            <el-select v-model="projectForm.proNo" placeholder="请选择项目L号" style="width: 100%">
              <el-option v-for="(item, index) in proNoOption" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="日期" prop="currentTime" label-width="110px">
            <el-date-picker v-model="projectForm.currentTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="当日总工时" label-width="110px" prop="targetDay">
            <el-input v-model="projectForm.targetDay">
              <template slot="append">人/天</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="submitForm('projectForm')">添加工时</el-button>
        <el-button @click="resetForm('projectForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addProgressPlan, fetchPlanProName } from '@/api/progress-plan'
import PageBack from '@/components/PageBack'

export default {
  components: {
    PageBack
  },
  data() {
    // 比较计划进度和完成进度
    const compareNumber = (rule, value, callback) => {
      const plan = this.projectForm.plan
      const completion = this.projectForm.completion
      // if (!plan) {
      //   callback(new Error('请先选择计划进度'))
      // }
      if (completion > plan) {
        this.projectForm.completion = this.projectForm.plan
      } else {
        callback()
      }
    }
    return {
      loading: false,
      proNoOption: [
        '项目A',
        '项目B',
        '项目C'
      ],
      projectForm: {
        proNo: '',
        currentTime: '',
        status: '',
        plan: 0,
        completion: 0,
        content: ''
      },
      rules: {
        proNo: [
          { required: true, message: '请选择项目名称', trigger: 'blur' }
        ],
        currentTime: [
          { required: true, message: '请选择创建时间', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择项目状态', trigger: 'blur' }
        ],
        plan: [
          { required: true, message: '请选择计划进度', trigger: 'blur' },
          { validator: compareNumber, trigger: 'change' }
        ],
        completion: [
          { required: true, message: '请选择完成进度', trigger: 'blur' },
          { validator: compareNumber, trigger: 'change' }
        ],
        content: [
          { required: true, message: '请填写工作内容', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.__getPlanProName()
  },
  methods: {
    __getPlanProName() {
      this.proNoOption = ['L20035', 'L20356', 'L20344']
      // fetchPlanProName().then(response => {
      //   this.proNoOption = response.data
      // })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const formData = Object.assign(this.projectForm, {
            plan: this.projectForm.plan / 100,
            completion: this.projectForm.completion / 100
          })
          addProgressPlan(formData).then(response => {
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
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-container {
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
