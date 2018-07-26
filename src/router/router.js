import Layout from 'page/admin/Layout'

export const menuRouter = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        meta: {title: '首页'},
        component: () => import('page/admin/index/Index'),
      }
    ],
  },
  {
    path: '/shop',
    meta: {title: '店铺管理', icon: 'iconfont icon-shop', auth: [3]},
    component: Layout,
    redirect: '/shop/list',
    children: [
      {
        path: 'list',
        meta: {title: '店铺列表'},
        component: () => import('page/admin/shop/List')
      },
      {
        path: 'category',
        meta: {title: '品类管理'},
        component: () => import('page/admin/shop/ListCategory')
      },
    ],
  },
  {
    path: '/notify',
    meta: {title: '信息管理', icon: 'iconfont icon-read', auth: [3]},
    component: Layout,
    redirect: '/notify/list',
    children: [
      {
        path: 'list',
        meta: {title: '信息列表'},
        component: () => import('page/admin/notify/List'),
      },
      {
        path: 'category',
        meta: {title: '信息类型'},
        component: () => import('page/admin/notify/ListCategory'),
      },
    ]
  },
]