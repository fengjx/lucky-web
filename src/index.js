import './amis'
import './assets/css/index.css'
import {
  DICT_KEY,
  SYS_CONFIG_KEY,
  USER_INFO_KEY,
  setCache,
} from './assets/lib/cache'
import {
  envList,
  getCurrentEnv,
  changeEnv,
  fetchMenu,
  fetchInitData,
  fetchUserInfo,
} from './app'

// 填充完整 schemaApi
const fillSchemaApi = (menus) => {
  const env = getCurrentEnv()
  menus.forEach((menu) => {
    if (menu.children) {
      fillSchemaApi(menu.children)
    }
    if (menu.schemaApi && !menu.schemaApi.startsWith('http')) {
      menu.schemaApi = `${env.schemaBaseUrl}/${menu.schemaApi}`
    }
  })
  return menus
}

const loadData = async () => {
  const data = await fetchInitData()
  setCache(DICT_KEY, data.dict)
  setCache(SYS_CONFIG_KEY, data.config)
}

const loadUserInfo = async () => {
  const res = await fetchUserInfo()
  const userInfo = res?.user_info
  if (!userInfo) {
    return null
  }
  setCache(USER_INFO_KEY, userInfo)
  return userInfo
}

;(async () => {
  const env = getCurrentEnv()
  if (!getToken()) {
    window.location = '/login'
    return
  }
  const userInfo = await loadUserInfo()
  if (!userInfo) {
    window.location = '/login'
    return
  }
  loadData()
  // 定时同步
  setInterval(async () => {
    loadData()
  }, 1000 * 60)

  // 从服务器拉取菜单
  const data = await fetchMenu()
  const menus = fillSchemaApi(data.pages || [])
  // 静态菜单
  menus.push({
    label: '设置',
    icon: 'fa fa-server',
    children: [
      {
        label: '服务配置',
        link: '/settings',
      },
    ],
  })

  const app = {
    type: 'app',
    data: {
      userInfo,
      envList,
      env,
    },
    brandName: 'LuchenAdmin',
    logo: '/logo.png',
    header: {
      type: 'grid',
      columns: [
        {
          md: 0,
          body: [],
        },
        {
          md: 9,
          body: [
            {
              type: 'flex',
              justify: 'flex-end',
              className: 'header-right',
              items: [
                {
                  type: 'dropdown-button',
                  label: '源码',
                  trigger: 'hover',
                  icon: 'fa fa-github',
                  buttons: [
                    {
                      type: 'button',
                      label: 'UI',
                    },
                    {
                      label: '服务端',
                      type: 'button',
                    },
                  ],
                },
                {
                  type: 'select',
                  source: '${envList}',
                  name: 'select',
                  value: '${env.value}',
                  onChange: (value) => {
                    if (value === env.value) {
                      return
                    }
                    changeEnv(value)
                    window.location.reload()
                  },
                },
                {
                  type: 'dropdown-button',
                  label: '${userInfo.nickname}',
                  trigger: 'hover',
                  icon: 'fa fa-user',
                  buttons: [
                    {
                      type: 'button',
                      label: '文档',
                    },
                    {
                      label: '退出登录',
                      type: 'button',
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
          ],
        },
      ],
    },
    pages: menus,
  }

  let amisInstance = createAmis('#root', app, {})

  appHistory.listen((state) => {
    amisInstance.updateProps({
      location: state.location || state,
    })
  })
})()
