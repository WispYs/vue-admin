<template>
  <div class="detail-container">
    <page-back />
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
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目生产负责人：</label>
        <span class="item-info">{{ projectForm.productionMan }}</span>
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
        <label>成本工时：</label>
        <span class="item-info">{{ projectForm.costDay }}人/天</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套计划工时：</label>
        <span class="item-info">{{ projectForm.setPlan }}人/天</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套剩余工时：</label>
        <span class="item-info">{{ projectForm.setRemaining }}人/天</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目状态：</label>
        <span class="item-info">{{ projectForm.proStatus }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>发货状态：</label>
        <span class="item-info">{{ projectForm.deliverStatus }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目风险等级：</label>
        <span class="item-info">{{ projectForm.proRisk }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>反馈提货：</label>
        <span class="item-info">{{ projectForm.feedbackPickup | formatFeedback }}</span>
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
        :type="projectForm[item.fields] | formatStageStatus"
        class="status-tab"
        size="small"
      >{{ item.name }}</el-tag>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <label>生产阶段：</label>
      <el-tag
        v-for="(item, index) in ProStatusOption.ProduceStatus"
        :key="index"
        :type="projectForm[item.fields] | formatStageStatus"
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
    <el-row :gutter="24" class="detail-item">
      <label>备注：</label>
      <span class="item-info">{{ projectForm.remark }}</span>
    </el-row>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { formatYYMMDD, workTimeH2D, formatProjectStatus, formatDeliverStatus, formatRisk, formatStageStatus, formatFeedback } from '@/utils/format'
import { fetchImplPlanProDetail } from '@/api/implplan'
import ProStatusOption from '@/utils/project-status'

export default {
  components: {
    PageBack
  },
  filters: {
    formatStageStatus,
    formatFeedback
  },
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
        productionMan: '',
        cabinetNum: '',
        boxNum: '',
        standardCabinet: '',
        costDay: '',
        setPlan: '',
        setRemaining: '',
        proStatus: '',
        deliverStatus: '',
        proRisk: '',
        feedbackPickup: '',
        submissionDate: '',
        pickupTime: '',
        arrivalTime: '',
        startTime: '',
        endTime: '',
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
        materialFeedback: '',
        remark: ''
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
        this.projectForm = Object.assign(response.data, {
          costDay: workTimeH2D(response.data.costDay),
          setPlan: workTimeH2D(response.data.setPlan),
          setRemaining: workTimeH2D(response.data.setRemaining),
          proStatus: formatProjectStatus(response.data.proStatus),
          deliverStatus: formatDeliverStatus(response.data.deliverStatus),
          proRisk: formatRisk(response.data.proRisk),
          submissionDate: formatYYMMDD(response.data.submissionDate),
          pickupTime: formatYYMMDD(response.data.pickupTime),
          arrivalTime: formatYYMMDD(response.data.arrivalTime),
          startTime: formatYYMMDD(response.data.startTime),
          endTime: formatYYMMDD(response.data.endTime),
          deliverTime: formatYYMMDD(response.data.deliverTime),
          deliverdDate: formatYYMMDD(response.data.deliverdDate)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-container {
    padding: 40px;
    position: relative;
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
