const envList = [
  {
    label: 'demo环境',
    value: 'demo',
    apiBaseUrl: 'http://lucky.fengjx.com',
    schemaBaseUrl: 'http://lucky.fengjx.com/static/pages',
  },
]

console.log('envList', envList)

window.envList = envList
window.defaultEnv = 'demo'
