import 'amis/sdk/sdk.css'
import 'amis/sdk/antd.css'
import 'amis/sdk/helper.css'
import 'amis/sdk/iconfont.css'
import './assets/css/base.css'

import 'amis/sdk/sdk.js'

import { ACCESS_TOKEN, getCache } from './assets/lib/cache'
import { createHashHistory } from 'history'

// 如果想用 browserHistory 请切换下这处代码, 其他不用变
// const history = History.createBrowserHistory();
const history = createHashHistory()
const match = amisRequire('path-to-regexp').match
let amis = amisRequire('amis/embed')

function normalizeLink(to, location = history.location) {
  to = to || ''

  if (to && to[0] === '#') {
    to = location.pathname + location.search + to
  } else if (to && to[0] === '?') {
    to = location.pathname + to
  }

  const idx = to.indexOf('?')
  const idx2 = to.indexOf('#')
  let pathname = ~idx
    ? to.substring(0, idx)
    : ~idx2
    ? to.substring(0, idx2)
    : to
  let search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : ''
  let hash = ~idx2 ? to.substring(idx2) : location.hash

  if (!pathname) {
    pathname = location.pathname
  } else if (pathname[0] != '/' && !/^https?\:\/\//.test(pathname)) {
    let relativeBase = location.pathname
    const paths = relativeBase.split('/')
    paths.pop()
    let m
    while ((m = /^\.\.?\//.exec(pathname))) {
      if (m[0] === '../') {
        paths.pop()
      }
      pathname = pathname.substring(m[0].length)
    }
    pathname = paths.concat(pathname).join('/')
  }

  return pathname + search + hash
}

function isCurrentUrl(to, ctx) {
  if (!to) {
    return false
  }
  const pathname = history.location.pathname
  const link = normalizeLink(to, {
    ...location,
    pathname,
    hash: '',
  })

  if (!~link.indexOf('http') && ~link.indexOf(':')) {
    let strict = ctx && ctx.strict
    return match(link, {
      decode: decodeURIComponent,
      strict: typeof strict !== 'undefined' ? strict : true,
    })(pathname)
  }

  return decodeURI(pathname) === link
}

window.createAmis = (container, schemaJSON, props) => {
  let amisInstance = amis.embed(container, schemaJSON, props, {
    // watchRouteChange: fn => {
    //   return history.listen(fn);
    // },
    updateLocation: (location, replace) => {
      location = normalizeLink(location)
      if (location === 'goBack') {
        return history.goBack()
      } else if (
        (!/^https?\:\/\//.test(location) &&
          location === history.location.pathname + history.location.search) ||
        location === history.location.href
      ) {
        // 目标地址和当前地址一样，不处理，免得重复刷新
        return
      } else if (/^https?\:\/\//.test(location) || !history) {
        return (window.location.href = location)
      }

      history[replace ? 'replace' : 'push'](location)
    },
    jumpTo: (to, action) => {
      if (to === 'goBack') {
        return history.goBack()
      }

      to = normalizeLink(to)

      if (isCurrentUrl(to)) {
        return
      }

      if (action && action.actionType === 'url') {
        action.blank === false
          ? (window.location.href = to)
          : window.open(to, '_blank')
        return
      } else if (action && action.blank) {
        window.open(to, '_blank')
        return
      }

      if (/^https?:\/\//.test(to)) {
        window.location.href = to
      } else if (
        (!/^https?\:\/\//.test(to) &&
          to === history.pathname + history.location.search) ||
        to === history.location.href
      ) {
        // do nothing
      } else {
        history.push(to)
      }
    },
    isCurrentUrl: isCurrentUrl,
    requestAdaptor: async (config) => {
      console.log('requestAdaptor', config)
      const headers = config.headers || {}
      headers['app'] = 'lca-ui'
      const token = getCache(ACCESS_TOKEN)
      if (token) {
        headers['X-Token'] = token
      }
      config.headers = headers
      return config
    },
    // fetcher: async (api) => {
    //   let { url, method, data, responseType, config, headers } = api
    //   config = config || {}
    //   config.url = url
    //   config.withCredentials = true
    //   responseType && (config.responseType = responseType)

    //   if (config.cancelExecutor) {
    //     config.cancelToken = config.cancelExecutor
    //   }

    //   config.headers = headers || {}
    //   config.method = method
    //   config.data = data

    //   config = await requestAdaptor(config)

    //   if (method === 'get' && data) {
    //     config.params = data
    //   } else if (data && data instanceof FormData) {
    //     // config.headers['Content-Type'] = 'multipart/form-data';
    //   } else if (
    //     data &&
    //     typeof data !== 'string' &&
    //     !(data instanceof Blob) &&
    //     !(data instanceof ArrayBuffer)
    //   ) {
    //     data = JSON.stringify(data)
    //     config.headers['Content-Type'] = 'application/json'
    //   }

    //   // 支持返回各种报错信息
    //   config.validateStatus = function () {
    //     return true
    //   }

    //   let response = config.mockResponse
    //     ? config.mockResponse
    //     : await axios(config)
    //   response = await attachmentAdpator(response, __, api)
    //   response = responseAdaptor(api)(response)

    //   if (response.status >= 400) {
    //     if (response.data) {
    //       // 主要用于 raw: 模式下，后端自己校验登录，
    //       if (
    //         response.status === 401 &&
    //         response.data.location &&
    //         response.data.location.startsWith('http')
    //       ) {
    //         location.href = response.data.location.replace(
    //           '{{redirect}}',
    //           encodeURIComponent(location.href)
    //         )
    //         return new Promise(() => {})
    //       } else if (response.data.msg) {
    //         throw new Error(response.data.msg)
    //       } else {
    //         throw new Error(
    //           __('System.requestError') + JSON.stringify(response.data, null, 2)
    //         )
    //       }
    //     } else {
    //       throw new Error(
    //         `${__('System.requestErrorStatus')} ${response.status}`
    //       )
    //     }
    //   }

    //   return response
    // },
    theme: 'cxd',
  })
  return amisInstance
}

window.appHistory = history
