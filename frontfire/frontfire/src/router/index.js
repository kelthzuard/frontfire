import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin'
import client from '@/components/client'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/client/:number',
      name: 'client',
      component: client
    }
  ]
})
