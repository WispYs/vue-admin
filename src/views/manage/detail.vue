<template>
  <div class="detail-container">
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目名称：</label>
        <span class="item-info">{{ projectForm.id }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目类型：</label>
        <span class="item-info">{{ projectForm.type }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目名称：</label>
        <span class="item-info">{{ projectForm.name }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目销售人：</label>
        <span class="item-info">{{ projectForm.salesman }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>项目工程师：</label>
        <span class="item-info">{{ projectForm.engineer }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套班组：</label>
        <span class="item-info">{{ projectForm.team }}</span>
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
        <span class="item-info">{{ projectForm.cabinetAverage }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套计划工时：</label>
        <span class="item-info">{{ projectForm.hours }}天</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套剩余工时：</label>
        <span class="item-info">{{ projectForm.surplusHours }}天</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套资料提交时间：</label>
        <span class="item-info">{{ projectForm.dataSubmitTime }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>材料提货时间：</label>
        <span class="item-info">{{ projectForm.dataPickupTime }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>材料要求到货时间：</label>
        <span class="item-info">{{ projectForm.dataPlanTime }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套计划启动时间：</label>
        <span class="item-info">{{ projectForm.planStartTime }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>成套计划完成时间：</label>
        <span class="item-info">{{ projectForm.planFinishTime }}</span>
      </el-col>
      <el-col :xs="18" :sm="8" :md="8" :lg="6">
        <label>原计划发货时间：</label>
        <span class="item-info">{{ projectForm.PlanDeliveryTime }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <label>反馈提货：</label>
      <span class="item-info">{{ projectForm.pickFeedback ? '是' : '否' }}</span>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <label>设计阶段：</label>
      <el-tag v-for="(item, index) in dStatusOption" :key="index" size="medium" :type="projectForm.dStatusArr.indexOf(item) > -1 ? 'success' : 'info'">{{ item }}</el-tag>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <label>生产阶段：</label>
      <el-tag v-for="(item, index) in pStatusOption" :key="index" size="medium" :type="projectForm.pStatusArr.indexOf(item) > -1 ? 'success' : 'info'">{{ item }}</el-tag>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <label>项目问题汇总：</label>
      <span class="item-info">{{ projectForm.issue }}</span>
    </el-row>
    <el-row :gutter="24" class="detail-item">
      <label>缺料反馈：</label>
      <span class="item-info">{{ projectForm.lackFeedback }}</span>
    </el-row>
  </div>
</template>

<script>
import { fetchInfo } from '@/api/project'
export default {
  data() {
    return {
      dStatusOption: ['柜体订货', '主材订货', '辅材订货', '资料提交'],
      pStatusOption: ['领料排版', '接线成套', '上电测试', '打包待发'],
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
      }
    }
  },
  mounted() {
    this.__getInfo()
  },
  methods: {
    __getInfo() {
      const projectId = this.$route.params.id
      this.listLoading = true
      fetchInfo(projectId).then(response => {
        console.log(response)
        this.projectForm = response.data
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
