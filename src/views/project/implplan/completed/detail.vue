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
            <label>项目销售人：</label>
            <span class="item-info">{{ projectForm.saleMan }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>项目负责人：</label>
            <span class="item-info">{{ projectForm.proMan }}</span>
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
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>成套启动时间：</label>
            <span class="item-info">{{ projectForm.startTime | formatYYMMDD }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>成套完成时间：</label>
            <span class="item-info">{{ projectForm.endTime | formatYYMMDD }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>计划发货日期：</label>
            <span class="item-info">{{ projectForm.deliverTime | formatYYMMDD }}</span>
          </el-col>
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
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
          <el-col :xs="18" :sm="8" :md="6" :lg="6">
            <label>成套工时汇总：</label>
            <span class="item-info">{{ projectForm.setWork | workTimeH2D }} 人/天</span>
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
          <label>备注：</label>
          <span class="item-info">{{ projectForm.remark }}</span>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { formatYYMMDD, workTimeH2D, formatStageStatus } from '@/utils/format'
import { fetchCompletedProDetail } from '@/api/completed'
import ProStatusOption from '@/utils/project-status'

export default {
  components: {
    PageBack
  },
  filters: {
    formatYYMMDD,
    workTimeH2D,
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
        cabinetNum: '',
        boxNum: '',
        standardCabinet: '',
        setWork: '',
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
      fetchCompletedProDetail(proNo).then(response => {
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
