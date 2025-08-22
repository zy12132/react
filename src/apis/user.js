import { http } from '@/utils'

export function loginApi(data) {
  return http.post('/authorizations', data)
}

// 获取用户信息

export function getProfileApi() {
  return http.get('/user/profile')
}

