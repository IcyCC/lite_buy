import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '文化用品管理终端', }
    },]
  },

  {
    path: '/buy',
    name: '采购',
    redirect: '/buy',
    meta: { title: "采购中心"},
    component: Layout,
    children: [
      {
        path: '/buy',
        name: '采购中心',
        component: () => import('@/views/BuyCenter/index'),
        meta: { 
          title: "采购中心",
          icon: 'buycenter'
        }
      },
    ]
  },

  {
    path: '/ret',
    name: '租赁',
    redirect: '/ret',
    component: Layout,
    meta: { title: "租赁中心"},
    children: [
      {
        path: '/ret',
        name: '租赁中心',
        component: () => import('@/views/RetCenter/index'),
        meta: {
          title: "租赁中心",
          icon: 'retcenter'
        }
      },
    ]
  },

  {
    path: '/manager',
    name: "数据管理",
    component: Layout,
    redirect: 'company',
    meta: {
      title: '数据管理',
      icon: 'datamanager'
    },
    children: [{
      path: 'company',
      name: '公司管理',
      component: () => import('@/views/CompanyList/index'),
      meta: {
        title: "公司管理",
        icon: 'companymanager'
      }
    },
      {
        path: 'kind',
        name: '类目管理',
        component: () => import('@/views/KindList/index'),
        meta: {
          title: "类目管理",
          icon: 'kindmanager'
        }
      },
    ]
  },

  {
    path: '/my',
    component: Layout,
    redirect: '/my/my',
    meta: { title: '采购结果'},
    children: [{
      path: '/my/my',
      name: '采购结果',
      meta: {
        title: "采购结果",
        icon: 'buyresult'
      },
      component: () => import('@/views/MyBuy/index'),
    }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

 
 
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
