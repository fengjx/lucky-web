import './amis'

import { ACCESS_TOKEN, setCache, getCache } from './assets/lib/cache'
;(() => {
  if (getCache(ACCESS_TOKEN)) {
    window.location = '/'
  }
  let amisJSON = {
    type: 'page',
    body: {
      type: 'form',
      title: '路辰后台系统登录',
      mode: 'inline',
      redirect: '/',
      api: {
        method: 'post',
        url: `${appConfig.apiBaseURL}/api/login`,
        adaptor: function (payload, response) {
          console.log('login payload', payload, response)
          if (!payload.status || payload.status === 0) {
            if (payload.data?.token) {
              setCache(ACCESS_TOKEN, payload.data.token)
              window.location = '/'
            }
          }
          return payload
        },
      },
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
          level: 'primary',
        },
      ],
    },
  }
  let amisScoped = createAmis('#root', amisJSON, {})
})()
