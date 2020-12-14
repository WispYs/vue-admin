<template>
  <list-page :list="list" :total="total" :list-loading="listLoading" @fetch-list="__fetchlist" />
</template>

<script>
import ListPage from './components/ListPage'
import { fetchProgressPlan } from '@/api/progress-plan'
import mockData from '@/mock/mock-data'

export default {
  components: { ListPage },
  data() {
    return {
      listLoading: true,
      list: mockData.progressList,
      total: 0
    }
  },
  methods: {
    __fetchlist(page, size, filter) {
      this.listLoading = true
      fetchProgressPlan(page, size, filter).then(response => {
        // this.list = response.data.rows
        this.list = mockData.progressList
        this.total = 3
        this.listLoading = false
      })
    }
  }
}
</script>
