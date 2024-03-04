import './amis'

// 通过替换下面这个配置来生成不同页面
let amisJSON = {
  type: 'page',
  title: '表单页面',
  body: {
    type: 'form',
    mode: 'horizontal',
    classNam: 'main',
    api: '/saveForm',
    body: [
      {
        label: 'Name',
        type: 'input-text',
        name: 'name',
      },
      {
        label: 'Email',
        type: 'input-email',
        name: 'email',
      },
      {
        label: 'Password',
        type: 'input-password',
        name: '密码',
      },
    ],
  },
}
let amisScoped = createAmis('#root', amisJSON, {})
