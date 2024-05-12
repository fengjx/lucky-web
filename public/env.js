const envList = [
  {
    label: 'demo环境',
    value: 'demo',
    apiBaseUrl: 'http://8.134.143.210:8080',
    schemaBaseUrl: 'http://8.134.143.210:8080/static/pages',
  },
]

console.log('envList', envList)

window.envList = envList
window.defaultEnv = 'demo'
