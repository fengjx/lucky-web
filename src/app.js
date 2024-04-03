import request from './assets/lib/request'

export const fetchInitData = async () => {
  const res = await request({
    url: '/openapi/app/init',
    method: 'get',
  })
}

export const fetchMenu = async () => {
  return await request({
    url: '/admin/sys/menu/fetch',
    method: 'get',
  })
}
;(async () => {
  //await fetchInitData()
})()
