import { ACCESS_TOKEN, getCache, setCache } from '../assets/lib/cache'

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
