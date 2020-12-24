<template>
  <div class="edit-container">
    <page-back />
    <el-form ref="accountForm" :model="accountForm" :rules="rules" label-width="100px" class="account-form">
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
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
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="角色分配" prop="auditStatus">
            <el-select v-model="accountForm.role" placeholder="请选择账号角色">
              <el-option v-for="(item, index) in roleOption" :key="index" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="submitForm('accountForm')">审核</el-button>
        <el-button @click="resetForm('accountForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { fetchPersonInfoDetail, editPersonInfo } from '@/api/person-info'
import ProStatusOption from '@/utils/project-status'

export default {
  components: {
    PageBack
  },
  data() {
    return {
      loading: false,
      ProStatusOption,
      roleOption: [
        {
          name: '子管理员',
          value: '1'
        }, {
          name: '操作人员',
          value: '2'
        }, {
          name: '访客',
          value: '3'
        }
      ],
      accountForm: {
        accountName: '',
        accountPassword: '',
        auditStatus: '',
        role: ''
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
        ],
        role: [
          { required: true, message: '请选择账号角色', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.__getInfo()
  },
  methods: {
    __getInfo() {
      const accountNo = this.$route.params.id
      fetchPersonInfoDetail(accountNo).then(response => {
        console.log(response)
        this.accountForm = response.data
      })
    },
    async editPerson(accountNo, formData) {
      try {
        const response = await editPersonInfo(accountNo, formData)
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
            this.$confirm('确定审核该账号?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading = true
              const accountNo = this.$route.params.id
              const formData = this.accountForm
              this.editPerson(accountNo, formData)
            })
          }
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
