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

console.log('envList', envList)

window.envList = envList
window.defaultEnv = 'dev'
