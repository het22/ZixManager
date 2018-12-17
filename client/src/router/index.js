import Vue from 'vue'
import Router from 'vue-router'
// Main Layout: DashBoard
import DashBoard from '@/components/DashBoard.vue'
// Contents
import Home from '@/components/Home.vue'
import Order from '@/components/Order.vue'
import Notification from '@/components/Notification.vue'
// Member Pages
import Member from '@/components/member/Member.vue'
import MemberTable from '@/components/member/MemberTable.vue'
import MemberDetail from '@/components/member/MemberDetail.vue'
import MemberNew from '@/components/member/MemberNew.vue'
// Cost Pages
import Cost from '@/components/cost/Cost.vue'
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
          component: Member,
          children: [
            {
              path: '/',
              name: 'MemberTable',
              component: MemberTable
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
            }
          ]
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
          component: Notification
          // // router guard 조건을 만족하지 않으면 리디렉션을 걸 수 있다.
          // beforeEnter: (to, from, next) => {
          //   // redirection
          //   next({
          //     name: 'Home'
          //   });
          // }
        },
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
