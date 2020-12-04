<template>
  <div class="detail-container">
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目L号：</label>
        <span class="item-info">{{ projectForm.proNo }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目类型：</label>
        <span class="item-info">{{ projectForm.proType }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="12">
        <label>项目名称：</label>
        <span class="item-info">{{ projectForm.proName }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>销售负责人：</label>
        <span class="item-info">{{ projectForm.saleMan }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目工程师：</label>
        <span class="item-info">{{ projectForm.proEngineer }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套班组：</label>
        <span class="item-info">{{ projectForm.setLeader }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>柜体数量：</label>
        <span class="item-info">{{ projectForm.cabinetNum }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>箱体数量：</label>
        <span class="item-info">{{ projectForm.boxNum }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>折算标准柜：</label>
        <span class="item-info">{{ projectForm.standardCabinet }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套计划工时：</label>
        <span class="item-info">{{ projectForm.setPlan }}天</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套剩余工时：</label>
        <span class="item-info">{{ projectForm.setRemaining }}天</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>反馈提货：</label>
        <span class="item-info">{{ projectForm.feedbackPickup == '1' ? '是' : '否' }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套资料提交日期：</label>
        <span class="item-info">{{ projectForm.submissionDate }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>材料提货时间：</label>
        <span class="item-info">{{ projectForm.pickupTime }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="8">
        <label>材料要求到货日期：</label>
        <span class="item-info">{{ projectForm.arrivalTime }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套计划启动时间：</label>
        <span class="item-info">{{ projectForm.startTime }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套计划完成时间：</label>
        <span class="item-info">{{ projectForm.endTime }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="8">
        <label>原计划发货时间：</label>
        <span class="item-info">{{ projectForm.deliverTime }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <label>设计阶段：</label>
      <el-tag
        v-for="(item, index) in ProStatusOption.DesignStatus"
        :key="index"
        :type="projectForm[item.fields] ? 'success' : 'info'"
        class="status-tab"
        size="small"
      >{{ item.name }}</el-tag>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <label>生产阶段：</label>
      <el-tag
        v-for="(item, index) in ProStatusOption.ProduceStatus"
        :key="index"
        :type="projectForm[item.fields] ? 'success' : 'info'"
        class="status-tab"
        size="small"
      >{{ item.name }}</el-tag>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <label>项目问题汇总：</label>
      <span class="item-info">{{ projectForm.problem }}</span>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <label>缺料反馈：</label>
      <span class="item-info">{{ projectForm.materialFeedback }}</span>
    </el-row>
  </div>
</template>

<script>
import { formatYYMMDD, workTimeH2D } from '@/utils/format'
import { fetchImplplanProDetail } from '@/api/implplan'
import ProStatusOption from '@/utils/project-status'

export default {
  data() {
    return {
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
        feedbackPickup: '',
        submissionDate: '',
        pickupTime: '',
        arrivalTime: '',
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
      }
    }
  },
  mounted() {
    this.__getInfo()
  },
  methods: {
    __getInfo() {
      const proNo = this.$route.params.id
      fetchImplplanProDetail(proNo).then(response => {
        console.log(response)
        this.projectForm = Object.assign(response.data, {
          setPlan: workTimeH2D(response.data.setPlan),
          setRemaining: workTimeH2D(response.data.setRemaining),
          submissionDate: formatYYMMDD(response.data.submissionDate),
          pickupTime: formatYYMMDD(response.data.pickupTime),
          arrivalTime: formatYYMMDD(response.data.arrivalTime),
          startTime: formatYYMMDD(response.data.startTime),
          endTime: formatYYMMDD(response.data.endTime),
          deliverTime: formatYYMMDD(response.data.deliverTime),
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
    formatStr2Boolean(str) {
      return str === '1'
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-container {
    padding: 40px;
    .detail-item {
      margin-bottom: 22px;
      label {
        min-width: 100px;
        display: inline-block;
        text-align: right;
        vertical-align: middle;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      .item-info {
        display: inline-block;
        line-height: 40px;
        font-size: 14px;
        color: #606266;
      }
      .el-tag {
        margin-right: 10px;
      }
    }
  }
  .el-textarea {
    width: 60%;
  }
</style>
