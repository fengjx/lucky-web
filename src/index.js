import './amis'

import { ACCESS_TOKEN, getCache, setCache } from './assets/lib/cache'
;(() => {
  if (!getCache(ACCESS_TOKEN)) {
    window.location = '/login'
  }

  const app = {
    type: 'app',
    brandName: 'LuchenAdmin',
    logo: '/logo.png',
    header: {
      type: 'grid',
      columns: [
        {
          md: 0,
        },
        {
          md: 9,
          body: [
            {
              label: '退出登录',
              type: 'button',
              className: 'header-right',
              actionType: 'dialog',
              dialog: {
                title: '确认退出登录？',
                onEvent: {
                  confirm: {
                    actions: [
                      {
                        actionType: 'custom',
                        script: 'logout()',
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      ],
    },
    pages: [
      {
        label: 'Home',
        url: '/',
        redirect: '/sys/user',
      },
      {
        label: '系统',
        children: [
          {
            label: '系统管理',
            url: '/sys',
            icon: 'fa fa-wrench',
            children: [
              {
                label: '用户管理',
                url: 'user',
                schemaApi: `get:${appConfig.pageURL}/sys/user/index.json`,
              },
              {
                label: '菜单管理',
                url: 'menu',
                schemaApi: `get:${appConfig.pageURL}/sys/menu/index.json`,
              },
              {
                label: '字典管理',
                url: 'dict',
                schemaApi: `get:${appConfig.pageURL}/sys/dict/index.json`,
              },
              {
                label: '配置管理',
                url: 'config',
                schemaApi: `get:${appConfig.pageURL}/sys/config/index.json`,
              },
            ],
          },
          {
            label: '设置',
            url: '/settings',
            icon: 'fa fa-server',
            redirect: '/settings/service',
            children: [
              {
                label: '服务配置',
                url: 'service',
                schemaApi: 'get:/pages/crud-list.json',
              },
            ],
          },
        ],
      },
    ],
  }

  let amisInstance = createAmis('#root', app, {})

  appHistory.listen((state) => {
    amisInstance.updateProps({
      location: state.location || state,
    })
  })
})()
