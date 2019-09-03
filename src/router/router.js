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
    path: '/notify',
    meta: {title: '组件示例', icon: 'el-icon-house'},
    component: Layout,
    redirect: '/notify/list',
    children: [
      {
        path: 'list',
        meta: {title: '表格导出 及 UEditor'},
        component: () => import('page/admin/notify/List'),
      },
    ]
  },
  {
    path: '/hideMenu',
    meta: {title: '隐藏路由（不显示在左侧导航）', icon: 'el-icon-house', show: false},
    component: Layout,
  },
  {
    path: '/permission',
    // 见 src/store/index.js
    meta: {title: '需要权限才能访问', icon: 'el-icon-house', auth: [3]},
    component: Layout,
  },
  {
    path: '/hideChile',
    meta: {title: '不显示子菜单', icon: 'el-icon-document-remove', subMenu: false},
    component: Layout,
    redirect: '/hideChile/list',
    children: [
      {
        path: 'list',
        meta: {title: '表格导出 及 UEditor'},
        component: () => import('page/admin/notify/List'),
      },
    ]
  },
]
