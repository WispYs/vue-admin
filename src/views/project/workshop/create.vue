<template>
  <div class="create-container">
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
            <!-- <el-select v-model="projectForm.proType" placeholder="请选择项目类型">
              <el-option label="控制柜" value="1" />
              <el-option label="控制箱" value="2" />
              <el-option label="工程" value="3" />
            </el-select> -->
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
          <el-form-item label="项目工程师" prop="proEngineer">
            <el-input v-model="projectForm.proEngineer" />
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
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目风险预警" prop="proRisk" label-width="110px">
            <el-select v-model="projectForm.proRisk" placeholder="请选择风险等级">
              <el-option label="有风险" value="0" />
              <el-option label="已延误" value="1" />
              <el-option label="正常" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="反馈提货" prop="feedbackPickup">
            <el-switch v-model="projectForm.feedbackPickup" :active-value="1" :inactive-value="0" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="12" :md="8" :lg="8">
          <el-form-item label="成套资料提交日期" label-width="140px" prop="submissionDate">
            <el-date-picker v-model="projectForm.submissionDate" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="12" :md="8" :lg="8">
          <el-form-item label="材料要求到货日期" label-width="140px" prop="arrivalTime">
            <el-date-picker v-model="projectForm.arrivalTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="12" :md="8" :lg="8">
          <el-form-item label="成套计划启动时间" label-width="140px" prop="startTime">
            <el-date-picker v-model="projectForm.startTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="12" :md="8" :lg="8">
          <el-form-item label="成套计划完成时间" label-width="140px" prop="endTime">
            <el-date-picker v-model="projectForm.endTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8">
          <el-form-item label="计划发货日期" label-width="140px" prop="deliverTime">
            <el-date-picker v-model="projectForm.deliverTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item label="设计阶段：">
        <el-checkbox v-model="projectForm.drawingDesign" label="图纸设计" name="drawingDesign" :true-label="1" :false-label="0" />
        <el-checkbox v-model="projectForm.cabinetOrder" label="柜体订货" name="cabinetOrder" :true-label="1" :false-label="0" />
        <el-checkbox v-model="projectForm.materialMain" label="主材订货" name="materialMain" :true-label="1" :false-label="0" />
        <el-checkbox v-model="projectForm.informationSubmit" label="辅材订货" name="informationSubmit" :true-label="1" :false-label="0" />
        <el-checkbox v-model="projectForm.materialAuxiliary" label="资料提交" name="materialAuxiliary" :true-label="1" :false-label="0" />
      </el-form-item> -->
      <el-form-item label="生产阶段：">
        <el-checkbox v-model="projectForm.pickingLayout" label="领料排版" name="pickingLayout" :true-label="1" :false-label="0" />
        <el-checkbox v-model="projectForm.wiringSet" label="接线成套" name="wiringSet" :true-label="1" :false-label="0" />
        <el-checkbox v-model="projectForm.powerTest" label="上电测试" name="powerTest" :true-label="1" :false-label="0" />
        <el-checkbox v-model="projectForm.packDelever" label="打包待发" name="packDelever" :true-label="1" :false-label="0" />
      </el-form-item>
      <el-form-item label="项目问题汇总" prop="problem">
        <el-input v-model="projectForm.problem" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item label="缺料反馈" prop="materialFeedback">
        <el-input v-model="projectForm.materialFeedback" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="submitForm('projectForm')">新建项目</el-button>
        <el-button @click="resetForm('projectForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { addWorkshopPro } from '@/api/workshop'

export default {
  components: {
    PageBack
  },
  data() {
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
        proEngineer: '',
        setLeader: '',
        cabinetNum: '',
        boxNum: '',
        proRisk: '', // 0:有风险,1:已延误，2：正常
        feedbackPickup: 0,
        submissionDate: '',
        arrivalTime: '',
        startTime: '',
        endTime: '',
        deliverTime: '',
        pickingLayout: 0,
        wiringSet: 0,
        powerTest: 0,
        packDelever: 0,
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
        proRisk: [
          { required: true, message: '请选择风险等级', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const formData = this.projectForm
          console.log(formData)
          addWorkshopPro(formData).then(response => {
            console.log(response)
            this.$message.success(response.message)
            this.loading = false
            this.$router.push({ name: 'Workshop' })
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
  }
  .el-textarea {
    width: 60%;
  }
</style>
