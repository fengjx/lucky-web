import { getEnv, setEnv } from '../assets/lib/cache'

export const envList = window.envList

export const getCurrentEnv = () => {
  const envSn = getEnv() || 'dev'
  const currentEnv = envList.find((item) => item.value === envSn)
  return currentEnv
}

export const changeEnv = (env) => {
  setEnv(env)
}
