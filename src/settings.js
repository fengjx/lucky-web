import './amis'
import './assets/css/settings.css'
;(() => {
  let amisJSON = {
    type: 'page',
    data: {
      env: [
        {
          label: '开发环境',
          value: 'dev',
        },
        {
          label: '测试环境',
          value: 'test',
        },
      ],
    },
    body: {
      type: 'form',
      title: '环境配置',
      submitText: '保存',
      mode: 'horizontal',
      labelAlign: 'left',
      body: [
        {
          type: 'tabs',
          source: '${env}',
          closable: true,
          mode: 'line',
          toolbar: [
            {
              type: 'button',
              label: '新增环境',
              size: 'md',
              actionType: 'dialog',
              dialog: {
                title: '弹窗标题',
                body: '你点击了',
              },
            },
          ],
          tabs: [
            {
              title: '${label}',
              body: [
                {
                  label: '环境标识',
                  type: 'input-text',
                  name: 'a',
                  className: 'input-item',
                  required: true,
                },
                {
                  label: '接口地址',
                  type: 'input-text',
                  name: 'a',
                  className: 'input-item',
                  required: true,
                },
                {
                  label: 'schema 地址',
                  type: 'input-text',
                  name: 'a',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  }
  let amisScoped = createAmis('#root', amisJSON, {})
})()
