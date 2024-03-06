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
      type: 'tpl',
      inline: false,
      className: 'w-full',
      tpl: '<div class="flex justify-between"><div>顶部区域左侧</div><div>顶部区域右侧</div></div>',
    },
    pages: [
      {
        label: 'Home',
        url: '/',
        redirect: '/sys/user',
      },
      {
        label: '功能',
        children: [
          {
            label: '系统管理',
            url: '/sys',
            children: [
              {
                label: '用户管理',
                url: 'user',
                schemaApi: `get:${appConfig.pageURL}/sys/user/index.json`,
              },
              {
                label: '菜单管理',
                url: '2',
                schema: {
                  type: 'page',
                  title: '页面A-2',
                  body: '页面A-2',
                },
              },
              {
                label: '字典管理',
                url: '3',
                schema: {
                  type: 'page',
                  title: '页面A-3',
                  body: '页面A-3',
                },
              },
            ],
          },
        ],
      },
      {
        label: '设置',
        children: [
          {
            label: '列表示例',
            url: '/crud',
            rewrite: '/crud/list',
            icon: 'fa fa-cube',
            children: [
              {
                label: '列表',
                url: '/crud/list',
                icon: 'fa fa-list',
                schemaApi: 'get:/pages/crud-list.json',
              },
              {
                label: '新增',
                url: '/crud/new',
                icon: 'fa fa-plus',
                schemaApi: 'get:/pages/crud-new.json',
              },
              {
                label: '查看',
                url: '/crud/:id',
                schemaApi: 'get:/pages/crud-view.json',
              },
              {
                label: '修改',
                url: '/crud/:id/edit',
                schemaApi: 'get:/pages/crud-edit.json',
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
