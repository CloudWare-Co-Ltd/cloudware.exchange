const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '/', component: () => import('pages/Index.vue'),meta:'/'},

      {path: '/business', component: () => import('pages/business/BusinessIndex'),meta:'/business'},
      {path: '/business/create', component: () => import('pages/business/BusinessCreate'),meta:'/business'},
      {path: '/business/:id/edit', component: () => import('pages/business/BusinessReadUpdate'),meta:'/business'}
    ]
  },
  {
    path: '/',
    component: () => import('layouts/AuthLayout'),
    children: [
      {path: '/login', component: () => import('pages/auth/Login')},
      {path: '/register', component: () => import('pages/auth/Register')}
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
