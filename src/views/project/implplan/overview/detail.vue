<template>
  <div class="detail-container">
    <page-back />
    <div class="detail-container__item">
      <h4>基本信息</h4>
      <div class="item-content">
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>项目L号：</label>
            <span class="item-info">{{ projectForm.proNo }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>项目类型：</label>
            <span class="item-info">{{ projectForm.proType }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="12">
            <label>项目名称：</label>
            <span class="item-info">{{ projectForm.proName }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>销售负责人：</label>
            <span class="item-info">{{ projectForm.saleMan }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>项目工程师：</label>
            <span class="item-info">{{ projectForm.proMan }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>成套班组：</label>
            <span class="item-info">{{ projectForm.setLeader }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>项目生产负责人：</label>
            <span class="item-info">{{ projectForm.productionMan }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>柜体数量：</label>
            <span class="item-info">{{ projectForm.cabinetNum }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>箱体数量：</label>
            <span class="item-info">{{ projectForm.boxNum }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>折算标准柜：</label>
            <span class="item-info">{{ projectForm.standardCabinet }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="detail-container__item">
      <h4>相关日期</h4>
      <div class="item-content">
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="8" :lg="8">
            <label style="width: 140px">成套资料提交日期：</label>
            <span class="item-info">{{ projectForm.submissionDate | formatYYMMDD }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="8">
            <label style="width: 140px">材料提货日期：</label>
            <span class="item-info">{{ projectForm.pickupTime | formatYYMMDD }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="8">
            <label style="width: 140px">材料要求到货日期：</label>
            <span class="item-info">{{ projectForm.arrivalTime | formatYYMMDD }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="8" :lg="8">
            <label style="width: 140px">成套计划启动时间：</label>
            <span class="item-info">{{ projectForm.startTime | formatYYMMDD }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="8">
            <label style="width: 140px">成套计划完成时间：</label>
            <span class="item-info">{{ projectForm.endTime | formatYYMMDD }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="8" :lg="8">
            <label style="width: 140px">原计划发货日期：</label>
            <span class="item-info">{{ projectForm.deliverTime | formatYYMMDD }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="8">
            <label style="width: 140px">实际发货日期：</label>
            <span class="item-info">{{ projectForm.deliverdDate | formatYYMMDD }}</span>
          </el-col>
        </el-row>

      </div>

    </div>
    <div class="detail-container__item">
      <h4>完成情况</h4>
      <div class="item-content">
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>成本工时：</label>
            <span class="item-info">{{ projectForm.costDay | workTimeH2D }} 人/天</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>成套计划工时：</label>
            <span class="item-info">{{ projectForm.setPlan | workTimeH2D }} 人/天</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>成套剩余工时：</label>
            <span class="item-info">{{ projectForm.setRemaining | workTimeH2D }} 人/天</span>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>项目状态：</label>
            <span class="item-info">{{ projectForm.proStatus | formatProjectStatus }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>发货状态：</label>
            <span class="item-info">{{ projectForm.deliverStatus | formatDeliverStatus }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>项目风险等级：</label>
            <span class="item-info">{{ projectForm.proRisk | formatRisk }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>反馈提货：</label>
            <span class="item-info">{{ projectForm.feedbackPickup | formatFeedback }}</span>
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
      </div>
    </div>
    <div class="detail-container__item">
      <h4>其他信息</h4>
      <div class="item-content">
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
    </div>
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
    formatYYMMDD,
    workTimeH2D,
    formatProjectStatus,
    formatDeliverStatus,
    formatRisk,
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
        proMan: '',
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
        this.projectForm = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/detail.scss";

</style>
