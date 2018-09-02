<template>
  <el-table :data='list' style='width: 100%;padding-top: 15px;'>
    <el-table-column label='Phone' width='120'>
      <template slot-scope='scope'>
        {{scope.row.phone}}
      </template>
    </el-table-column>
    <el-table-column label='Fullname' width='200' align='center'>
      <template slot-scope='scope'>
        {{scope.row.fio}}
      </template>
    </el-table-column>
    <el-table-column label='Address' width='350' align='center'>
      <template slot-scope='scope'>
        {{scope.row.address}}
      </template>
    </el-table-column>
    <el-table-column label='Debit' width='100' align='center'>
      <template slot-scope='scope'>
        {{scope.row.debit}}
      </template>
    </el-table-column>
    <el-table-column label='Credit' width='100' align='center'>
      <template slot-scope='scope'>
        {{scope.row.credit}}
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
    this.listen('ws://127.0.0.1:1338')
  },
  methods: {
    listen(location) {
      const socket = new WebSocket(location)
      socket.onopen = () => {
        console.log('Соединение установлено.')
      }

      socket.onclose = event => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто')
        } else {
          console.log('Обрыв соединения')
        }

        console.log('Код: ' + event.code + ' причина: ' + event.reason)

        setTimeout(() => this.listen(location), 5000)
      }

      socket.onmessage = event => {
        console.log('Получены данные ' + event.data)
        this.fetchData({
          filter: {
            where: {
              phone: event.data
            }
          },
          limit: 1
        })
      }

      socket.onerror = error => {
        console.log('Ошибка ' + error.message)
      }
    },
    fetchData(query) {
      fetchList(query).then(response => {
        this.list = response.data.slice(0, 8)
      })
    }
  }
}
</script>
