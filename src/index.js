import './amis'
import { fetchMenu } from './app'
import { appConfig } from './assets/lib/kit'

// 填充完整 schemaApi
const fillSchemaApi = (menus) => {
  menus.forEach((menu) => {
    if (menu.children) {
      fillSchemaApi(menu.children)
    }
    if (menu.schemaApi && !menu.schemaApi.startsWith('http')) {
      menu.schemaApi = `${appConfig.pageURL}/${menu.schemaApi}`
      console.log('menu.schemaApi ', menu.schemaApi)
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
    url: '/settings',
    icon: 'fa fa-server',
    redirect: '/settings/service',
    children: [
      {
        label: '服务配置',
        url: 'service',
        schemaApi: 'get:/pages/settings.json',
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
