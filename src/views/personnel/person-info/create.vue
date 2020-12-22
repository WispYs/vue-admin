<template>
  <div class="create-container">
    <page-back />
    <el-form ref="userForm" :model="userForm" :rules="rules" label-width="100px" class="user-form">
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="员工编号" prop="userNo">
            <el-input v-model="userForm.userNo" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="18" :md="8" :lg="6">
          <el-form-item label="员工名字" prop="userName">
            <el-input v-model="userForm.userName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="submitForm('userForm')">添加员工</el-button>
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
      userForm: {
        userNo: '',
        userName: ''
      },
      rules: {
        userNo: [
          { required: true, message: '请填写员工编号', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请填写员工名字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const formData = this.userForm
          console.log(formData)
          addWorkingDays(formData).then(response => {
            console.log(response)
            this.$message.success(response.message)
            this.loading = false
            this.$router.push({ name: 'PersonInfo' })
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
