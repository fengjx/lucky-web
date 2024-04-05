import axios from 'axios'

import { getToken, setToken } from '../../../app'
import consts from '../../../consts'

const apiBaseURL = import.meta.env.VITE_API_BASEURL

const service = axios.create({
  baseURL: apiBaseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    config.headers[consts.ADMIN_TOKEN] = getToken() || ''
    return config
  },
  (e) => {
    console.log(e) // for debug
    return Promise.reject(e)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const headers = response.headers
    if (headers && headers[consts.ADMIN_REFRESH_TOKEN]) {
      const token = headers[consts.ADMIN_REFRESH_TOKEN]
      console.log('refresh token', token)
      setToken(token)
    }

    const res = response.data
    if (res.status && res.status > 0) {
      console.log('response err', res.msg)
      return Promise.reject({
        status: res.status,
        msg: res.msg,
      })
    }
    return res.data
  },
  (e) => {
    if (e.response?.status == 401 && window.location.pathname != '/login') {
      setToken('')
      window.location = '/login'
      return
    }
    console.log('net err', e) // for debug
    return Promise.reject(e)
  }
)

export default service
