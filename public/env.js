const envList = [
  {
    label: '开发环境',
    value: 'dev',
    apiBaseUrl: 'http://localhost:8080',
    schemaBaseUrl: 'http://localhost:8080/static/pages',
  },
  {
    label: 'demo环境',
    value: 'demo',
    apiBaseUrl: 'http://8.134.143.210:8080',
    schemaBaseUrl: 'http://8.134.143.210:8080/static/pages',
  },
]

const defaultEnv = 'dev'
const envKey = 'lucky.env'

console.log('envList', envList)

const getEnv = () => {
  const env = localStorage.getItem(envKey) || defaultEnv
  return env
}

const setEnv = (env) => {
  localStorage.setItem(envKey, env)
}

window.envList = envList
window.getEnv = getEnv
window.setEnv = setEnv
