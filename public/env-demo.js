const envList = [
  {
    label: 'demo环境',
    value: 'demo',
    apiBaseUrl: 'http://lucky.fengjx.com',
    schemaBaseUrl: 'http://lucky.fengjx.com/static/pages',
  },
]

const defaultEnv = 'dev'
const envKey = 'lucky.env'

console.log('envList', envList)

const getEnv = () => {
  const env = localStorage.getItem(lucky_env) || defaultEnv
  return env
}

const setEnv = (env) => {
  localStorage.setItem(lucky_env, env)
}

window.envList = envList
window.getEnv = getEnv
window.setEnv = setEnv
