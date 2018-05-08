import axios from 'axios'
// import qs from 'qs'

const service = axios.create({
  baseURL: "http://lp-koa.herokuapp.com/",
  timeout: 1000 * 60
})

service.interceptors.request.use(config => {
  // if (config.method == 'post') {
  //   config.data = qs.stringify({
  //     ...config.data
  //   })
  // }
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data;
    return res
    // if (res.status == 1) {
    //   return res.result
    // } else {
    //   alert("服务器忙，请稍后再试...")
    //   return {}
    // }

  }, error => {
    alert("服务器忙，请稍后再试...")
    return Promise.reject(error)
  }
)

export default service
