import Vue from 'vue'
import Router from 'vue-router'
import SearchClient from '@/components/SearchClient'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'SearchClient',
      component: SearchClient
    }
  ]
})
