import Vue from 'vue'
import Router from 'vue-router'
// Main Layout: DashBoard
import DashBoard from '@/components/DashBoard.vue'
// Contents
import Home from '@/components/Home.vue'
import Member from '@/components/member/Member.vue'
import MemberDetail from '@/components/member/MemberDetail.vue'
import MemberNew from '@/components/member/MemberNew.vue'
import Order from '@/components/Order.vue'
import Cost from '@/components/Cost.vue'
import Notification from '@/components/Notification.vue'
// Not Found
import NotFound from '@/components/NotFound.vue'

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
          path: '/member',
          name: 'Member',
          component: Member,
        },
        {
          path: '/member/new',
          name: 'MemberNew',
          component: MemberNew
        },
        {
          path: '/member/detail/:member_id',
          name: 'MemberDetail',
          component: MemberDetail,
          props: true
        },
        {
          path: '/order',
          name: 'Order',
          component: Order
        },
        {
          path: '/cost',
          name: 'Cost',
          component: Cost
        },
        {
          path: '/notification',
          name: 'Notification',
          component: Notification,
          // router guard
          beforeEnter: (to, from, next) => {
            // redirection
            next({
              name: 'Home'
            });
          }
        },
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
