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
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目名称：</label>
        <span class="item-info">{{ projectForm.proName }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目销售人：</label>
        <span class="item-info">{{ projectForm.saleMan }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目负责人：</label>
        <span class="item-info">{{ projectForm.proMan }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目干系人：</label>
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
        <label>成套工时汇总：</label>
        <span class="item-info">{{ projectForm.setWork }}人/天</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套计划完成时间：</label>
        <span class="item-info">{{ projectForm.planFinish }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>计划发货时间：</label>
        <span class="item-info">{{ projectForm.deliverTime }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>实际发货时间：</label>
        <span class="item-info">{{ projectForm.deliverdDate }}</span>
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
      <label>备注：</label>
      <span class="item-info">{{ projectForm.remark }}</span>
    </el-row>
  </div>
</template>

<script>
import { formatYYMMDD, workTimeH2D } from '@/utils/format'
import { fetchCompleteProDetail } from '@/api/complete'
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
        proMan: '',
        setLeader: '',
        cabinetNum: '',
        boxNum: '',
        standardCabinet: '',
        setWork: '',
        planFinish: '',
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
      fetchCompleteProDetail(proNo).then(response => {
        console.log(response)
        this.projectForm = Object.assign(response.data, {
          setWork: workTimeH2D(response.data.setWork),
          planFinish: formatYYMMDD(response.data.planFinish),
          deliverTime: formatYYMMDD(response.data.deliverTime),
          deliverdDate: formatYYMMDD(response.data.deliverdDate),
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
