<template>
  <div class="edit-container">
    <page-back />
    <el-form ref="projectForm" :model="projectForm" :rules="rules" label-width="100px" class="demo-projectForm">
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目L号" prop="proNo">
            <el-input v-model.trim="projectForm.proNo" />
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
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="成套班组" prop="setLeader">
            <el-input v-model="projectForm.setLeader" />
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
          <el-form-item label="成套工时" prop="setWork">
            <el-input v-model="projectForm.setWork">
              <template slot="append">人/天</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="计划发货日期" prop="deliverTime">
            <el-date-picker v-model="projectForm.deliverTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="实际发货日期" prop="deliverdDate">
            <el-date-picker v-model="projectForm.deliverdDate" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="项目问题汇总" prop="problem">
        <el-input v-model="projectForm.problem" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item label="缺料反馈" prop="materialFeedback">
        <el-input v-model="projectForm.materialFeedback" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
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
import { fetchShipmentCompleteDetail, editShipmentComplete } from '@/api/shipment-complete'
import { workTimeH2D, workTimeD2H } from '@/utils/format'

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
        proType: '',
        saleMan: '',
        proMan: '',
        setLeader: '',
        cabinetNum: '',
        boxNum: '',
        standardCabinet: '',
        setWork: '',
        deliverTime: '',
        deliverdDate: '',
        problem: '',
        materialFeedback: ''
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
        setWork: [
          { required: true, message: '请输入成套工时', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }
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
      fetchShipmentCompleteDetail(proNo).then(response => {
        console.log(response)
        this.projectForm = Object.assign(response.data, {
          setWork: workTimeH2D(response.data.setWork)
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const proNo = this.$route.params.id
          const formData = Object.assign(this.projectForm, {
            setWork: workTimeD2H(this.projectForm.setWork)
          })
          editShipmentComplete(proNo, formData).then(response => {
            console.log(response)
            this.$message.success(response.message)
            this.loading = false
            this.$router.push({ name: 'ShipmentComplete' })
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
  }
  .el-textarea {
    width: 60%;
  }
</style>
