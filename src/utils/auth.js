import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Role = 'Admin-Role'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function getUserInfo() {
  return Cookies.get('userInfo')
}
export function setToken(token, e) {
  return Cookies.set(TokenKey, token, { expires: e })
}
export function setRole(role) {
  return Cookies.set(Role, role)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
