import './amis'

import { ACCESS_TOKEN, setCache } from './assets/lib/cache'

// 通过替换下面这个配置来生成不同页面
let amisJSON = {
  type: 'page',
  body: {
    type: 'form',
    title: '路辰后台系统登录',
    mode: 'inline',
    api: {
      method: 'post',
      url: `${appConfig.apiBaseURL}/api/login`,
      adaptor: function (payload, response) {
        console.log('login payload', payload, response)
        if (!payload.status || payload.status === 0) {
          setCache(ACCESS_TOKEN, payload.data.token)
        }
        return payload
      },
    },
    redirect: '/',
    body: [
      {
        label: '用户名',
        type: 'input-text',
        name: 'username',
      },
      {
        label: '密码',
        type: 'input-password',
        name: 'password',
      },
      {
        type: 'submit',
        label: '登录',
      },
    ],
  },
}
let amisScoped = createAmis('#root', amisJSON, {})
