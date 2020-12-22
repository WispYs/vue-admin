<template>
  <div class="detail-container">
    <page-back />
    <el-form ref="projectForm" :model="projectForm" label-width="100px" class="project-form">
      <el-row :gutter="24" class="detail-item">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>项目L号：</label>
          <span class="item-info">{{ projectForm.proNo }}</span>
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
          <label>项目生产负责人：</label>
          <span class="item-info">{{ projectForm.productionMan }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="detail-item">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>成本工时：</label>
          <span class="item-info">{{ projectForm.costDay }} 人/天</span>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>预算目标工时：</label>
          <span class="item-info">{{ projectForm.targetDay }} 人/天</span>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>实际汇总工时：</label>
          <span class="item-info">{{ projectForm.actualDay }} 人/天</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="20" :sm="18" :md="18" :lg="12">
          <el-form-item label="工时完成率：" prop="completionRate">
            <el-slider v-model="projectForm.completionRate" class="progress-slider" disabled />
            <span class="progress-item">{{ projectForm.completionRate }}%</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { formatProgress, workTimeH2D } from '@/utils/format'
import { fetchWorkingDaysDetail } from '@/api/last-week-works'

export default {
  components: {
    PageBack
  },
  data() {
    return {
      projectForm: {
        proNo: '',
        proName: '',
        cabinetNum: '',
        productionMan: '',
        costDay: '',
        targetDay: '',
        actualDay: '',
        completionRate: 0
      }
    }
  },
  mounted() {
    this.__getInfo()
  },
  methods: {
    __getInfo() {
      const proNo = this.$route.params.id
      fetchWorkingDaysDetail(proNo).then(response => {
        console.log(response)
        this.projectForm = Object.assign(response.data, {
          costDay: workTimeH2D(response.data.costDay),
          targetDay: workTimeH2D(response.data.targetDay),
          actualDay: workTimeH2D(response.data.actualDay),
          completionRate: formatProgress(response.data.completionRate)
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
      &.text-item {
        label {
          float: left;
        }
        .item-info {
          width: calc(100% - 125px);
        }
      }
    }
    .progress-slider {
      display: inline-block;
      width: calc(100% - 60px);
      margin:0 10px;
    }
    .progress-item {
      line-height: 38px;
      float: right;
    }
  }
  .el-textarea {
    width: 60%;
  }
</style>
