import { getEnv, setEnv } from '../assets/lib/cache'

export const envList = [
  {
    label: '开发环境',
    value: 'dev',
    apiBaseUrl: 'http://localhost:8080',
    schemaBaseUrl: 'http://localhost:8080/static/pages',
  },
  {
    label: '测试环境',
    value: 'test',
    apiBaseUrl: 'http://localhost:8080',
    schemaBaseUrl: 'http://localhost:8080/static/pages',
  },
  {
    label: '预发环境',
    value: 'pre',
    apiBaseUrl: 'http://localhost:8080',
    schemaBaseUrl: 'http://localhost:8080/static/pages',
  },
  {
    label: '正式环境',
    value: 'prod',
    apiBaseUrl: 'http://localhost:8080',
    schemaBaseUrl: 'http://localhost:8080/static/pages',
  },
]

export const getCurrentEnv = () => {
  const envSn = getEnv() || 'dev'
  const currentEnv = envList.find((item) => item.value === envSn)
  return currentEnv
}

export const changeEnv = (env) => {
  setEnv(env)
}
