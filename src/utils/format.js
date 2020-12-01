export function formatProjectStatus(type) {
  switch (Number(type)) {
    case 0: return '未开始'
    case 1: return '进行中'
    case 2: return '已完成'
    default: return ''
  }
}

// 格式化工时单位 （1天 = 8小时）
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
