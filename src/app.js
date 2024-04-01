import request from './assets/lib/request'

const fetchInitData = async () => {
  const res = await request({
    url: '/openapi/app/init',
    method: 'get',
  })
}

;(async () => {
  await fetchInitData()
})()
