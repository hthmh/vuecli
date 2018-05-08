import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _import = file => () =>
  import (`@/views/${file}.vue`)

export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    component: _import("Home")
  }]
})
