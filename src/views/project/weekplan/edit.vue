<template>
  <div class="edit-container">
    <el-form ref="projectForm" :model="projectForm" :rules="rules" label-width="100px" class="demo-projectForm">
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目L号" prop="proNo">
            <el-input v-model="projectForm.proNo" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目类型" prop="proType">
            <el-input v-model="projectForm.proType" />
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
          <el-form-item label="销售负责人" prop="saleMan">
            <el-input v-model="projectForm.saleMan" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目责任人" prop="proMan">
            <el-input v-model="projectForm.proMan" />
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
          <el-form-item label="箱体数量" prop="boxNum">
            <el-input v-model.number="projectForm.boxNum" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="折算标准柜" prop="standardCabinet">
            <el-input v-model="projectForm.standardCabinet" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="成套工时" prop="setDay">
            <el-input v-model="projectForm.setDay">
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="成套剩余工时" label-width="110px" prop="setRemaining">
            <el-input v-model="projectForm.setRemaining">
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目风险预警" label-width="110px" prop="proRisk">
            <el-select v-model="projectForm.proRisk" placeholder="请选择风险等级">
              <el-option label="有风险" value="0" />
              <el-option label="已延误" value="1" />
              <el-option label="正常" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="12" :md="8" :lg="6">
          <el-form-item label="项目实际状态" prop="proStatus" label-width="110px">
            <el-select v-model="projectForm.proStatus" placeholder="请选择项目状态">
              <el-option label="未开始" value="0" />
              <el-option label="进行中" value="1" />
              <el-option label="已完成" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="12" :md="8" :lg="6">
          <el-form-item label="计划发货时间" prop="deliverTime">
            <el-date-picker v-model="projectForm.deliverTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="12" :md="8" :lg="6">
          <el-form-item label="实际发货时间" prop="deliverdDate">
            <el-date-picker v-model="projectForm.deliverdDate" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="项目问题汇总" prop="problem">
        <el-input v-model="projectForm.problem" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="submitForm('projectForm')">编辑</el-button>
        <el-button @click="resetForm('projectForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { workTimeH2D, workTimeD2H } from '@/utils/format'
import { fetchWeekplanProDetail, editWeekplanPro } from '@/api/weekplan'
export default {
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
        proType: '',
        saleMan: '',
        proMan: '',
        cabinetNum: '',
        boxNum: '',
        standardCabinet: '',
        setDay: '',
        setRemaining: '',
        proRisk: '', // 0:有风险,1:已延误，2：正常
        deliverTime: '',
        deliverdDate: '',
        proStatus: '',
        problem: ''
      },
      rules: {
        proNo: [
          { required: true, message: '请填写项目编号', trigger: 'blur' }
        ],
        proType: [
          { required: true, message: '请填写项目类型', trigger: 'blur' }
        ],
        proName: [
          { required: true, message: '请填写项目名称', trigger: 'blur' }
        ],
        cabinetNum: validateNumber('柜体数量'),
        boxNum: validateNumber('箱体数量'),
        standardCabinet: [
          { required: true, message: '请输入折算标准柜值', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }
        ],
        setDay: [
          { required: true, message: '请输入计划工时', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }
        ],
        setRemaining: [
          { required: true, message: '请输入剩余工时', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }
        ],
        proRisk: [
          { required: true, message: '请选择风险等级', trigger: 'blur' }
        ],
        proStatus: [
          { required: true, message: '请选择项目状态', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.__getInfo()
  },
  methods: {
    __getInfo() {
      const proNo = this.$route.params.id
      fetchWeekplanProDetail(proNo).then(response => {
        console.log(response)
        this.projectForm = Object.assign(response.data, {
          setDay: workTimeH2D(response.data.setDay),
          setRemaining: workTimeH2D(response.data.setRemaining)
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const proNo = this.$route.params.id
          const formData = Object.assign(this.projectForm, {
            setDay: workTimeD2H(this.projectForm.setDay),
            setRemaining: workTimeD2H(this.projectForm.setRemaining)
          })
          editWeekplanPro(proNo, formData).then(response => {
            console.log(response)
            this.$message.success(response.message)
            this.loading = false
            this.$router.push({ name: 'Weekplan' })
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
    padding: 20px;
  }
  .el-textarea {
    width: 60%;
  }
</style>
