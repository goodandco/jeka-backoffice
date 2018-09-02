import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'http://localhost:4044/api/users',
    method: 'get',
    params: query
  })
}
