<template>
  <div class="detail-container">
    <page-back />
    <el-form ref="userForm" :model="userForm" label-width="100px" class="demo-userForm">
      <el-row :gutter="24" class="detail-item">
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>员工编号：</label>
          <span class="item-info">{{ userForm.userNo }}</span>
        </el-col>
        <el-col :xs="18" :sm="8" :md="8" :lg="6">
          <label>员工名字：</label>
          <span class="item-info">{{ userForm.userName }}</span>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { fetchWorkingDaysDetail } from '@/api/working-days'

export default {
  components: {
    PageBack
  },
  data() {
    return {
      userForm: {
        userNo: '',
        userName: ''
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
        this.userForm = response.data
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
