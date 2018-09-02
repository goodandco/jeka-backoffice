import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: 'super boss',
    avatar: 'https://i3.cpcache.com/product_zoom/99145252/super_boss_mousepad.jpg?height=460&width=460&padToSquare=true',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: 'rabochyi',
    avatar: 'https://st2.depositphotos.com/5592054/8533/v/950/depositphotos_85335110-stock-illustration-handyman-and-work-tool.jpg',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
