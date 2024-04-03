import axios from 'axios'

import { getToken, setToken } from '../kit'

const apiBaseURL = import.meta.env.VITE_API_BASEURL

const service = axios.create({
  baseURL: apiBaseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    config.headers['X-Token'] = getToken() || ''
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const headers = response.headers
    if (headers && headers['x-refresh-token']) {
      const token = headers['x-refresh-token']
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
  (error) => {
    console.log('net err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
