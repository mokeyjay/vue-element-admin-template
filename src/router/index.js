import { menuRouter } from "@/router/router";

export default new VueRouter({
  routes: [
    {
      path: '/login',
      component: () => import('page/auth/Login'),
    },
    ...menuRouter,
    {
      path: '*',
      component: () => import('page/other/404')
    }
  ]
})