<template>
  <div class="create-container">
    <page-back />
    <el-form ref="accountForm" :model="accountForm" :rules="rules" label-width="100px" class="account-form">
      <el-row :gutter="24">
        <el-col :xs="18" :sm="18" :md="8" :lg="6">
          <el-form-item label="账号名称" prop="accountName">
            <el-input v-model="accountForm.accountName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="18" :md="8" :lg="6">
          <el-form-item label="账号密码" prop="accountPassword">
            <el-input v-model="accountForm.accountPassword" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="审核状态" prop="auditStatus">
            <el-select v-model="accountForm.auditStatus" placeholder="请选择项目状态">
              <el-option v-for="(item, index) in ProStatusOption.auditStatus" :key="index" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="submitForm('accountForm')">添加账号</el-button>
        <el-button @click="resetForm('accountForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { addPersonInfo } from '@/api/person-info'
import ProStatusOption from '@/utils/project-status'

export default {
  components: {
    PageBack
  },
  data() {
    return {
      loading: false,
      ProStatusOption,
      accountForm: {
        accountName: '',
        accountPassword: '',
        auditStatus: ''
      },
      rules: {
        accountName: [
          { required: true, message: '请填写账号名称', trigger: 'blur' }
        ],
        accountPassword: [
          { required: true, message: '请填写账号密码', trigger: 'blur' }
        ],
        auditStatus: [
          { required: true, message: '请选择审核状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async createPerson(formData) {
      try {
        const response = await addPersonInfo(formData)
        this.$message.success(response.message)
        this.loading = false
        this.$router.push({ name: 'Audit' })
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.loading) {
            this.$confirm('确定添加该账号?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading = true
              const formData = this.accountForm
              console.log(formData)
              this.createPerson(formData)
            })
          }
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
