import './amis'
import { getEnvList, setEnvConfig } from './app/env'
import './assets/css/settings.css'

const render = (envs) => {}

;(() => {
  const envs = getEnvList()
  console.log('envs', envs)

  const amisJSON = {
    type: 'page',
    title: '环境配置',
    data: {
      envs,
    },
    body: {
      type: 'tabs',
      source: '${envs}',
      mode: 'horizontal',
      labelAlign: 'left',
      mode: 'line',
      toolbar: [
        {
          type: 'button',
          label: '新增环境',
          level: 'link',
          actionType: 'dialog',
          dialog: {
            title: '新增环境',
            body: {
              type: 'form',
              title: '',
              mode: 'horizontal',
              horizontal: {
                justify: true,
                left: 3,
                right: 9,
              },
              onSubmit: (data) => {
                console.log('submit', data)
              },
              actions: [
                {
                  type: 'submit',
                  label: '保存',
                  level: 'primary',
                },
              ],
              body: [
                {
                  label: '环境名称',
                  type: 'input-text',
                  name: 'name',
                  className: 'input-item',
                  required: true,
                },
                {
                  label: '环境标识',
                  type: 'input-text',
                  name: 'sn',
                  className: 'input-item',
                  required: true,
                },
                {
                  label: '接口地址',
                  type: 'input-text',
                  name: 'api',
                  className: 'input-item',
                  required: true,
                },
                {
                  label: 'schema 地址',
                  type: 'input-text',
                  name: 'schemaApi',
                  required: true,
                },
              ],
            },
          },
        },
        {
          type: 'button',
          label: '进入系统',
          level: 'link',
        },
      ],
      collapseOnExceed: 5,
      activeKey: 'dev',
      tabs: [
        {
          title: '${name}',
          hash: '${sn}',
          body: {
            type: 'form',
            title: '',
            mode: 'horizontal',
            horizontal: {
              justify: true,
              left: 2,
              right: 10,
            },
            onSubmit: (data) => {
              console.log('submit', data)
            },
            actions: [
              {
                type: 'button',
                label: '删除',
                level: 'danger',
                visibleOn: '${ sn !== "dev" }',
              },
              {
                type: 'submit',
                label: '保存',
                level: 'primary',
                visibleOn: '${ sn !== "dev" }',
              },
            ],
            body: [
              {
                label: '环境名称',
                type: 'input-text',
                name: 'name',
                className: 'input-item',
                required: true,
              },
              {
                label: '环境标识',
                type: 'input-text',
                name: 'sn',
                className: 'input-item',
                required: true,
              },
              {
                label: '接口地址',
                type: 'input-text',
                name: 'api',
                className: 'input-item',
                required: true,
              },
              {
                label: 'schema 地址',
                type: 'input-text',
                name: 'schemaApi',
                required: true,
              },
            ],
          },
        },
      ],
    },
  }
  let amisScoped = createAmis('#root', amisJSON, {})
})()
