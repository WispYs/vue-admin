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
        <label>项目责任人：</label>
        <span class="item-info">{{ projectForm.proMan }}</span>
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
        <label>成套工时：</label>
        <span class="item-info">{{ projectForm.setDay }}天</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套剩余工时：</label>
        <span class="item-info">{{ projectForm.setRemaining }}天</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目风险预警：</label>
        <span class="item-info">{{ projectForm.proRisk }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目实际状态：</label>
        <span class="item-info">{{ projectForm.proStatus }}</span>
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
      <label>项目问题汇总：</label>
      <span class="item-info">{{ projectForm.problem }}</span>
    </el-row>
  </div>
</template>

<script>
import { formatYYMMDD, formatRisk, formatProjectStatus, workTimeH2D } from '@/utils/format'
import { fetchWeekplanProDetail } from '@/api/weekplan'

export default {
  data() {
    return {
      projectForm: {
        proNo: '',
        proName: '',
        proType: '',
        saleMan: '',
        proMan: '',
        cabinetNum: '',
        boxNum: '',
        standardCabinet: '',
        setDay: '',
        setRemaining: '',
        proRisk: '', // 0:有风险,1:已延误，2：正常
        deliverTime: '',
        deliverdDate: '',
        proStatus: '',
        problem: ''
      }
    }
  },
  mounted() {
    this.__getInfo()
  },
  methods: {
    __getInfo() {
      const proNo = this.$route.params.id
      fetchWeekplanProDetail(proNo).then(response => {
        console.log(response)
        this.projectForm = Object.assign(response.data, {
          setDay: workTimeH2D(response.data.setDay),
          setRemaining: workTimeH2D(response.data.setRemaining),
          proRisk: formatRisk(response.data.proRisk),
          proStatus: formatProjectStatus(response.data.proStatus),
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
