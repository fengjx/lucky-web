import axios from 'axios'

import { getToken, setToken } from '../lib/kit'

const apiBaseURL = import.meta.env.VITE_API_BASEURL

const service = axios.create({
  baseURL: apiBaseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
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
    return res
  },
  (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
