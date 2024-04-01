import { ACCESS_TOKEN, getCache, setCache } from '../cache'

const apiBaseURL = import.meta.env.VITE_API_BASEURL
const pageURL = import.meta.env.VITE_PAGE_BASEURL

const appConfig = {
  apiBaseURL,
  pageURL,
}

export const getToken = () => {
  const token = getCache(ACCESS_TOKEN)
  return token
}

export const setToken = (token) => {
  setCache(ACCESS_TOKEN, token)
}

export const logout = () => {
  setCache(ACCESS_TOKEN, null)
  window.location = '/login'
}

export { appConfig }
