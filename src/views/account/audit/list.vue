<template>
  <list-page :list="list" :total="total" :list-loading="listLoading" @fetch-list="__fetchlist" />
</template>

<script>
import ListPage from './components/ListPage'
import { fetchAccountList } from '@/api/account'

export default {
  components: { ListPage },
  data() {
    return {
      listLoading: true,
      list: [],
      total: 0
    }
  },
  methods: {
    __fetchlist(page, size, filter) {
      this.listLoading = true
      fetchAccountList(page, size, filter).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
