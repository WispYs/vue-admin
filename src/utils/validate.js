/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isMobile(str) {
  return /^1[3-9]\d{9}$/.test(str)
}

export function validUsername(str) {
  return str.length < 20 && str.length > 0
}

// 只能输入3-20个字母、数字、下划线
export function validUserPassword(str) {
  return /^(\w){3,20}$/.test(str)
}

// 密码6-20个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符
// export function validUserPassword(str) {
//   return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,20}$/.text(str)
// }
