<template>
  <div class="detail-container">
    <page-back />
    <el-form ref="userForm" :model="userForm" label-width="100px" class="user-form">
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
  @import "~@/styles/detail.scss";

</style>
