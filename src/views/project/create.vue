<template>
  <div class="create-container">
    <el-form ref="projectForm" :model="projectForm" :rules="rules" label-width="100px" class="demo-projectForm">
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目L号" prop="pro_no">
            <el-input v-model="projectForm.pro_no" />
          </el-form-item>
        </el-col>
        <el-col :xs="20" :sm="10" :md="6" :lg="6">
          <el-form-item label="项目类型" prop="pro_type">
            <el-select v-model="projectForm.pro_type" placeholder="请选择项目类型">
              <el-option label="控制柜" value="1" />
              <el-option label="控制箱" value="2" />
              <el-option label="工程" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="18" :md="10" :lg="10">
          <el-form-item label="项目名称" prop="pro_name">
            <el-input v-model="projectForm.pro_name" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目销售人" prop="sale_man">
            <el-input v-model="projectForm.sale_man" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="项目工程师" prop="pro_engineer">
            <el-input v-model="projectForm.pro_engineer" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="成套班组" prop="set_leader">
            <el-input v-model="projectForm.set_leader" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="柜体数量" prop="cabinet_num">
            <el-input v-model.number="projectForm.cabinet_num" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="箱体数量" prop="box_num">
            <el-input v-model.number="projectForm.box_num" />
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="折算标准柜" prop="standard_cabinet">
            <el-input v-model.number="projectForm.standard_cabinet" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="成套计划工时" label-width="110px" prop="set_plan">
            <el-input v-model.number="projectForm.set_plan">
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <el-form-item label="成套剩余工时" label-width="110px" prop="set_remaining">
            <el-input v-model.number="projectForm.set_remaining">
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="成套资料提交时间" label-width="140px" prop="submission_date">
            <el-date-picker v-model="projectForm.submission_date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="材料提货时间" label-width="140px" prop="pickup_time">
            <el-date-picker v-model="projectForm.pickup_time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="材料要求到货时间" label-width="140px" prop="arrival_time">
            <el-date-picker v-model="projectForm.arrival_time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="成套计划启动时间" label-width="140px" prop="start_time">
            <el-date-picker v-model="projectForm.start_time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="成套计划完成时间" label-width="140px" prop="end_time">
            <el-date-picker v-model="projectForm.end_time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="计划发货时间" label-width="140px" prop="deliver_time">
            <el-date-picker v-model="projectForm.deliver_time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="实际发货时间" label-width="140px" prop="deliverd_date">
            <el-date-picker v-model="projectForm.deliverd_date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="反馈提货" prop="feedback_pickup">
            <el-switch v-model="projectForm.feedback_pickup" :active-value="1" :inactive-value="0" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8">
          <el-form-item label="项目风险预警" label-width="140px">
            <el-select v-model="projectForm.risk_grade" placeholder="请选择风险等级">
              <el-option label="无" value="0" />
              <el-option label="正常" value="1" />
              <el-option label="已延误" value="2" />
              <el-option label="有风险" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="设计阶段：">
        <el-checkbox v-model="projectForm.drawing_design" label="图纸设计" name="drawing_design" />
        <el-checkbox v-model="projectForm.cabinet_order" label="柜体订货" name="cabinet_order" />
        <el-checkbox v-model="projectForm.material_main" label="主材订货" name="material_main" />
        <el-checkbox v-model="projectForm.information_submit" label="辅材订货" name="information_submit" />
        <el-checkbox v-model="projectForm.material_auxiliary" label="资料提交" name="material_auxiliary" />
      </el-form-item>
      <el-form-item label="生产阶段：">
        <el-checkbox v-model="projectForm.picking_layout" label="领料排版" name="picking_layout" />
        <el-checkbox v-model="projectForm.wiring_set" label="接线成套" name="wiring_set" />
        <el-checkbox v-model="projectForm.power_test" label="上电测试" name="power_test" />
        <el-checkbox v-model="projectForm.pack_delever" label="打包待发" name="pack_delever" />
      </el-form-item>
      <el-form-item label="项目问题汇总" prop="issue">
        <el-input v-model="projectForm.issue" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item label="缺料反馈" prop="lackFeedback">
        <el-input v-model="projectForm.lackFeedback" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="projectForm.remark" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('projectForm')">创建项目</el-button>
        <el-button @click="resetForm('projectForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { workTimeD2H } from '@/utils/format'
export default {
  data() {
    const validateNumber = (name) => {
      return [
        { required: true, message: `${name}不能为空，若没有请填0` },
        { type: 'number', message: `${name}必须为数字值` }
      ]
    }
    return {
      projectForm: {
        pro_no: '',
        pro_name: '',
        pro_type: '',
        sale_man: '',
        pro_engineer: '',
        set_leader: '',
        cabinet_num: '',
        box_num: '',
        standard_cabinet: '',
        set_plan: '',
        set_remaining: '',
        submission_date: '',
        pickup_time: '',
        arrival_time: '',
        start_time: '',
        end_time: '',
        deliver_time: '',
        deliverd_date: '',
        feedback_pickup: 0,
        issue: '',
        lackFeedback: '',
        drawing_design: false,
        cabinet_order: false,
        material_main: false,
        information_submit: false,
        material_auxiliary: false,
        picking_layout: false,
        wiring_set: false,
        power_test: false,
        pack_delever: false
      },
      rules: {
        pro_no: [
          { required: true, message: '请填写项目编号', trigger: 'blur' }
        ],
        pro_type: [
          { required: true, message: '请选择项目类型', trigger: 'change' }
        ],
        pro_name: [
          { required: true, message: '请填写项目名称', trigger: 'blur' }
        ],
        cabinet_num: validateNumber('柜体数量'),
        box_num: validateNumber('箱体数量'),
        standard_cabinet: validateNumber('折算标准柜'),
        set_plan: validateNumber('工时'),
        set_remaining: validateNumber('工时')
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.projectForm)
          console.log(workTimeD2H(this.projectForm.set_plan))
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
    padding: 20px;
  }
  .el-textarea {
    width: 60%;
  }
</style>
