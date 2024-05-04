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
    apiBaseUrl: 'http://admin.luchen.fun',
    schemaBaseUrl: 'http://admin.luchen.fun/static/pages',
  },
]

console.log('envList', envList)

window.envList = envList
