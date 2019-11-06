import Vue from 'vue'
import Router from 'vue-router'

// 在开发中，开发环境不使用懒加载，因为懒惰加载太多页面会导致WebPACK热更新太慢。所以只能在生产中使用懒加载
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import Login from '../views/login/Login'
import Register from '../views/login/Register'
import Backpwd from '../views/login/Backpwd'

export const constantRouterMap = [
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' },
  { path: '/backpwd', component: Backpwd, name: 'Backpwd' },
  { path: '/loginpass', component: () => import('@/views/personal/information/loginpass') },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/pay', name: 'pay', component: () => import('@/views/pay/index'), hidden: true },
  { path: '/download', name: 'download', component: () => import('@/views/download'), hidden: true },
  { path: '/downloadZip', name: 'download', component: () => import('@/views/download2'), hidden: true },
  { path: '/resume', component: () => import('@/views/resume') },
  { path: '/jobInfo', component: () => import('@/views/jobInfo') },
  { path: '/authorize', component: () => import('@/views/authorize'), hidden: true },
  { path: '/credit', component: () => import('@/views/credit'), hidden: true },
  { path: '/wrote', component: () => import('@/views/wrote'), hidden: true },
  { path: '/agreement', component: () => import('@/views/agreement'), hidden: true },
  { path: '/test', component: () => import('@/views/test'), hidden: true },
  { path: '/product', component: () => import('@/views/website/product'), hidden: true },
  { path: '/about', component: () => import('@/views/website/about'), hidden: true },
  { path: '/develop', component: () => import('@/views/website/develop'), hidden: true },
  { path: '/home', component: () => import('@/views/website/home'), hidden: true },
  {
    path: '/reportDetails',
    component: () => import('@/views/reportDetails'),
    hidden: true
  },
  // {
  //   path: '/reportDetails',
  //   component: Layout,
  //   name: 'reportDetails',
  //   hidden: true,
  //   children: [{
  //     path: 'reportDetails',
  //     name: 'reportDetails',
  //     component: () => import('@/views/background/report/details')
  //   }]
  //
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'index' }
    }]
  },

  {
    path: '/background',
    component: Layout,
    redirect: '/background/check',
    name: 'background',
    meta: {
      title: '背调中心',
      icon: 'beitiao'
    },
    children: [
      {
        path: 'check',
        name: 'check',
        component: () => import('@/views/background/check/package'),
        meta: { title: '开始背调', icon: '' }
      },
      {
        path: 'orderpackage',
        name: 'orderpackage',
        component: () => import('@/views/background/check/search'),
        meta: { title: '选择候选人', icon: '' },
        hidden: true
      },
      {
        path: 'addCheck',
        name: 'addCheck',
        component: () => import('@/views/background/check/add'),
        meta: { title: '开始背调添加候选人', icon: '' },
        hidden: true
      },
      {
        path: 'orderConfirm',
        name: 'orderConfirm',
        component: () => import('@/views/background/check/orderConfirm'),
        meta: { title: '订单确认', icon: '' },
        hidden: true
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/background/check/order'),
        meta: { title: '提交订单', icon: '' },
        hidden: true
      },
      {
        path: 'newpackage',
        name: 'newpackage',
        component: () => import('@/views/background/check/newpackage'),
        meta: { title: '自定义套餐', icon: '' },
        hidden: true
      },
      {
        path: 'candidate',
        name: 'candidate',
        component: () => import('@/views/background/candidate/search'),
        meta: { title: '候选人库', icon: '' }
      },
      {
        path: 'search',
        component: () => import('@/views/background/candidate/search'),
        name: 'search',
        meta: { title: '搜索候选人' },
        hidden: true
      },
      {
        path: 'add',
        component: () => import('@/views/background/candidate/add'),
        name: '候选人库',
        meta: { title: '候选人库加候选人' },
        hidden: true
      },
      {
        path: 'candidateEdit',
        component: () => import('@/views/background/candidate/edit'),
        name: '候选人库',
        meta: { title: '候选人库加候选人' },
        hidden: true
      },
      {
        path: 'candidateDetails',
        component: () => import('@/views/background/candidate/details'),
        name: 'candidateDetails',
        meta: { title: '候选人详情' , keepAlive: false },
        hidden: true
      },
      {
        path: 'orderSearch',
        component: () => import('@/views/background/order/search'),
        name: 'orderSearch',
        meta: { title: '背调订单' }
        // children: [
        //   {
        //     path: 'search',
        //     component: () => import('@/views/background/order/search'),
        //     name: 'search',
        //     meta: { title: '订单查询' }
        //   },
        //   {
        //     path: 'details',
        //     component: () => import('@/views/background/order/details'),
        //     name: 'details',
        //     meta: { title: '订单详情' }
        //   }
        // ]
      },
      {
        path: 'orderDetails',
        component: () => import('@/views/background/order/details'),
        name: 'orderDetails',
        meta: { title: '订单详情' },
        hidden: true
      },
      // {
      //   path: 'reportDetails',
      //   component: () => import('@/views/background/report/details'),
      //   name: 'reportDetails',
      //   meta: { title: '背调报告详情' },
      //   hidden: true
      // },
      {
        path: 'report',
        name: 'report',
        component: () => import('@/views/background/report/search'),
        meta: { title: '背调报告', icon: '' }
      },
      {
        path: 'archives',
        name: 'archives',
        component: () => import('@/views/background/archives/search'),
        meta: { title: '员工档案', icon: '' },
        hidden: true
      }
    ]
  },
  {
    path: '/balance',
    component: Layout,
    redirect: '/balance',
    name: 'balance',
    meta: { title: '资产管理', icon: 'zichanguanli' },
    children: [
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/account/recharge/index'),
        meta: { title: '账户充值', icon: '' }
      },
      {
        path: 'record',
        name: 'record',
        component: () => import('@/views/account/record/index'),
        meta: { title: '交易记录', icon: '' }
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/account/coupon/list'),
        meta: { title: '优惠券', icon: '' }
      },
      {
        path: 'couponRecord',
        name: 'coupon',
        component: () => import('@/views/account/coupon/record'),
        meta: { title: '优惠券使用记录', icon: '' },
        hidden: true
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/infor',
    name: 'personal',
    meta: {
      title: '个人中心',
      icon: 'geren'
    },
    children: [
      {
        path: 'infor',
        name: 'infor',
        component: () => import('@/views/personal/information/index'), // Parent router-view
        meta: { title: '基本信息', icon: '' }
      },
      { path: 'modifyPayPass', component: () => import('@/views/personal/information/modifyPayPass'), name: 'modifyPayPass', hidden: true },
      { path: 'modifyPhone', component: () => import('@/views/personal/information/modifyPhone'), hidden: true },
      { path: 'modifyEmail', component: () => import('@/views/personal/information/modifyEmail'), hidden: true },
      { path: 'bindemail', component: () => import('@/views/personal/information/BindEmail'), hidden: true },
      { path: 'modifyLoginPass', component: () => import('@/views/personal/information/modifyLoginPass'), hidden: true },
      {
        path: 'auth',
        component: () => import('@/views/personal/auth/index'), // Parent router-view
        name: 'auth',
        meta: { title: '认证状态', icon: '' }
      },
      {
        path: 'authForm',
        name: 'authForm',
        component: () => import('@/views/personal/authentication/index'),
        meta: { title: '实名认证', icon: '' },
        hidden: true
      },
      {
        path: 'account',
        component: () => import('@/views/personal/manage/index'),
        meta: { title: '子账号管理', icon: 'order' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
