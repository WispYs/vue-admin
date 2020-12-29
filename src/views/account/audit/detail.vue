<template>
  <div class="detail-container">
    <page-back />
    <div class="detail-container__item">
      <div class="item-content">
        <el-form ref="accountForm" :model="accountForm" label-width="100px" class="account-form">
          <el-row :gutter="24" class="detail-item">
            <el-col :xs="18" :sm="8" :md="8" :lg="6">
              <label>账号ID：</label>
              <span class="item-info">{{ accountForm.id }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="detail-item">
            <el-col :xs="18" :sm="8" :md="8" :lg="6">
              <label>账号昵称：</label>
              <span class="item-info">{{ accountForm.nickname }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="detail-item">
            <el-col :xs="18" :sm="8" :md="8" :lg="6">
              <label>手机号码：</label>
              <span class="item-info">{{ accountForm.mobile }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="detail-item">
            <el-col :xs="18" :sm="8" :md="8" :lg="6">
              <label>账号角色：</label>
              <span class="item-info">{{ accountForm.rolename | formatRole }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="detail-item">
            <el-col :xs="18" :sm="8" :md="8" :lg="6">
              <label>注册时间：</label>
              <span class="item-info">{{ accountForm.regdate }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="detail-item">
            <el-col :xs="18" :sm="8" :md="8" :lg="6">
              <label>修改时间：</label>
              <span class="item-info">{{ accountForm.updatedate }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="detail-item">
            <el-col :xs="18" :sm="8" :md="8" :lg="6">
              <label>最后登录时间：</label>
              <span class="item-info">{{ accountForm.lastdate }}</span>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="24" class="detail-item">
            <el-col :xs="18" :sm="8" :md="8" :lg="6">
              <label>在线时长：</label>
              <span class="item-info">{{ accountForm.online }}分钟</span>
            </el-col>
          </el-row> -->
          <el-row :gutter="24" class="detail-item">
            <el-col :xs="18" :sm="8" :md="8" :lg="6">
              <label>审核状态：</label>
              <span class="item-info">{{ accountForm.state | formatAuditStatus }}</span>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { fetchAccountDetail } from '@/api/account'
import { formatAuditStatus, formatRole } from '@/utils/format'

export default {
  components: {
    PageBack
  },
  filters: {
    formatAuditStatus,
    formatRole
  },
  data() {
    return {
      accountForm: {
        accountName: '',
        accountPassword: '',
        auditStatus: '',
        role: ''
      }
    }
  },
  mounted() {
    this.__getInfo()
  },
  methods: {
    __getInfo() {
      const accountNo = this.$route.params.id
      fetchAccountDetail(accountNo).then(response => {
        console.log(response)
        this.accountForm = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/detail.scss";

</style>
