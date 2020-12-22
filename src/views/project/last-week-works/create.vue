<template>
  <div class="create-container">
    <page-back />
    <el-form ref="projectForm" :model="projectForm" :rules="rules" label-width="100px" class="project-form">
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目L号" prop="proNo">
            <el-input v-model.trim="projectForm.proNo" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="18" :md="8" :lg="8">
          <el-form-item label="项目名称" prop="proName">
            <el-input v-model="projectForm.proName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="柜体数量" prop="cabinetNum">
            <el-input v-model.number="projectForm.cabinetNum" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="生产负责人" prop="productionMan">
            <el-input v-model="projectForm.productionMan" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="成本工时" prop="costDay">
            <el-input v-model="projectForm.costDay">
              <template slot="append">人/天</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="预算目标工时" label-width="110px" prop="targetDay">
            <el-input v-model="projectForm.targetDay">
              <template slot="append">人/天</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="实际汇总工时" label-width="110px" prop="actualDay">
            <el-input v-model="projectForm.actualDay">
              <template slot="append">人/天</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="20" :sm="18" :md="18" :lg="12">
          <el-form-item label="工时完成率" prop="completionRate">
            <el-slider v-model="projectForm.completionRate" class="progress-slider" />
            <span class="progress-item">{{ projectForm.completionRate }}%</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="submitForm('projectForm')">新建项目</el-button>
        <el-button @click="resetForm('projectForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { addWorkingDays } from '@/api/last-week-works'
import { workTimeD2H } from '@/utils/format'

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
    const validateNumber = (name) => {
      return [
        { required: true, message: `${name}不能为空，若没有请填0` },
        { type: 'number', message: `${name}必须为数字值` }
      ]
    }
    return {
      loading: false,
      projectForm: {
        proNo: '',
        proName: '',
        cabinetNum: '',
        productionMan: '',
        costDay: '',
        targetDay: '',
        actualDay: '',
        completionRate: 0
      },
      rules: {
        proNo: [
          { required: true, message: '请填写项目编号', trigger: 'blur' }
        ],
        proName: [
          { required: true, message: '请填写项目名称', trigger: 'blur' }
        ],
        cabinetNum: validateNumber('柜体数量'),
        costDay: [
          { required: true, message: '请输入成本工时', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }
        ],
        targetDay: [
          { required: true, message: '请输入预算目标工时', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }
        ],
        actualDay: [
          { required: true, message: '请输入实际汇总工时', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const formData = Object.assign(this.projectForm, {
            costDay: workTimeD2H(this.projectForm.costDay),
            targetDay: workTimeD2H(this.projectForm.targetDay),
            actualDay: workTimeD2H(this.projectForm.actualDay),
            completionRate: this.projectForm.completionRate / 100
          })
          console.log(formData)
          addWorkingDays(formData).then(response => {
            console.log(response)
            this.$message.success(response.message)
            this.loading = false
            this.$router.push({ name: 'WorkingDays' })
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
