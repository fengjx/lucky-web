import request from '../assets/lib/request'

export const fetchMenu = async () => {
  return await request({
    url: '/admin/sys/menu/fetch',
    method: 'get',
  })
}

export * from './data'
export * from './user'
export * from './env'
