import './amis'

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
      redirect: '/index/1',
    },
    {
      label: '系统',
      children: [
        {
          label: '页面A',
          url: 'index',
          schema: {
            type: 'page',
            title: '页面A',
            body: '页面A',
          },
          children: [
            {
              label: '用户管理',
              url: 'sys_user',
              schemaApi: 'get:/pages/sys/user/index.json',
            },
            {
              label: '页面A-2',
              url: '2',
              schema: {
                type: 'page',
                title: '页面A-2',
                body: '页面A-2',
              },
            },
            {
              label: '页面A-3',
              url: '3',
              schema: {
                type: 'page',
                title: '页面A-3',
                body: '页面A-3',
              },
            },
          ],
        },
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

let amisInstance = createAmis('#root', app, {
  location: appHistory.location,
  data: {
    // 全局数据，是受控的数据
  },
  context: {
    // 全局上下文数据, 非受控的数据，无论哪一层都能获取到，包括弹窗自定义数据映射后都能获取到。
    // 可以用来放一下全局配置等。比如 API_HOST, 这样页面配置里面可以通过 ${API_HOST} 来获取到。
    API_HOST: 'https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com',
    ADMIN_BASE_URL: 'http://127.0.0.1:8080',
  },
})

appHistory.listen((state) => {
  amisInstance.updateProps({
    location: state.location || state,
  })
})
