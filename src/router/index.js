import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Home from '@/views/Home'
import Attention from '@/views/Attention'
import Message from '@/views/Message'
import My from '@/views/My'
import Recommend from '@/views/home/Recommend'
import City from '@/views/home/City'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/index',
    name: 'Index',
    component: Index,
    children: [{
      path: '/index/home',
      name: 'Home',
      redirect: '/index/home/recommend',
      component: Home,
      children: [{
        path: '/index/home/recommend',
        name: 'Recommend',
        component: Recommend
      }, {
        path: '/index/home/city',
        name: 'City',
        component: City
      }]
    }, {
      path: '/index/attention',
      name: 'Attention',
      component: Attention
    }, {
      path: '/index/message',
      name: 'Message',
      component: Message
    }, {
      path: '/index/my',
      name: 'My',
      component: My
    }]
  }, {
    path: '/',
    redirect: '/index/home/recommend',
    name: 'Recommend',
    component: Recommend
  }]
})