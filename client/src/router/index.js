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
  mode: 'history',
  routes: [
    {
      path: '/',
      component: DashBoard,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/customer',
          name: 'Customer',
          component: Customer
        },
        {
          path: '/cost',
          name: 'Cost',
          component: Cost
        },
        {
          path: '/notification',
          name: 'Notification',
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
