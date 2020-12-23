<template>
  <div class="detail-container">
    <page-back />
    <div class="detail-container__item">
      <h4>基本信息</h4>
      <div class="item-content">
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
            <label>柜体数量：</label>
            <span class="item-info">{{ projectForm.cabinetNum }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label>箱体数量：</label>
            <span class="item-info">{{ projectForm.boxNum }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label>销售负责人：</label>
            <span class="item-info">{{ projectForm.saleMan }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label>项目工程师：</label>
            <span class="item-info">{{ projectForm.proMan }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label>成套班组：</label>
            <span class="item-info">{{ projectForm.setLeader }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="detail-container__item">
      <h4>相关日期</h4>
      <div class="item-content">
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label style="width: 140px">成套资料提交日期：</label>
            <span class="item-info">{{ projectForm.submissionDate | formatYYMMDD }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label style="width: 140px">材料要求到货日期：</label>
            <span class="item-info">{{ projectForm.arrivalTime | formatYYMMDD }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label style="width: 140px">成套计划启动时间：</label>
            <span class="item-info">{{ projectForm.startTime | formatYYMMDD }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label style="width: 140px">成套计划完成时间：</label>
            <span class="item-info">{{ projectForm.endTime | formatYYMMDD }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label style="width: 140px">计划发货日期：</label>
            <span class="item-info">{{ projectForm.deliverTime | formatYYMMDD }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="detail-container__item">
      <h4>完成情况</h4>
      <div class="item-content">
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label>成套计划工时：</label>
            <span class="item-info">{{ projectForm.setPlan | workTimeH2D }} 人/天</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label>成套实际工时：</label>
            <span class="item-info">{{ projectForm.setWork | workTimeH2D }} 人/天</span>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label>项目状态：</label>
            <span class="item-info">{{ projectForm.proStatus | formatProjectStatus }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label>项目风险预警：</label>
            <span class="item-info">{{ projectForm.proRisk | formatRisk }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label>反馈提货：</label>
            <span class="item-info">{{ projectForm.feedbackPickup | formatFeedback }}</span>
          </el-col>
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
      </div>
    </div>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { formatYYMMDD, formatRisk, workTimeH2D, formatFeedback, formatStageStatus, formatProjectStatus } from '@/utils/format'
import { fetchWorkingProDetail } from '@/api/working'
import ProStatusOption from '@/utils/project-status'

export default {
  components: {
    PageBack
  },
  filters: {
    formatYYMMDD,
    workTimeH2D,
    formatProjectStatus,
    formatRisk,
    formatFeedback,
    formatStageStatus
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
        cabinetNum: '',
        boxNum: '',
        setPlan: '',
        setWork: '',
        proStatus: '',
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
      }
    }
  },
  mounted() {
    this.__getInfo()
  },
  methods: {
    __getInfo() {
      const proNo = this.$route.params.id
      fetchWorkingProDetail(proNo).then(response => {
        console.log(response)
        this.projectForm = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/detail.scss";

</style>
