<template>
  <div class="create-container">
    <page-back />
    <el-form ref="projectForm" :model="projectForm" :rules="rules" label-width="100px" class="project-form">
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目L号" prop="proNo">
            <el-select v-model.trim="projectForm.proNo" placeholder="请选择项目L号" style="width: 100%" @change="selectProNo">
              <el-option v-for="(item, index) in proNoOption" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="8">
          <el-form-item label="项目名称" prop="proName">
            <el-input v-model="projectForm.proName" disabled />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目类型" prop="proType">
            <el-input v-model="projectForm.proType" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="工时登记日期" prop="currentTime" label-width="110px">
            <el-date-picker v-model="projectForm.currentTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="当日总工时" label-width="110px" prop="totalTime">
            <el-input v-model="projectForm.totalTime">
              <template slot="append">人/天</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="工作内容" prop="content">
        <el-input v-model="projectForm.content" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="submitForm('projectForm')">添加工时</el-button>
        <el-button @click="resetForm('projectForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { workTimeD2H, workTimeH2D } from '@/utils/format'
import { fetchProNo, fetchProDetail, addDailyWork } from '@/api/daily'
import PageBack from '@/components/PageBack'

export default {
  components: {
    PageBack
  },
  data() {
    const isNumber = (rule, value, callback) => {
      if (!/^\d+(\.\d+)?$/.test(value)) {
        callback(new Error('请输入正确的数字值'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      proNoOption: [],
      projectForm: {
        proNo: '',
        currentTime: '',
        totalTime: '',
        content: ''
      },
      rules: {
        proNo: [
          { required: true, message: '请选择项目名称', trigger: 'blur' }
        ],
        currentTime: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        totalTime: [
          { required: true, message: '请填写当日总工时', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.__getProNo()
  },
  methods: {
    // 获取所有项目编号
    __getProNo() {
      fetchProNo().then(response => {
        this.proNoOption = response.data
      })
    },
    selectProNo(val) {
      fetchProDetail(val).then(response => {
        this.projectForm = Object.assign({}, this.projectForm, {
          proName: response.data[0].proName,
          proType: response.data[0].proType
        })
      })
    },
    createDaily(formData) {
      this.loading = true
      addDailyWork(formData).then(response => {
        console.log(response)
        this.$message.success(response.message)
        this.loading = false
        this.$router.push({ name: 'Daily' })
      }).catch(error => {
        console.log(error)
        this.projectForm.totalTime = workTimeH2D(this.projectForm.totalTime)
        this.loading = false
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.loading) {
            this.$confirm('确定添加该条日工时?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const formData = Object.assign(this.projectForm, {
                totalTime: workTimeD2H(this.projectForm.totalTime)
              })
              console.log(formData)
              this.createDaily(formData)
            }).catch(() => {

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
