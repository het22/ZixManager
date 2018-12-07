import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/components/DashBoard.vue'
import NotFound from '@/components/NotFound.vue'
import Home from '@/components/Home.vue'
import Customer from '@/components/Customer.vue'
import Cost from '@/components/Cost.vue'
import Notification from '@/components/Notification.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DashBoard,
      children: [
        {
          path: '/',
          component: Home
        },
        {
          path: '/customer',
          component: Customer
        },
        {
          path: '/cost',
          component: Cost
        },
        {
          path: '/notification',
          component: Notification
        },
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
