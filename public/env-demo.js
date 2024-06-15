const envList = [
  {
    label: 'demo环境',
    value: 'demo',
    apiBaseUrl: 'http://lucky.fengjx.com',
    schemaBaseUrl: 'http://lucky.fengjx.com/static/pages',
  },
]

const defaultEnv = 'demo'
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
