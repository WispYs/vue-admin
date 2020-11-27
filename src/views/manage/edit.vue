<template>
  <div class="edit-container">
    <el-form ref="projectForm" :model="projectForm" :rules="rules" label-width="100px" class="demo-projectForm">
      <el-row :gutter="24">
        <el-col :xs="22" :sm="12" :md="8" :lg="8">
          <el-form-item label="项目L号" prop="id">
            <el-input v-model="projectForm.id" />
          </el-form-item>
        </el-col>
        <el-col :xs="20" :sm="10" :md="6" :lg="6">
          <el-form-item label="项目类型" prop="type">
            <el-select v-model="projectForm.type" placeholder="请选择项目类型">
              <el-option label="控制柜" value="1" />
              <el-option label="控制箱" value="2" />
              <el-option label="工程" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="18" :md="10" :lg="10">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="projectForm.name" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目销售人" prop="salesman">
            <el-input v-model="projectForm.salesman" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目工程师" prop="engineer">
            <el-input v-model="projectForm.engineer" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="成套班组" prop="team">
            <el-input v-model="projectForm.team" />
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
          <el-form-item label="折算标准柜" prop="cabinetAverage">
            <el-input v-model="projectForm.cabinetAverage" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="成套计划时间" prop="hours">
            <el-input v-model="projectForm.hours">
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="成套剩余时间" prop="surplusHours">
            <el-input v-model="projectForm.surplusHours">
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="成套资料提交时间" label-width="140px" prop="dataSubmitTime">
            <el-date-picker v-model="projectForm.dataSubmitTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="材料提货时间" label-width="140px" prop="dataPickupTime">
            <el-date-picker v-model="projectForm.dataPickupTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="材料要求到货时间" label-width="140px" prop="dataPlanTime">
            <el-date-picker v-model="projectForm.dataPlanTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="成套计划启动时间" label-width="140px" prop="planStartTime">
            <el-date-picker v-model="projectForm.planStartTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="成套计划完成时间" label-width="140px" prop="planFinishTime">
            <el-date-picker v-model="projectForm.planFinishTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="原计划发货时间" label-width="140px" prop="PlanDeliveryTime">
            <el-date-picker v-model="projectForm.PlanDeliveryTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="反馈提货" prop="delivery">
        <el-switch v-model="projectForm.pickFeedback" />
      </el-form-item>
      <el-form-item label="设计阶段：" prop="dStatusArr">
        <el-checkbox-group v-model="projectForm.dStatusArr">
          <el-checkbox label="柜体订货" name="dStatusArr" />
          <el-checkbox label="主材订货" name="dStatusArr" />
          <el-checkbox label="辅材订货" name="dStatusArr" />
          <el-checkbox label="资料提交" name="dStatusArr" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="生产阶段：" prop="pStatusArr">
        <el-checkbox-group v-model="projectForm.pStatusArr">
          <el-checkbox label="领料排版" name="pStatusArr" />
          <el-checkbox label="接线成套" name="pStatusArr" />
          <el-checkbox label="上电测试" name="pStatusArr" />
          <el-checkbox label="打包待发" name="pStatusArr" />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="项目问题汇总" prop="issue">
        <el-input v-model="projectForm.issue" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item label="缺料反馈" prop="lackFeedback">
        <el-input v-model="projectForm.lackFeedback" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('projectForm')">创建项目</el-button>
        <el-button @click="resetForm('projectForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    const validateNumber = (name) => {
      return [
        { required: true, message: `${name}不能为空，若没有请填写数字 0` },
        { type: 'number', message: `${name}必须为数字值` }
      ]
    }
    return {
      projectForm: {
        id: '',
        name: '',
        type: '',
        salesman: '',
        engineer: '',
        team: '',
        cabinetNum: '',
        boxNum: '',
        cabinetAverage: '',
        hours: '',
        surplusHours: '',
        dataSubmitTime: '',
        dataPickupTime: '',
        dataPlanTime: '',
        planStartTime: '',
        planFinishTime: '',
        PlanDeliveryTime: '',
        pickFeedback: '',
        issue: '',
        lackFeedback: '',
        dStatusArr: [],
        pStatusArr: []
      },
      rules: {
        id: [
          { required: true, message: '请填写项目编号', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择项目类型', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请填写项目名称', trigger: 'blur' }
        ],
        cabinetNum: validateNumber('柜体数量'),
        boxNum: validateNumber('箱体数量')
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.projectForm)
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
  .edit-container {
    padding: 20px;
  }
  .el-textarea {
    width: 60%;
  }
</style>
