import 'amis/sdk/sdk.css'
import 'amis/sdk/antd.css'
import 'amis/sdk/helper.css'
import 'amis/sdk/iconfont.css'
import './assets/css/base.css'

import 'amis/sdk/sdk.js'

import { ACCESS_TOKEN, getCache, setCache } from './assets/lib/cache'
import { createHashHistory } from 'history'

const apiBaseURL = import.meta.env.VITE_API_BASEURL
const pageURL = import.meta.env.VITE_PAGE_BASEURL

const appConfig = {
  apiBaseURL,
  pageURL,
}

// 如果想用 browserHistory 请切换下这处代码, 其他不用变
// const history = History.createBrowserHistory();
const appHistory = createHashHistory()
const match = amisRequire('path-to-regexp').match
let amis = amisRequire('amis/embed')

function normalizeLink(to, location = appHistory.location) {
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
  const pathname = appHistory.location.pathname
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
  const defaultProps = {
    location: appHistory.location,
    data: {
      // 全局数据，是受控的数据
    },
    context: {
      API_BASEURL: apiBaseURL,
      PAGE_URL: pageURL,
    },
  }
  const targetProps = Object.assign(defaultProps, props)

  let amisInstance = amis.embed(container, schemaJSON, targetProps, {
    // watchRouteChange: fn => {
    //   return history.listen(fn);
    // },
    updateLocation: (location, replace) => {
      location = normalizeLink(location)
      if (location === 'goBack') {
        return appHistory.goBack()
      } else if (
        (!/^https?\:\/\//.test(location) &&
          location ===
            appHistory.location.pathname + appHistory.location.search) ||
        location === appHistory.location.href
      ) {
        // 目标地址和当前地址一样，不处理，免得重复刷新
        return
      } else if (/^https?\:\/\//.test(location) || !appHistory) {
        return (window.location.href = location)
      }

      appHistory[replace ? 'replace' : 'push'](location)
    },
    jumpTo: (to, action) => {
      if (to === 'goBack') {
        return appHistory.goBack()
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
          to === appHistory.pathname + appHistory.location.search) ||
        to === appHistory.location.href
      ) {
        // do nothing
      } else {
        appHistory.push(to)
      }
    },
    isCurrentUrl: isCurrentUrl,
    requestAdaptor: async (api, context) => {
      const headers = api.headers || {}
      headers['app'] = 'lca-ui'
      const token = getCache(ACCESS_TOKEN)
      if (token) {
        headers['X-Token'] = token
      }
      api.headers = headers
      return api
    },
    responseAdaptor: (api, payload, query, request, response) => {
      const headers = response.headers
      if (headers && headers['x-refresh-token']) {
        const token = headers['x-refresh-token']
        console.log('refresh token', token)
        setCache(ACCESS_TOKEN, token)
      }
      return payload
    },
    theme: 'antd',
  })
  return amisInstance
}

const logout = () => {
  setCache(ACCESS_TOKEN, null)
  window.location = '/login'
}

window.appHistory = appHistory

window.appConfig = appConfig

window.logout = logout
