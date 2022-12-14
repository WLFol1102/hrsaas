import Cookies from 'js-cookie'

const TokenKey = 'hrsass-key-token'
const timeKey = 'hrass-timestanp-key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTimeStamp() {
  return Cookies.get(timeKey)
}

export function setTimeStamp() {
  return Cookies.set(timeKey, Date.now())
}
