<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Phone" min-width="200">
      <template slot-scope="scope">
        {{scope.row.phone |  orderNoFilter}}
      </template>
    </el-table-column>
    <el-table-column label="Fullname" width="195" align="center">
      <template slot-scope="scope">
        {{scope.row.fio | toThousandslsFilter}}
      </template>
    </el-table-column>
    <el-table-column label="Address" width="195" align="center">
      <template slot-scope="scope">
        {{scope.row.address | toThousandslsFilter}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchList } from '@/api/transaction'

export default {
  data() {
    return {
      list: null
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchList().then(response => {
        this.list = response.slice(0, 8)
      })
    }
  }
}
</script>
