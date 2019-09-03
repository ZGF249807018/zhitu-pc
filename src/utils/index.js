import Vue from 'vue'
import moment from 'moment'

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

function addZero(s) {
  return s < 10 ? '0' + s : s
}

export function days(time) {
  const date = new Date()
  const lw = new Date(date - 1000 * 60 * 60 * 24 * time) // 最后一个数字30可改，30天的意思
  const lastY = lw.getFullYear()
  const lastM = lw.getMonth() + 1
  const lastD = lw.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  const last_day = lastY + '-' + addZero(lastM) + '-' + addZero(lastD) + ' ' + '00' + ':' + '00' + ':' + '00'
  return last_day
}
export function days2(time) {
  const date = new Date()
  const lw = new Date(date - 1000 * 60 * 60 * 24 * time) // 最后一个数字30可改，30天的意思
  const lastY = lw.getFullYear()
  const lastM = lw.getMonth() + 1
  const lastD = lw.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  const last_day = lastY + '-' + addZero(lastM) + '-' + addZero(lastD) + ' ' + '23' + ':' + '59' + ':' + '59'
  return last_day
}
export function formatDate2(time) {
  const tmpDate = new Date(time)
  const year = tmpDate.getFullYear()
  const mathon = tmpDate.getMonth() + 1
  const day = tmpDate.getDate()
  const hours = tmpDate.getHours()
  const minutes = tmpDate.getMinutes()
  return year + '.' + mathon + '.' + day + ' ' + hours + ':' + minutes
}

Vue.filter('time', function(data, formatString) {
  formatString = formatString || 'YYYY-MM-DD hh:mm'
  if (!data) {
    return '无记录'
  }
  return moment(data).format(formatString)
})
Vue.filter('time2', function(data, formatString) {
  formatString = formatString || 'YYYY-MM-DD'
  if (!data) {
    return ''
  }
  return moment(data).format(formatString)
})

