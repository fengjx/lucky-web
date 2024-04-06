import './amis'
import './assets/css/login.css'
import { getToken, setToken } from './app'
;(() => {
  if (getToken()) {
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
        url: `${appConfig.apiBaseURL}/api/open/sys/login`,
      },
      onFinished: (values) => {
        console.log('login res', values)
        if (values.token) {
          setToken(values.token)
          window.location = '/'
        }
        return false // 这样可以禁掉 amis 后续的默认行为
      },
      body: [
        {
          label: '用户名',
          type: 'input-text',
          name: 'username',
          required: true,
        },
        {
          label: '密码',
          type: 'input-password',
          name: 'password',
          required: true,
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
