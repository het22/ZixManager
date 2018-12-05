import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/components/DashBoard.vue'
import NotFound from '@/components/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
