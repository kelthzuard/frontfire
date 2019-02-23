import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin'
import client from '@/components/client'
import login from '@/components/login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
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
