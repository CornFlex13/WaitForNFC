export const routes = [
  { path: '/', redirect: '/courses' },

  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'expend',
        component: () => import('@/pages/expend.vue'),
      },
      {
        path: 'users',
        component: () => import('@/pages/users.vue'),
      },
      {
        path: 'setting',
        component: () => import('@/pages/setting.vue'),
      },      
      {
        path: 'courses',
        component: () => import('@/pages/home.vue'),
      },
      {
        path: 'cp422101',
        component: () => import('@/pages/cp422101.vue'),
      },
      {
        path: 'cp422021',
        component: () => import('@/pages/cp422021.vue'),
      },
      {
        path: 'cp422021_atd_check',
        component: () => import('@/pages/cp422021_atd_check.vue'),
      },
      {
        path: 'cp422021_atd_check/:courseid',
        component: () => import('@/pages/cp422021_atd_check.vue'),
      },
      {
        path: 'cp422021_atd_check/:periodId/realtimecheck',
        component: () => import('@/pages/RealtimeCheckCP422021.vue'),
      },

      {
        path: 'cp422101_atd_check',
        component: () => import('@/pages/cp422101.vue'),
      },
      {
        path: 'cp422101_atd_check/:courseid',
        component: () => import('@/pages/cp422101_atd_check.vue'),
      },
      {
        path: 'cp422101_atd_check/:periodId/realtimecheck',
        component: () => import('@/pages/RealtimeCheckCP422101.vue'),
      },     
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
