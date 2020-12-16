<template>
  <div class="edit-container">
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
          <el-form-item label="项目销售人" prop="saleMan">
            <el-input v-model="projectForm.saleMan" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目负责人" prop="proMan">
            <el-input v-model="projectForm.proMan" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目干系人" prop="setLeader">
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
          <el-form-item label="成套工时汇总" label-width="110px" prop="setWork">
            <el-input v-model="projectForm.setWork">
              <template slot="append">人/天</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="12" :md="8" :lg="6">
          <el-form-item label="成套计划完成时间" label-width="140px" prop="planFinish">
            <el-date-picker v-model="projectForm.planFinish" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="12" :md="8" :lg="6">
          <el-form-item label="计划发货日期" label-width="140px" prop="deliverTime">
            <el-date-picker v-model="projectForm.deliverTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="12" :md="8" :lg="6">
          <el-form-item label="实际发货日期" label-width="140px" prop="deliverdDate">
            <el-date-picker v-model="projectForm.deliverdDate" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="设计阶段：">
        <el-checkbox v-model="projectForm.drawingDesign" label="图纸设计" name="drawingDesign" />
        <el-checkbox v-model="projectForm.cabinetOrder" label="柜体订货" name="cabinetOrder" />
        <el-checkbox v-model="projectForm.materialMain" label="主材订货" name="materialMain" />
        <el-checkbox v-model="projectForm.informationSubmit" label="辅材订货" name="informationSubmit" />
        <el-checkbox v-model="projectForm.materialAuxiliary" label="资料提交" name="materialAuxiliary" />
      </el-form-item>
      <el-form-item label="生产阶段：">
        <el-checkbox v-model="projectForm.pickingLayout" label="领料排版" name="pickingLayout" />
        <el-checkbox v-model="projectForm.wiringSet" label="接线成套" name="wiringSet" />
        <el-checkbox v-model="projectForm.powerTest" label="上电测试" name="powerTest" />
        <el-checkbox v-model="projectForm.packDelever" label="打包待发" name="packDelever" />
      </el-form-item>
      <el-form-item label="项目问题汇总" prop="problem">
        <el-input v-model="projectForm.problem" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="projectForm.remark" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="submitForm('projectForm')">编辑</el-button>
        <el-button @click="resetForm('projectForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { workTimeD2H, workTimeH2D } from '@/utils/format'
import { fetchCompleteProDetail, editCompletePro } from '@/api/complete'
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
        setLeader: '',
        cabinetNum: '',
        boxNum: '',
        standardCabinet: '',
        setWork: '',
        planFinish: '',
        deliverTime: '',
        deliverdDate: '',
        drawingDesign: 0,
        cabinetOrder: 0,
        materialMain: 0,
        informationSubmit: 0,
        materialAuxiliary: 0,
        pickingLayout: 0,
        wiringSet: 0,
        powerTest: 0,
        packDelever: 0,
        problem: '',
        remark: ''
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
      fetchCompleteProDetail(proNo).then(response => {
        console.log(response)
        this.projectForm = Object.assign(response.data, {
          setWork: workTimeH2D(response.data.setWork),
          drawingDesign: this.formatStr2Boolean(response.data.drawingDesign),
          cabinetOrder: this.formatStr2Boolean(response.data.cabinetOrder),
          materialMain: this.formatStr2Boolean(response.data.materialMain),
          informationSubmit: this.formatStr2Boolean(response.data.informationSubmit),
          materialAuxiliary: this.formatStr2Boolean(response.data.materialAuxiliary),
          pickingLayout: this.formatStr2Boolean(response.data.pickingLayout),
          wiringSet: this.formatStr2Boolean(response.data.wiringSet),
          powerTest: this.formatStr2Boolean(response.data.powerTest),
          packDelever: this.formatStr2Boolean(response.data.packDelever)
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const proNo = this.$route.params.id
          const formData = Object.assign(this.projectForm, {
            setWork: workTimeD2H(this.projectForm.setWork),
            drawingDesign: this.formatBoolean2Str(this.projectForm.drawingDesign),
            cabinetOrder: this.formatBoolean2Str(this.projectForm.cabinetOrder),
            materialMain: this.formatBoolean2Str(this.projectForm.materialMain),
            informationSubmit: this.formatBoolean2Str(this.projectForm.informationSubmit),
            materialAuxiliary: this.formatBoolean2Str(this.projectForm.materialAuxiliary),
            pickingLayout: this.formatBoolean2Str(this.projectForm.pickingLayout),
            wiringSet: this.formatBoolean2Str(this.projectForm.wiringSet),
            powerTest: this.formatBoolean2Str(this.projectForm.powerTest),
            packDelever: this.formatBoolean2Str(this.projectForm.packDelever)
          })
          editCompletePro(proNo, formData).then(response => {
            console.log(response)
            this.$message.success(response.message)
            this.loading = false
            this.$router.push({ name: 'Complete' })
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
    },
    formatStr2Boolean(str) {
      return str === '1'
    },
    formatBoolean2Str(str) {
      return str === true ? '1' : '0'
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
