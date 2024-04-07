import './amis'
import './assets/css/index.css'
import { DICT_KEY, SYS_CONFIG_KEY, setCache } from './assets/lib/cache'
import { getCurrentEnv, fetchMenu, fetchInitData } from './app'

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

const fetchData = async () => {
  const data = await fetchInitData()
  setCache(DICT_KEY, data.dict)
  setCache(SYS_CONFIG_KEY, data.config)
}

;(async () => {
  if (!getToken()) {
    window.location = '/login'
  }
  fetchData()
  // 定时同步
  setInterval(async () => {
    fetchData()
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
    pages: menus,
  }

  let amisInstance = createAmis('#root', app, {})

  appHistory.listen((state) => {
    amisInstance.updateProps({
      location: state.location || state,
    })
  })
})()
