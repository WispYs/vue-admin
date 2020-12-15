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
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="折算标准柜" prop="standardCabinet">
            <el-input v-model="projectForm.standardCabinet" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="成套计划工时" label-width="110px" prop="setPlan">
            <el-input v-model="projectForm.setPlan">
              <template slot="append">人/天</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="成套剩余工时" label-width="110px" prop="setRemaining">
            <el-input v-model="projectForm.setRemaining">
              <template slot="append">人/天</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="反馈提货" prop="feedbackPickup">
            <el-switch v-model="projectForm.feedbackPickup" :active-value="1" :inactive-value="0" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="成套资料提交日期" label-width="140px" prop="submissionDate">
            <el-date-picker v-model="projectForm.submissionDate" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="材料提货时间" label-width="140px" prop="pickupTime">
            <el-date-picker v-model="projectForm.pickupTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="材料要求到货日期" label-width="140px" prop="arrivalTime">
            <el-date-picker v-model="projectForm.arrivalTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="成套计划启动时间" label-width="140px" prop="startTime">
            <el-date-picker v-model="projectForm.startTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="成套计划完成时间" label-width="140px" prop="endTime">
            <el-date-picker v-model="projectForm.endTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="原计划发货时间" label-width="140px" prop="deliverTime">
            <el-date-picker v-model="projectForm.deliverTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="设计阶段：">
        <el-checkbox
          v-for="(item, index) in ProStatusOption.DesignStatus"
          :key="index"
          v-model="projectForm[item.fields]"
          :label="item.name"
          :name="item.fields"
          :true-label="1"
          :false-label="0"
        />
      </el-form-item>
      <el-form-item label="生产阶段：">
        <el-checkbox
          v-for="(item, index) in ProStatusOption.ProduceStatus"
          :key="index"
          v-model="projectForm[item.fields]"
          :label="item.name"
          :name="item.fields"
          :true-label="1"
          :false-label="0"
        />
      </el-form-item>
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
import { workTimeD2H, workTimeH2D } from '@/utils/format'
import PageBack from '@/components/PageBack'
import { fetchImplPlanProDetail, editImplPlanPro } from '@/api/implplan'
import ProStatusOption from '@/utils/project-status'

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
    // 比较计划工时和剩余工时
    const compareNumber = (rule, value, callback) => {
      const setPlan = this.projectForm.setPlan
      const setRemaining = this.projectForm.setRemaining
      if (setRemaining > setPlan) {
        this.projectForm.setRemaining = this.projectForm.setPlan
        // callback(new Error('剩余工时不能大于计划工时'))
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
      ProStatusOption,
      projectForm: {
        proNo: '',
        proName: '',
        proType: '',
        saleMan: '',
        proEngineer: '',
        setLeader: '',
        cabinetNum: '',
        boxNum: '',
        standardCabinet: '',
        setPlan: '',
        setRemaining: '',
        submissionDate: '',
        pickupTime: '',
        arrivalTime: '',
        feedbackPickup: '',
        startTime: '',
        endTime: '',
        deliverTime: '',
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
        deliverTime: [
          { required: true, message: '请选择原计划发货时间', trigger: 'blur' }
        ],
        cabinetNum: validateNumber('柜体数量'),
        boxNum: validateNumber('箱体数量'),
        standardCabinet: [
          { required: true, message: '请输入折算标准柜值', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' }
        ],
        setPlan: [
          { required: true, message: '请输入计划工时', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' },
          { validator: compareNumber, trigger: 'blur' }
        ],
        setRemaining: [
          { required: true, message: '请输入剩余工时', trigger: 'blur' },
          { validator: isNumber, trigger: 'blur' },
          { validator: compareNumber, trigger: 'blur' }
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
      fetchImplPlanProDetail(proNo).then(response => {
        console.log(response)
        this.projectForm = Object.assign(response.data, {
          setPlan: workTimeH2D(response.data.setPlan),
          setRemaining: workTimeH2D(response.data.setRemaining),
          feedbackPickup: Number(response.data.feedbackPickup),
          drawingDesign: Number(response.data.drawingDesign),
          cabinetOrder: Number(response.data.cabinetOrder),
          materialMain: Number(response.data.materialMain),
          informationSubmit: Number(response.data.informationSubmit),
          materialAuxiliary: Number(response.data.materialAuxiliary),
          pickingLayout: Number(response.data.pickingLayout),
          wiringSet: Number(response.data.wiringSet),
          powerTest: Number(response.data.powerTest),
          packDelever: Number(response.data.packDelever)
          // drawingDesign: this.formatStr2Boolean(response.data.drawingDesign),
          // ...
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const proNo = this.$route.params.id
          const formData = Object.assign(this.projectForm, {
            setPlan: workTimeD2H(this.projectForm.setPlan),
            setRemaining: workTimeD2H(this.projectForm.setRemaining)
            // drawingDesign: this.formatBoolean2Str(this.projectForm.drawingDesign),
            // ...
          })
          editImplPlanPro(proNo, formData).then(response => {
            console.log(response)
            this.$message.success(response.message)
            this.loading = false
            this.$router.push({ name: 'Implplan' })
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
    // formatStr2Boolean(str) {
    //   return str === '1'
    // },
    // formatBoolean2Str(str) {
    //   return str === true ? '1' : '0'
    // }
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
