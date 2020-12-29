<template>
  <div class="create-container">
    <page-back />
    <el-form ref="accountForm" :model="accountForm" :rules="rules" label-width="100px" class="account-form">
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="accountForm.mobile" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="账号昵称" prop="nickname">
            <el-input v-model="accountForm.nickname" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="账号密码" prop="password">
            <el-input v-model="accountForm.password" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="账号角色" prop="rolename">
            <el-select v-model="accountForm.rolename" placeholder="请选择账号角色">
              <el-option v-for="(item, index) in roleOption" :key="index" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="审核状态" prop="state">
            <el-select v-model="accountForm.state" placeholder="请选择审核状态">
              <el-option v-for="(item, index) in auditOption" :key="index" :label="item.name" :value="item.value" />
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
import { addAccount } from '@/api/account'

export default {
  components: {
    PageBack
  },
  data() {
    return {
      loading: false,
      roleOption: [
        {
          name: '子管理员',
          value: 'admin'
        }, {
          name: '操作人员',
          value: 'operator'
        }, {
          name: '访客',
          value: 'visitor'
        }
      ],
      auditOption: [
        {
          name: '未启用',
          value: '0'
        }, {
          name: '已启用',
          value: '1'
        }
      ],
      accountForm: {
        mobile: '',
        nickname: '',
        password: '',
        rolename: '',
        state: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请填写账号手机号', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请填写账号昵称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写账号密码', trigger: 'blur' }
        ],
        rolename: [
          { required: true, message: '请选择账号角色', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择审核状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async createPerson(formData) {
      try {
        const response = await addAccount(formData)
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
