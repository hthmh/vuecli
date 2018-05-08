import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import * as directives from './directives'
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

import store from '@/store'


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
