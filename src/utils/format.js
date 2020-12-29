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

export function formatAuditStatus(type) {
  switch (Number(type)) {
    case 0: return '未启用'
    case 1: return '已启用'
    default: return ''
  }
}

export function formatRole(type) {
  switch (type) {
    case 'admin': return '管理员'
    case 'operator': return '操作人员'
    case 'visitor': return '访客'
    default: return '无'
  }
}

export function formatDeliverStatus(type) {
  switch (Number(type)) {
    case 0: return '未发货'
    case 1: return '已发货'
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

// 项目阶段（设计/生产）状态
export function formatStageStatus(status) {
  if (status === '1') {
    return 'success'
  } else if (status === '0') {
    return 'info'
  }
}

// 反馈提货
export function formatFeedback(status) {
  if (status === '1') {
    return '是'
  } else if (status === '0') {
    return '否'
  }
}

// 格式化工时单位 （1人/天 = 8小时）
// 项目需求为天后台一意孤行要存小时，所以存取数据的时候需要转换，smddx
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
// 原因同上，存取数据的时候需要转换
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
