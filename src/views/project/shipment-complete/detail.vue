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
            <label>销售负责人：</label>
            <span class="item-info">{{ projectForm.saleMan }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label>项目责任人：</label>
            <span class="item-info">{{ projectForm.proMan }}</span>
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
      </div>
    </div>
    <div class="detail-container__item">
      <h4>相关日期</h4>
      <div class="item-content">
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label>计划发货日期：</label>
            <span class="item-info">{{ projectForm.deliverTime | formatYYMMDD }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label>实际发货日期：</label>
            <span class="item-info">{{ projectForm.deliverdDate | formatYYMMDD }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="detail-container__item">
      <h4>完成情况</h4>
      <div class="item-content">
        <el-row :gutter="24" class="detail-item">
          <el-col :xs="18" :sm="8" :md="8" :lg="6">
            <label>成套工时：</label>
            <span class="item-info">{{ projectForm.setWork | workTimeH2D }} 人/天</span>
          </el-col>
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
          <label>发货遗留问题：</label>
          <span class="item-info">{{ projectForm.materialFeedback }}</span>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { formatYYMMDD, workTimeH2D } from '@/utils/format'
import { fetchShipmentCompleteDetail } from '@/api/shipment-complete'
import ProStatusOption from '@/utils/project-status'

export default {
  components: {
    PageBack
  },
  filters: {
    formatYYMMDD,
    workTimeH2D
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
        setWork: '',
        cabinetNum: '',
        boxNum: '',
        standardCabinet: '',
        deliverTime: '',
        deliverdDate: '',
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
      fetchShipmentCompleteDetail(proNo).then(response => {
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
