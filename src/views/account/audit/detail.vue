<template>
  <div class="detail-container">
    <page-back />
    <div class="detail-container__item">
      <div class="item-content">
        <el-form ref="accountForm" :model="accountForm" label-width="100px" class="account-form">
          <el-row :gutter="24" class="detail-item">
            <el-col :xs="18" :sm="8" :md="8" :lg="6">
              <label>账号名称：</label>
              <span class="item-info">{{ accountForm.accountName }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="detail-item">
            <el-col :xs="18" :sm="8" :md="8" :lg="6">
              <label>账号密码：</label>
              <span class="item-info">{{ accountForm.accountPassword }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="detail-item">
            <el-col :xs="18" :sm="8" :md="8" :lg="6">
              <label>账号角色：</label>
              <span class="item-info">{{ accountForm.role | formatRole }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="detail-item">
            <el-col :xs="18" :sm="8" :md="8" :lg="6">
              <label>审核状态：</label>
              <span class="item-info">{{ accountForm.auditStatus | formatAuditStatus }}</span>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import PageBack from '@/components/PageBack'
import { fetchPersonInfoDetail } from '@/api/person-info'
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
      fetchPersonInfoDetail(accountNo).then(response => {
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
