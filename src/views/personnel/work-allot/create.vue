<template>
  <div class="create-container">
    <page-back />
    <el-form ref="userForm" :model="userForm" :rules="rules" label-width="100px" class="user-form">
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="员工编号" prop="userNo">
            <el-select v-model="userForm.userNo" placeholder="请选择员工编号" style="width: 100%">
              <el-option v-for="(item, index) in userNoOption" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="18" :md="8" :lg="8">
          <el-form-item label="员工名字" prop="userName">
            <el-input v-model="userForm.userName" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="日报日期" prop="currentTime">
            <el-date-picker v-model="userForm.currentTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="工作内容" prop="content">
        <el-input v-model="userForm.content" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-row :gutter="24">
        <el-col :xs="20" :sm="18" :md="18" :lg="12">
          <el-form-item label="完成率" prop="completion">
            <el-slider v-model="userForm.completion" class="progress-slider" />
            <span class="progress-item">{{ userForm.completion }}%</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="20" :sm="18" :md="18" :lg="12">
          <el-form-item label="评价" prop="evaluation">
            <el-radio v-model="userForm.evaluation" label="1">优</el-radio>
            <el-radio v-model="userForm.evaluation" label="2">良</el-radio>
            <el-radio v-model="userForm.evaluation" label="3">中</el-radio>
            <el-radio v-model="userForm.evaluation" label="4">差</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="submitForm('userForm')">新建工作</el-button>
        <el-button @click="resetForm('userForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { addWorkingDays } from '@/api/last-week-works'

export default {
  components: {
    PageBack
  },
  data() {
    return {
      loading: false,
      userNoOption: [
        'A20032',
        'A20032',
        'A20032'
      ],
      userForm: {
        userNo: '',
        userName: '',
        currentTime: '',
        content: '',
        completion: '',
        evaluation: ''
      },
      rules: {
        userNo: [
          { required: true, message: '请填写员工编号', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请填写员工名字', trigger: 'blur' }
        ],
        currentTime: [
          { required: true, message: '请选择日报日期', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写工作内容', trigger: 'blur' }
        ],
        completion: [
          { required: true, message: '请选择工作完成率', trigger: 'blur' }
        ],
        evaluation: [
          { required: true, message: '请选择评价', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const formData = Object.assign(this.userForm, {
            completion: this.userForm.completion / 100
          })
          console.log(formData)
          addWorkingDays(formData).then(response => {
            console.log(response)
            this.$message.success(response.message)
            this.loading = false
            this.$router.push({ name: 'WorkAllot' })
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
