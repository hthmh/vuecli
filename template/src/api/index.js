import fetch from './fetch'

export function getParams(params) {
  return fetch({
    url: "/get",
    method: "get",
    params
  })
}

export function postParams(data) {
  return fetch({
    url: "/post",
    method: "post",
    data
  })
}
