import request from '../assets/lib/request'

export const fetchMenu = async () => {
  return await request({
    url: '/admin/sys/menu/fetch',
    method: 'get',
  })
}

export * from './config'
export * from './data'
export * from './user'
