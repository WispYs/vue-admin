export function formatTimestamp(date) {
  const dateTime = date || ''
  return new Date(dateTime).getTime()
}

export function formatProjectStatus(type) {
  switch (Number(type)) {
    case 0: return '未开始'
    case 1: return '进行中'
    case 2: return '已完成'
    case 3: return '已搁置'
    default: return ''
  }
}

export function formatRisk(status) {
  switch (Number(status)) {
    case 0: return '有风险'
    case 1: return '已延误'
    case 2: return '正常'
    default: return ''
  }
}

// 格式化工时单位 （1人/天 = 8小时）
// 小时转天
export function workTimeH2D(num) {
  const workTime = num || 0
  return Number((workTime / 8).toFixed(2))
}
// 天转小时
export function workTimeD2H(num) {
  const workTime = num || 0
  return Number((workTime * 8).toFixed(2))
}

// 格式化时间（去除后台返回的时分秒 例如：2020-12-01 00:00:00）
export function formatYYMMDD(str) {
  const timeStr = str || ''
  return timeStr.split(' ')[0]
}

// 格式化进度 小数转化为百分比
export function formatProgress(num) {
  const progress = num || 0
  return Number((progress * 100).toFixed(2))
}

// 工作评价
export function formatEvaluation(status) {
  switch (Number(status)) {
    case 1: return '优'
    case 2: return '良'
    case 3: return '中'
    case 4: return '差'
    default: return ''
  }
}
