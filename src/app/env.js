import { getEnv, setEnv } from '../assets/lib/cache'

export const envList = [
  {
    name: '开发环境',
    sn: 'dev',
    apiBaseUrl: 'http://localhost:8080',
    schemaBaseUrl: 'http://localhost:8080/static/pages',
  },
  {
    name: '测试环境',
    sn: 'test',
    apiBaseUrl: 'http://localhost:8080',
    schemaBaseUrl: 'http://localhost:8080/static/pages',
  },
  {
    name: '预发布环境',
    sn: 'test',
    apiBaseUrl: 'http://localhost:8080',
    schemaBaseUrl: 'http://localhost:8080/static/pages',
  },
  {
    name: '正式环境',
    sn: 'prod',
    apiBaseUrl: 'http://localhost:8080',
    schemaBaseUrl: 'http://localhost:8080/static/pages',
  },
]

export const getCurrentEnv = () => {
  const envSn = getEnv() || 'dev'
  const currentEnv = envList.find((item) => item.sn === envSn)
  return currentEnv
}

export const changeEnv = (env) => {
  setEnv(env)
}
