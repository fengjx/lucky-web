import './amis'
import './assets/css/index.css'
import { appConfig, fetchMenu } from './app'

// 填充完整 schemaApi
const fillSchemaApi = (menus) => {
  menus.forEach((menu) => {
    if (menu.children) {
      fillSchemaApi(menu.children)
    }
    if (menu.schemaApi && !menu.schemaApi.startsWith('http')) {
      menu.schemaApi = `${appConfig.pageURL}/${menu.schemaApi}`
    }
  })
  return menus
}

;(async () => {
  if (!getToken()) {
    window.location = '/login'
  }

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
